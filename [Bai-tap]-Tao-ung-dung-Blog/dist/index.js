"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const blog_1 = require("./src/entity/blog");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    const BlogRepo = connection.getRepository(blog_1.Blog);
    app.get('/', (req, res) => {
        res.render('create');
    });
    app.post('/', upload.none(), async (req, res) => {
        const blogData = {
            title: req.body.title,
            content: req.body.content
        };
        const blog = await BlogRepo.save(blogData);
        res.render('success');
    });
    app.get('/blog/list', async (req, res) => {
        const blogs = await BlogRepo.find();
        res.render('list-blog', { blogs: blogs });
    });
    app.get('/delete', async (req, res) => {
        const id = Number(req.query.id);
        console.log(id);
        const blog = await BlogRepo.delete({ id: id });
        console.log(blog);
        res.redirect('/blog/list');
    });
    app.listen(PORT, () => {
        console.log("App running with port: " + PORT);
    });
});
//# sourceMappingURL=index.js.map
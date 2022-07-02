"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Blog_1 = require("./src/entity/Blog");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    try {
        const app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        const BlogRepo = connection.getRepository(Blog_1.Blog);
        app.use(express_1.default.json());
        app.post('/blog/create', async (req, res) => {
            try {
                console.log('123');
                const blogData = {
                    title: req.body.title,
                    content: req.body.content
                };
                console.log(blogData);
                const blog = await BlogRepo.save(blogData);
                if (blog) {
                    res.status(200).json({
                        message: "created successfully",
                        blog: blog
                    });
                }
            }
            catch (err) {
                console.log(err.message);
            }
        });
        app.put('/blog/update', async (req, res) => {
            try {
                let blogSearch = BlogRepo.findOneBy({ id: req.body.id });
                if (!blogSearch) {
                    res.status(500).json({
                        mesage: "Sản phẩm không tồn tại"
                    });
                }
                else {
                    const blog = BlogRepo.update({ id: req.body.id }, req.body);
                    res.status(200).json({
                        message: "Update blog successfully",
                    });
                }
            }
            catch (err) {
                console.log(err.message);
            }
        });
        app.delete('/blog/delete', async (req, res) => {
            try {
                let blogSearch = BlogRepo.findOneBy({ id: req.body.id });
                if (!blogSearch) {
                    res.status(500).json({
                        mesage: "Sản phẩm không tồn tại"
                    });
                }
                else {
                    let blog = BlogRepo.delete({ id: req.body.id });
                    res.status(200).json({
                        message: "Delete blog successfully",
                    });
                }
            }
            catch (e) {
                console.log(e.message);
            }
        });
        app.get('/blog', async (req, res) => {
            try {
                let blogSearch = await BlogRepo.find();
                if (!blogSearch) {
                    res.status(404).json({ message: 'No blog found' });
                }
                else {
                    res.status(200).json({ message: 'OK', blog: blogSearch });
                }
            }
            catch (err) {
                console.log(err.message);
            }
        });
        app.listen(PORT, () => {
            console.log(PORT);
        });
    }
    catch (err) {
        console.log(err.message);
    }
});
//# sourceMappingURL=index.js.map
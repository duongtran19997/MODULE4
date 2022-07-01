import {AppDataSource} from "./src/data-source";
import {Blog} from "./src/entity/blog";
import multer from 'multer';
const upload = multer();
import express from 'express';
import bodyParser from 'body-parser'
const PORT = 3000;

AppDataSource.initialize().then(async connection => {
    const app = express();

    app.set("view engine", "ejs");

    app.set("views", "./src/views");

    app.use(bodyParser.json());

    app.use(express.json());

    const BlogRepo = connection.getRepository(Blog);

    app.get('/',(req,res) => {
        res.render('create')
    });

    app.post('/',upload.none(), async(req,res) => {
        const blogData ={
            title :req.body.title,
            content :req.body.content
        };

        const blog = await BlogRepo.save(blogData);
        res.render('success');
    })

    app.get('/blog/list', async(req, res) => {
        const blogs = await BlogRepo.find();
        // console.log(blogs);
        // console.log('123');
        res.render('list-blog',{blogs:blogs});
    })

    app.get('/delete',async (req, res) => {
            const id = Number(req.query.id);
        console.log(id);
        const blog = await BlogRepo.delete({id:id});
        console.log(blog);
        res.redirect('/blog/list')
    })


    app.listen(PORT, () => {

        console.log("App running with port: " + PORT)
    })
})
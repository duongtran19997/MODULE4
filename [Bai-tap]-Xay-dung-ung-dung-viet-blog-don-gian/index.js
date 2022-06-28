const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const upload = multer();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.get('/', (req, res) => {
    res.render('blog');
});

const arrayBlogs = [];

app.post('/blog/views', upload.none(), ((req, res) => {
    // console.log(req.body)
    if (req.body.title && req.body.content) {
        const blog = {
            title: req.body.title,
            content: req.body.content
        }
        arrayBlogs.push(blog);
        console.log('456');
        res.render('view',{arrayBlogs:arrayBlogs})
    } else {
        res.render('error')
    }
}));

app.listen(port, () => {
    console.log(`listening on ${port}`)
});
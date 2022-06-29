const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3000;
const controllers = require('./controllers/Controllers');
const Controllers = new controllers;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views','./views')

app.get('/',(req, res)=>{
    Controllers.showList(req,res);
});

app.get('/view',(req, res)=>{
    Controllers.showMore(req,res);
})

app.get('/create',(req, res)=>{
    Controllers.createStaffViews(req,res);
});

app.get('/delete',(req, res)=>{
    Controllers.deleteStaffViews(req,res);
})

app.post('/create',upload.none(),(req, res)=>{
    Controllers.createNewStaff(req,res)
})


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})
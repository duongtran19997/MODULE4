const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer()
const path = require('path');
const port = 4000;
const router = require('./routes/router');
let company = []
app.set('view engine', 'ejs');
app.set('views','views');

app.get('/create',(req,res) => {
    res.render('create')
});
app.get('/delete',(req, res) => {
    console.log(req.query);
    company.forEach((value, index) => {
        if(value.id == req.query.id){
            company.splice(index, 1);
            res.render('view',{company:company})
        }else{
            res.render('error')
        }
    })
})


app.post('/views',upload.none(),(req,res) => {
    if(req.body.id && req.body.name && req.body.department){
        let employee = {
            id: req.body.id,
            name: req.body.name,
            department: req.body.department
        };
        company.push(employee);
        res.render('view',{company:company})
    }
    else{
        res.render('error')
    }
})


app.listen(port,()=>{
    console.log('listening on port '+port);
});

module.exports = company
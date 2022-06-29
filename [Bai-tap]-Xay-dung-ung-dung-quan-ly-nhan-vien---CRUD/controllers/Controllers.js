const adminModel = require('../model/AdminModel')
const AdminModel = new adminModel;
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

class Controllers {
    showList(req,res){
        let page = parseInt(req.query.page) || 1;
        let perPage = 5;
        let start = (page - 1) * perPage;
        let end = page + perPage;
        console.log(page);
        let list = AdminModel.show(start,end).then(result=>{
           res.render('list-staff',{result: result,page:page});
       })
    };

    createStaffViews(req,res){
        res.render('create');
    };

    createNewStaff(req,res){
        let staff = AdminModel.createStaff(req.body).then(result=>{
            res.redirect('/')
        })
    };

    showMore(req,res){
        // console.log(req);
        let staff = AdminModel.showInfoStaff(req.query.id).then(result=>{
            res.render('views',{result:result})
        })
    };

    deleteStaffViews(req,res){
        let staff = AdminModel.deleteStaffViewsSQL(req.query.id).then(result=>{
            res.redirect('/');
        })
    };
}
module.exports = Controllers
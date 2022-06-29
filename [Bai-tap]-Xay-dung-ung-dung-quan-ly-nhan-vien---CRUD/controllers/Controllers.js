const adminModel = require('../model/AdminModel')
const AdminModel = new adminModel;
const bodyParser = require('body-parser');
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

class Controllers {
    showList(req,res){
       let list = AdminModel.show().then(result=>{
           res.render('list-staff',{result: result});
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
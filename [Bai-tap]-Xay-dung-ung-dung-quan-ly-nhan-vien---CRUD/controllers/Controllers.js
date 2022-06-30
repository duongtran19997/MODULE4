const adminModel = require('../model/AdminModel')
const AdminModel = new adminModel;
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const multer = require('multer');
const upload = multer();

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

    createNewStaff(req,res, next){
        let file = req.file;

        let staffs = req.body;
        if(!file){
            const error = new Error('Error occur')
            error.httpStatusCode = 400
            return next(error)
        }
        staffs.imgPath = 'uploads/' + file.filename;
        console.log(staffs)
        AdminModel.createStaff(staffs).then(result=>{
            res.redirect('/')
        }).catch(err=>{
            console.log(err)
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
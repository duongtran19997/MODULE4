const express = require('express');
const router = express.Router();
const company = require('../index')

router.get('/:id',(req, res) => {
    company.forEach((value,index) => {
        if(req.params.id ===value.id){
            company.splice(index,1)
            res.render('view',{company:company})
        }else{
            res.render('error');
        }
    })
})


module.exports = router;

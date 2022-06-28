const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const upload = multer();
const port = 4000;

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, './views/users'));
app.get('/', (req, res) => {
    res.render("register");
});

const arrayUsers = [];

app.post('/users/register',upload.none() ,(req, res) => {
    if(req.body.username && req.body.password){
      const user ={
          username : req.body.username,
          password : req.body.password
      }  ;
      arrayUsers.push(user);
        console.log(arrayUsers);
        res.render('success', {user: user});
    }
    else{
        res.render('error')
    }
})



app.listen(port, ()=>{
    console.log(`listening on ${port}`);
})
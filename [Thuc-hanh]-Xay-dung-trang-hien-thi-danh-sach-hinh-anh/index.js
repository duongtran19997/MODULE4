const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static(path.join(__dirname, 'public')))
app.get('/',(req, res) =>{
    res.render('home')
})

app.listen(port,()=>{
    console.log(`listening on ${port}`);
});
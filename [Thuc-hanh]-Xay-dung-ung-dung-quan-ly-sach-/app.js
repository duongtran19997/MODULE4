const mysql = require('mysql');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const bodyParser = require('body-parser');
const PORT = 3000;

//tao server lang nghe port
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

// ket noi mysql

const conn = mysql.createConnection({
    host: 'localhost',
    port: '3305',
    user: 'root',
    password: 'password',
    database: 'products',
    charset: 'utf8_general_ci'
});

conn.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connect succeeded')
        }
    }
);

app.get('/create', (req, res) => {
    res.render('create')
});
app.get('/', (req, res) => {
    const sql = 'select * from books'
    conn.query(sql, (err,results)=>{
        if(err){
            console.log(err.message);
        }else{
            res.render('list',{books: results})
        }
    })
})


app.post('/book/create', upload.none(), (req, res) => {
    const {name, price, quantity, author} = req.body;
    const sql = `insert into books (name, price, quantity, author) values ?`;
    const value = [
        [name, price, quantity, author]
    ];
    conn.query(sql, [value], (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            res.render('success')
        }
    })
})
const express = require('express');
const app = express();
const multer = require('multer');

const path = require('path');
const bodyParser = require('body-parser');
const PORT = 3000;
const controllers = require('./controllers/Controllers');
const Controllers = new controllers;

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    Controllers.showList(req, res);
});

app.get('/view', (req, res) => {
    Controllers.showMore(req, res);
})

app.get('/create', (req, res) => {
    Controllers.createStaffViews(req, res);
});

app.get('/delete', (req, res) => {
    Controllers.deleteStaffViews(req, res);
})

app.post('/create', upload.single('avatar'), (req, res, next) => {
    Controllers.createNewStaff(req, res, next)
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})
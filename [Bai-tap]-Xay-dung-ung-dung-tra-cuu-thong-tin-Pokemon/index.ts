import express from 'express';
import bodyParser from "body-parser";
import axios from "axios";

const PORT = 3000;

const app = express();
app.set('view engine', 'ejs')
app.set('views', './src/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let perPage = 10;
        let start = (page - 1) * perPage;
        let end = page + perPage;
        // console.log('123')
        if (page > 0) {
            let url = await axios.get(`https://pokeapi.co/api/v2/ability/?limit=${end}&offset=${start}`);
            let dataURL = url.data.results;
            console.log(dataURL[0]);
            if (dataURL) {
                console.log('dmm')
                res.render("views", {dataPokemon: dataURL, page: page});
            } else {
                console.log('fuck')
                res.render('<h1>Error</h1>')
            }
        } else {
            res.redirect('/?page=1')
        }

    } catch (err) {
        console.log('lon')
        res.end('<h1>Error<h1>')
    }

});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})
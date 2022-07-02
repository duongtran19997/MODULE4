"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const PORT = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    try {
        let page = Number(req.query.page) || 1;
        let perPage = 10;
        let start = (page - 1) * perPage;
        let end = page + perPage;
        if (page > 0) {
            let url = await axios_1.default.get(`https://pokeapi.co/api/v2/ability/?limit=${end}&offset=${start}`);
            let dataURL = url.data.results;
            console.log(dataURL[0]);
            if (dataURL) {
                console.log('dmm');
                res.render("views", { dataPokemon: dataURL, page: page });
            }
            else {
                console.log('fuck');
                res.render('<h1>Error</h1>');
            }
        }
        else {
            res.redirect('/?page=1');
        }
    }
    catch (err) {
        console.log('lon');
        res.end('<h1>Error<h1>');
    }
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map
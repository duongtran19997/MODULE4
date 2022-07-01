"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = 3000;
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', async (req, res) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?id=1581130&appid=05f149a851779d5c599f4979a1f30bfd';
    const response = await axios_1.default.get(url);
    const data = response.data;
    console.log(data);
    if (data) {
        res.render('weather', { data: data });
    }
    else {
        res.end('<h1>ERROR</h1>');
    }
});
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map
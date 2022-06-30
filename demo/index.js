"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var PORT = 3000;
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.end("<h1>Hello world!</h1>");
});
app.listen(PORT, function () {
    console.log("App running on port: " + PORT);
});

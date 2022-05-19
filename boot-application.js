const express = require("express");
const app = express();
const generators = require('./currency-repository');

const bashPath = process.env.BASE_PATH;

app.get(bashPath + "/latest", function (req, res) {
    console.log("[GET] fixer")
    let base = req.query.base;
    let symbol = req.query.symbols;

    res.send(generators.getFixer(base, symbol))
});

app.listen(process.env.PORT, () => {
    console.log("El servidor este inicializado en el port: " + process.env.PORT)
});
const faker = require("@faker-js/faker").faker;
const fs = require('fs');
require("dotenv").config();


class Fixer {

    constructor(base, rates) {
        let date = new Date();

        this.success = true;
        this.timestamp = Math.floor(date.getTime() / 1000);
        this.base = base;
        this.date = date.toISOString().slice(0, 10);
        this.rates = rates;
    }
}

function generatorFixer() {

    let rawdata = fs.readFileSync('fixer.json');
    let fixer = JSON.parse(rawdata);
    return fixer;
}

function getByValue(map, searchValue) {
    let valueMap = [];
    const flatMap = {};
    for (let [key, value] of map.entries()) {
        if (key == searchValue)
            valueMap = [{ key: key, value: value }];
    }

    valueMap.forEach(object => {
        flatMap[object.key] = object.value;
    });

    return flatMap
}

module.exports = {
    getFixer: function getFixer(base, symbol) {
        const fixers = generatorFixer();
        let date = new Date();
        var value
        if (symbol != null) {
            var baseFixer = fixers.find(x => x.base === base)
            value = getByValue(new Map(Object.entries(baseFixer.rates)), symbol);
            console.info(value);
            return new Fixer(base, value);
        } else if (base != null && symbol == null) {
            value = fixers
                .find(x => x.base === base)
            console.info(JSON.stringify(value));
            return new Fixer(base, value.rates);
        } else {
            var value = fixers
                .find(x => x.base === "PEN")
            console.info(JSON.stringify(value));
            return new Fixer("PEN", value.rates);
        }

    }
};

//index.js
const stringModule = {};

stringModule.includesTest = require("./includes");
stringModule.startsWithTest = require("./startsWith");
stringModule.endsWithTest = require("./endsWith");
stringModule.sliceTest = require("./slice");
stringModule.indexOfTest = require("./indexOf");
stringModule.lengthTest = require("./length");
stringModule.searchTest = require("./search");
stringModule.testTest = require("./test");

module.exports = stringModule;

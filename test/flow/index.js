//index.js
const flowModule = {};

flowModule.ifTest = require("./if");
flowModule.isFunctionTest = require("./isfunction");
flowModule.applyTest = require("./apply");
flowModule.callTest = require("./call");
flowModule.typeTest = require("./type");

module.exports = flowModule;
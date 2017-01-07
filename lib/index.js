//index.js
var utilFlow = require("./flow");
var utilString = require("./string");
var usage = require("./usage");

module.exports = {
    install: function(less, pluginManager) {
        less.functions.functionRegistry.addMultiple(utilFlow(less));
        less.functions.functionRegistry.addMultiple(utilString(less));
    },

    printUsage: usage
};

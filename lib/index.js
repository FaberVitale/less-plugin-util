var utilFlow = require("./flow");

module.exports = {
    install: function(less, pluginManager) {
        less.functions.functionRegistry.addMultiple(utilFlow(less));
    }
};

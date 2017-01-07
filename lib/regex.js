//regexBuilder.js
module.exports = function(regex, flags) {
    var regExpObj, error;
    var checkArg = require("./argumentChecker");
    try {
        regExpObj = checkArg(flags, "Quoted") ?
            new RegExp(regex.value, flags.value) : new RegExp(regex.value);
    }
    catch (e) {
        error = e;
    }

    return {
        err: error || {},
        r: regExpObj || {},
        isSuccess: !error
    };
};
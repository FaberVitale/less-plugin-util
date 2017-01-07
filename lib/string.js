//string.js
module.exports = function (less) {
    var getRegex = require("./regex");
    var checkArg = require("./argumentChecker");

    var True = less.tree.Keyword.True,
        False = less.tree.Keyword.False,
        Keyword = less.tree.Keyword,
        Quoted = less.tree.Quoted,
        Dimension = less.tree.Dimension;

    return {

        "str-includes": function (target, key) {
            if (!checkArg(target, Quoted) || !checkArg(key, Quoted)) {
                throw {
                    type: "Argument",
                    message: "str-includes(): requires 2 string args"
                }
            }

            return target.value.indexOf(key.value) !== -1 ? True : False;
        },

        // starts-with and ends-with use strict equality because of the way quoted args are handled during a function call:
        // the Quoted.eval(use of replace()) ensures that any quoted argument passed has value of type string (primitive).
        // see: https://github.com/less/less.js/blob/master/lib/less/tree/quoted.js  and
        // https://github.com/less/less.js/blob/master/lib/less/tree/call.js


        "str-starts-with": function (target, key) {
            if (!checkArg(target, Quoted) || !checkArg(key, Quoted)) {
                throw {
                    type: "Argument",
                    message: "str-starts-with(): requires 2 string args"
                }
            }
            else if (key.value.length > target.value.length) {
                return False;
            }
            else {
                return target.value.slice(0, key.value.length) === key.value ?
                    True : False;
            }
        },

        "str-ends-with": function (target, key) {
            if (!checkArg(target, Quoted) || !checkArg(key, Quoted)) {
                throw {
                    type: "Argument",
                    message: "str-ends-with(): requires 2 string args"
                }
            }
            else if (key.value.length > target.value.length) {
                return False;
            }
            else {
                return target.value.slice(target.value.length - key.value.length) === key.value ?
                    True : False;
            }

        },

        "str-index-of": function (target, key) {
            if (!checkArg(target, Quoted) || !checkArg(key, Quoted)) {
                throw {
                    type: "Argument",
                    message: "str-index-of(): requires 2 string args"
                }
            }

            return new Dimension(target.value.indexOf(key.value));
        },

        "str-length": function (target) {
            if (!checkArg(target, Quoted)) {
                throw {
                    type: "Argument",
                    message: "str-length(): 1st argument must be string"
                }
            }

            return new Dimension(target.value.length);
        },


        "str-slice": function (target, startIndex, endIndex) {
            var sI, eI, result, quote;

            if (!checkArg(target, Quoted)) {
                throw {
                    type: "Argument",
                    message: "str-slice(): 1st argument must be string"
                }
            }

            if (arguments.length < 2) {
                return target;
            }

            sI = 0, eI = target.length, quote = target.quote;

            if (startIndex && startIndex.type === Dimension.prototype.type) {
                sI = Math.trunc(startIndex.value);
            }

            if (endIndex && endIndex.type === Dimension.prototype.type) {
                eI = Math.trunc(endIndex.value);
            }

            result = target.value.slice(sI, eI);

            return new Quoted(quote + result + quote, result, target.escaped);
        },

        "str-search": function (target, regex, flags) {
            var result, builtRegex;

            if (!checkArg(target, Quoted) || !checkArg(regex, Quoted)) {
                throw {
                    type: "Argument",
                    message: "str-search(): requires 2 string arguments"
                }
            }

            builtRegex = getRegex(regex, flags);

            if (builtRegex.isSuccess) {
                result = target.value.search(builtRegex.r);
                return new Dimension(result);
            }
            else {
                throw {
                    type: "Argument",
                    message: "str-search(): invalid regular expression" + builtRegex.err.message
                }
            }
        },

        "str-test": function (target, regex, flags) {
            var isPresent, builtRegex;

            if (!checkArg(target, Quoted) || !checkArg(regex, Quoted)) {
                throw {
                    type: "Argument",
                    message: "str-test(): requires 2 string arguments"
                }
            }

            builtRegex = getRegex(regex, flags);

            if (builtRegex.isSuccess) {
                isPresent = builtRegex.r.test(target.value);

                return isPresent ? True : False;
            }
            else {
                throw {
                    type: "Argument",
                    message: "str-test(): invalid regular expression" + builtRegex.err.message
                }
            }
        }
    };
};

//flow.js
module.exports = function (less) {
    var checkArg = require("./argumentChecker");

    var True = less.tree.Keyword.True,
        False = less.tree.Keyword.False,
        Quoted = less.tree.Quoted;

    function getFunction(funcName) {
        return less.functions.functionRegistry.get(funcName.value);
    }

    function getListValue(maybeList) {
        var value = Array.isArray(maybeList.value) ?
            maybeList.value : Array(maybeList);
        return value;

    }

    return {
        isfunction: function (funcName) {
            if (checkArg(funcName, Quoted)) {
                return !!getFunction(funcName) ? True : False;
            }
            else {
                throw {
                    type: "Argument",
                    message: "isfunction(arg): requires a string argument"
                };
            }
        },

        type: function (node) {
            if (node) {
                return new Quoted('"' + node.type + '"', node.type, false);
            }
            else {
                throw {
                    type: "Argument",
                    message: "type(arg): requires an argument"
                }
            }
        },

        call: function (funcName /*args, args, args*/) {
            if (checkArg(funcName, Quoted)) {
                var func = getFunction(funcName);
                var args = Array.prototype.slice.call(arguments, 1);

                if (func) {
                    return func.apply(null, args);
                }
                else {
                    throw {
                        type: "Argument",
                        message: "call(): function argument is not registered"
                    }
                }
            }
            else {
                throw {
                    type: "Argument",
                    message: "call(): function name must be string"
                }
            }
        },

        apply: function (funcName, list) {
            if (checkArg(funcName, Quoted)) {
                var func = getFunction(funcName);
                var args = getListValue(list);

                if (func) {
                    return func.apply(null, args);
                }
                else {
                    throw {
                        type: "Argument",
                        message: "apply(): function argument is not registered"
                    }
                }
            }
            else {
                throw {
                    type: "Argument",
                    message: "apply(): function name must be string"
                }
            }
        },

        if: function (isTrue, left, right) {
            if (arguments.length < 3) {
                throw {
                    type: "Argument",
                    message: "if(): requires at least 3 arguments"
                }
            }
            else if (isTrue.type === True.type && isTrue.value === True.value) {
                return left;
            }
            else {
                return right;
            }
        }
    };
};

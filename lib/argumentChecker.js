//argumentChecker.js
module.exports = function (arg, node) {
    if (arg) {
        if (typeof node === "string") {
            return arg.type === node;
        }
        else {
            return arg.type === node.prototype.type;
        }
    }
    return false;
};

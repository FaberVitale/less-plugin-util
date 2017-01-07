//if.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const ifTest =
    describe("if()", function () {
        it("shoud be registered", function (done) {
            less.render("p{exist: isfunction('if');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if arguments.length < 3", function (done) {
            less.render("p{error: if();}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have thrown error: < 3 args"));
                })
                .catch(err => done());
        });

        it("should return left value if Keyword.True is passed as first argument", function (done) {
            less.render("p{res: if(true, 25, 0);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("25"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return right value if any value but Keyword.True is passed as first argument", function (done) {
            less.render("p{res: if('true', 25, 0);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("0"));
                    done();
                })
                .catch(err => done(err));
        });
    });

module.exports = ifTest;
//slice.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const sliceTest =
    describe("str-slice()", function () {
        it("should be registered", function (done) {
            less.render("p{exist: isfunction('str-slice');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if first argument is not string", function (done) {
            less.render("p{error: str-slice(2);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected 1st arguement"));
                })
                .catch(err => done());
        });

        it("should return original string if only one arg is provided", function (done) {
            less.render("p{equal: str-slice('hi');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("hi"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should ignore unit types", function (done) {
            less.render("p{seg: str-slice('tarmac', 3cm, 6%);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("'mac'"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return a quoted with same escaping as target", function (done) {
            less.render("p{test: str-slice('tarmac', 3cm);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.match(/'mac'/));
                    done();
                })
                .catch(err => done(err));
        });

        it("should round toward zero floating point indexes", function (done) {
            less.render("p{test: str-slice(\"tarmac\", -3.2cm, 5.999);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.match(/\"ma\"/));
                    done();
                })
                .catch(err => done(err));
        });
        it("should consider endIndex = target.length, if it is not provided", function (done) {
            less.render("p{test: str-slice(\"tarmac\", -3.2cm);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.match(/\"mac\"/));
                    done();
                })
                .catch(err => done(err));
        });
    });

module.exports = sliceTest;


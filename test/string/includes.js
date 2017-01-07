//includes.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const includesTest =
    describe("str-includes()", function () {
        it("should be registered", function (done) {
            less.render("p{exist: isfunction('str-includes');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if the first argument is not string", function (done) {
            less.render("p{error: str-includes(32, 'mac');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected first arg"));
                })
                .catch(err => done());
        });

        it("should throw error if the second argument is not string", function (done) {
            less.render("p{error: str-includes('tarmac', tar);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected second arg"));
                })
                .catch(err => done());
        });

        it("should throw error if < than 2 args are provided", function (done) {
            less.render("p{error: str-includes('tarmac');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected first arg"));
                })
                .catch(err => done());
        });

        it("should return true if key: Quoted & key.value is substring", function (done) {
            less.render("p{truthy: str-includes('tarmac', 'mac');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return false if key.value isn't substring", function (done) {
            less.render("p{truthy: str-includes('mac', 'tarmac');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("false"));
                    done();
                })
                .catch(err => done(err));
        });

    });

module.exports = includesTest;

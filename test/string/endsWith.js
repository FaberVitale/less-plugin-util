//endsWith.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const endsWithTest =
    describe("str-ends-with", function () {
        it("should be registered", function (done) {
            less.render("p{exist: isfunction('str-ends-with');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if the first argument is not string", function (done) {
            less.render("p{error: str-ends-with(32, 'mac');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected first arg"));
                })
                .catch(err => done());
        });

        it("should throw error if the second argument is not string", function (done) {
            less.render("p{error: str-ends-with('tarmac', 0);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected second arg"));
                })
                .catch(err => done());
        });

        it("should throw error if < than 2 args are provided", function (done) {
            less.render("p{error: str-ends-with('mac');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("less than 2 args provided"));
                })
                .catch(err => done());
        });

        it("should return false if key.value.length > target.value.length", function (done) {
            less.render("p{falsy: str-ends-with('mac', 'tarmac');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("false"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return false if target.value doesn't ends with key.value", function (done) {
            less.render("p{falsy: str-ends-with('tarmac', 'rob');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("false"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return true if key.vakue is empty string", function (done) {
            less.render("p{truthy: str-ends-with('zed', '');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return true if target.value ends with key.value", function (done) {
            less.render("p{truthy: str-ends-with('tarmac', 'mac');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));    
        });
    });

module.exports = endsWithTest;

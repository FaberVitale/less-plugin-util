//startsWith.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const startsWithTest = describe("str-starts-with()", function () {
    it("should be registered", function (done) {
        less.render("p{exist: isfunction('str-starts-with');}", { plugins: [plugin] })
            .then(out => {
                assert(out.css.includes("true"));
                done();
            })
            .catch(err => done(err));
    });

    it("should throw error if the first argument is not string", function (done) {
        less.render("p{error: str-starts-with(32, 'mac');}", { plugins: [plugin] })
            .then(out => {
                done(new Error("should have rejected first arg"));
            })
            .catch(err => done());
    });

    it("should throw error if the second argument is not string", function (done) {
        less.render("p{error: str-starts-with(tarmac, 0);}", { plugins: [plugin] })
            .then(out => {
                done(new Error("should have rejected second arg"));
            })
            .catch(err => done());
    });

    it("should throw error if < than 2 args are provided", function (done) {
        less.render("p{error: str-starts-with('mac');}", { plugins: [plugin] })
            .then(out => {
                done(new Error("less than 2 args provided"));
            })
            .catch(err => done());
    });

    it("should return false if key.value.length > target.value.length", function (done) {
        less.render("p{falsy: str-starts-with('mac', 'tarmac');}", { plugins: [plugin] })
            .then(out => {
                assert(out.css.includes("false"));
                done();
            })
            .catch(err => done(err));
    });

    it("should return false if target.value doesn't starts with key.value", function (done) {
        less.render("p{falsy: str-starts-with('rob', 'mob');}")
            .then(out => {
                assert(out.css.includes("false"));
                done();
            })
            .catch(err => done(err));
    });

    it("should return true if key is empty string", function (done) {
        less.render("p{truthy: str-starts-with('tar', '');}", { plugins: [plugin] })
            .then(out => {
                assert(out.css.includes("true"));
                done();
            })
            .catch(err => done(err));
    });

    it("should return true if target starts with key", function (done) {
        less.render("p{truthy: str-starts-with('http://', 'http');}", { plugins: [plugin] })
            .then(out => {
                assert(out.css.includes("true"));
                done();
            })
            .catch(err => done(err));
    });

    it("should return true if target.value === key.value", function (done) {
        less.render("p{truthy: str-starts-with('tar', 'tar');}", { plugins: [plugin] })
            .then(out => {
                assert(out.css.includes("true"));
                done();
            })
            .catch(err => done(err));
    });
});

module.exports = startsWithTest;

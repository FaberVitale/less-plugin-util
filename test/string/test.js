//test.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const testTest =
    describe("str-test()", function () {
        it("should be registered", function (done) {
            less.render("p{exist: isfunction('str-test');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.search(/true/) !== -1);
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if no arg is provided", function (done) {
            less.render("p{error: str-test();}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("it should have thrown error: args < 2"));
                })
                .catch(err => done());
        });

        it("should throw error if less than 2 args are provided", function (done) {
            less.render("p{error: str-test('rock');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have thrown error: args < 2"))
                })
                .catch(err => done());
        });

        it("should throw error if invalid regex pattern is provided", function (done) {
            less.render("p{error: str-test('http', '[[');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected invalid regex"));
                })
                .catch(err => done());
        });

        it("should throw error if invalid flags are provided", function (done) {
            less.render("p{error: str-test('google', '^g', 'gir');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have thrown error invalid flags"));
                })
                .catch(err => done());
        });

        it("should return false if pattern is not present", function (done) {
            less.render("p{not-found: str-test('bottom', 'fon', 'gi' );}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("false"));
                    done();
                })
                .catch(err => done(err));           
        });

        it("should return true if pattern matches a result", function (done) {
            less.render("p{found: str-test('bottom', '\\w+', 'gi' );}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));            
        });

        it("should ignore flags if aren't type Quoted", function (done) {
            less.render("p{not-found: str-test('POM', '^pom', i);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.search(/false/) !== -1);
                    done();
                })
                .catch(err => done(err));
        });
    });

module.exports = testTest;

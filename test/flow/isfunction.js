//isfunction.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const isFunctionTest =
    describe("isfunction()", function () {
        it("should be registered", function (done) {
            less.render("p{exist: isfunction('isfunction');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return true if registered function names are passed as argument", function (done) {
            less.render("p{truthy: isfunction('rgb');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return false for unregistered functions", function (done) {
            less.render("p{falsy: isfunction('?INVALID-FUNC-name?');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("false"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if the 1st arg is not of Quoted type", function (done) {
            less.render("p{falsy: isfunction(#FFFFFF);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("is function() accepted wrong argument"));
                })
                .catch(err => done());
        });

        it("should throw error if arguments.length === 0", function (done) {
            less.render("p{error: isfunction();}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("isfunction() ignored that no arg were passed"));
                })
                .catch(err => done());
        });
    });

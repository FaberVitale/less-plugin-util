//length.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const lengthTest =
    describe("str-length()", function () {
        it("should be registered", function (done) {
            less.render("p{exist: isfunction('str-length');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if first argument is not Quoted", function (done) {
            less.render("p{error: str-length(25);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("it should have thrown error"));
                })
                .catch(err => done());            
        });

        it("should return 0 with empty string", function (done) {
            less.render("p{result: str-length(\"\");}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("0"));
                    done();
                })
                .catch(err => done(err));           
        });

        it("should return the exact length of Quoted.value", function (done) {
            less.render("p{result: str-length('tarmac');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("6"));
                    done();
                })
                .catch(err => done(err));
        });
    });

module.exports = lengthTest;
//call.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const callTest =
    describe("call()", function () {
        it("shoud be registered", function (done) {
            less.render("p{exist: isfunction('call');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error for unregistered functions", function (done) {
            less.render("p{error: call('?INVALID-FUNC-name?');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have thrown error for unregistered function"));
                })
                .catch(err => done());
        });

        it("should throw error if the 1st arg is not of Quoted type", function (done) {
            less.render("p{error: call(#FFFFFF);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("call() accepted wrong argument"));
                })
                .catch(err => done());
        });

        it("should call registered functions", function (done) {
            less.render("p{truthy: call('iscolor', #FFFFFF);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should not suppress errors of called functions", function (done) {
            less.render("p{error: call('isfunction', #FFFFFF);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("call() should have not suppress errors"))
                })
                .catch(err => done());
        });
    });

module.exports = callTest;
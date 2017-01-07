// apply.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const applyTest =
    describe("apply()", function () {
        it("shoud be registered", function (done) {
            less.render("p{exist: isfunction('apply');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        //see https://github.com/less/less.js/blob/master/lib/less/functions/function-registry.js
        it("should throw error for unregistered functions", function (done) {
            less.render("p{error: apply('?INVALID-FUNC-name?');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have thrown error for unregistered function"));
                })
                .catch(err => done());
        });

        it("should throw error if the 1st arg is not of Quoted type", function (done) {
            less.render("p{error: apply(#FFFFFF);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("apply() accepted wrong argument"));
                })
                .catch(err => done());
        });

        it("should call registered functions accepting a single argument", function (done) {
            less.render("p{truthy: apply('iscolor', #FFFFFF);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should call registered functions accepting a  comma separated list", function (done) {
            less.render("@list: 2, 3 ,4; p{res: apply('min', @list);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("2"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should call registered functions accepting a  space separated list", function (done) {
            less.render("@list: 2 3 4; p{res: apply('min', @list);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("2"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should not suppress errors of called functions", function (done) {
            less.render("p{error: apply('isfunction', #FFFFFF);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("apply() should have not suppress errors"))
                })
                .catch(err => done());
        });
    });

module.exports = applyTest;


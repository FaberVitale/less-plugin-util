//indexOf.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const indexOfTest =
    describe("str-index-of()", function () {
        it("should be registered", function (done) {
            less.render("p{exist: isfunction('str-index-of');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if the first argument is not string", function (done) {
            less.render("p{error: str-index-of(#ffffff);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected first arg"));
                })
                .catch(err => done());
        });

        it("should throw error if the first argument is not string", function (done) {
            less.render("p{error: str-index-of(32, 'grep');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected first arg"));
                })
                .catch(err => done());
        });

        it("should throw error if the second argument is not string", function (done) {
            less.render("p{error: str-index-of('mac', 0);}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected second arg"));
                })
                .catch(err => done());
        });

        it("should throw error if < than 2 args are provided", function (done) {
            less.render("p{error: str-index-of('run');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("less than 2 args provided"));
                })
                .catch(err => done());
        });

        it("shold return -1 if key.value.length > target.value.length", function (done) {
            less.render("p{not-found: str-index-of('run', 'prune');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.match(/-1/));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return the index of key if key.value substring", function (done) {
            less.render("p{found: str-index-of('runner', 'nn');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.match(/2/));
                    done();
                })
                .catch(err => done(err));          
        });

        it("should return 0 if key is empty string", function (done) {
            less.render("p{found: str-index-of('runner','');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.match(/0/));
                    done();
                })
                .catch(err => done(err));         
        });

        it("should return -1 if key.value-length < target.value.length and not substr", function(done){
            less.render("p{not-found: str-index-of('runner','abe');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("-1"));
                    done();
                })
                .catch(err => done(err));            
        });
    });

module.exports = indexOfTest;

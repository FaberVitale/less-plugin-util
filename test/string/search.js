//search.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const searchTest =
    describe("str-search()", function () {
        it("should be registered", function (done) {
            less.render("p{exist: isfunction('str-search');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.search(/true/) !== -1);
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if no arg is provided", function (done) {
            less.render("p{error: str-search();}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("it should have thrown error: args < 2"));
                })
                .catch(err => done());
        });

        it("should throw error if less than 2 args are provided", function (done) {
            less.render("p{error: str-search('moldy bread');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have thrown error: args < 2"))
                })
                .catch(err => done());
        });

        it("should throw error if invalid regex pattern is provided", function (done) {
            less.render("p{error: str-search('http', '((');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have rejected invalid regex"));
                })
                .catch(err => done());
        });

        it("should throw error if invalid flags are provided", function (done) {
            less.render("p{error: str-search('http', 'https?', 'gir');}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("should have thrown error invalid flags"));
                })
                .catch(err => done());
        });

        it("should return -1 if pattern is not present", function (done) {
            less.render("p{not-found: str-search('file:///http/', '^https?', 'gi' );}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.search(/-1/) !== -1);
                    done();
                })
                .catch(err => done(err));           
        });

        it("should return the index of the first instance of a found pattern", function (done) {
            less.render("p{found: str-search('-http-HTTP-http', 'https?', 'gi' );}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.search(/found:\u0020+1;/) !== -1);
                    done();
                })
                .catch(err => done(err));            
        });

        it("should ignore flags if aren't type Quoted", function (done) {
            less.render("p{not-found: str-search('HTTP', 'https?', i);}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.search(/not-found:\u0020+-1;/) !== -1);
                    done();
                })
                .catch(err => done(err));
        });
    });

module.exports = searchTest;

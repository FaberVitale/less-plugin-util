//type.js
const assert = require("assert");
const less = require("less");
const plugin = require("../../");

const typeTest =
    describe("type()", function () {
        it("shoud be registered", function (done) {
            less.render("p{exist: isfunction('type');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes("true"));
                    done();
                })
                .catch(err => done(err));
        });

        it("should return \"Quoted\" if string is passed as arg", function (done) {
            less.render("p{string: type('test');}", { plugins: [plugin] })
                .then(out => {
                    assert(out.css.includes('"Quoted"'));
                    done();
                })
                .catch(err => done(err));
        });

        it("should throw error if arguments.length === 0", function (done) {
            less.render("p{error: type();}", { plugins: [plugin] })
                .then(out => {
                    done(new Error("type() should have thrown an error if no arg has been passed"));
                })
                .catch(err => done());
        });
    });

module.exports = typeTest;
describe("When app.js is referenced", function() {
    it("matpriser module should be created", function() {
        expect(angular.module("matpriser")).toBeDefined();
    });
});
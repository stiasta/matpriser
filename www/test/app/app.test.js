describe("When app.js is called", function() {
    it("should create matpriser module", function() {
        expect(angular.module("matpriser")).toBeDefined();
    });

    describe("when home state is called", function() {
        var state;
        beforeEach(function(){
        	module("matpriser");
        });

        beforeEach(inject(function($state) {
            state = $state.get("home");
        }));

        it("should call the barcodeController", function() {
        	expect(state.controller).toBe("barcodeController");
        });

        it("should use / as the url", function() {
        	expect(state.url).toBe("/");
        });
    });
});
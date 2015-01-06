describe("When barcode controller is called", function() {
    var controller,
    	mockBarcodeservice;
    beforeEach(function() {
        module("matpriser");
    });

    beforeEach(inject(function($controller) {
        mockBarcodeservice = {
            scanIsCalled: false,

            scan: function() {
                this.scanIsCalled = true;
                return {
                    then: function() {}
                };
            }
        };

        controller = $controller("barcodeController", {
            barcodeService: mockBarcodeservice
        });
    }));

    it("it should exist", function() {
        expect(controller).toBeDefined();
    });

    it("scan() for cordovaBarcodeScanner should be called", function() {
    	expect(mockBarcodeservice.scanIsCalled).toBe(true);
    });
});
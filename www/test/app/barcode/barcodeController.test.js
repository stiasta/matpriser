describe("When barcode controller is referenced", function() {
    var controller,
        mockBarcodeservice,
        mockIonicPlatform,
        mockState;

    beforeEach(function() {
        module("matpriser");
    });

    beforeEach(inject(function($controller) {
        mockBarcodeservice = {
            scanIsCalled: false,

            scan: function() {
                this.scanIsCalled = true;
                return {
                    then: function(func) { func(); }
                };
            }
        };

        mockIonicPlatform = {
            ready: function(func) {
                func();
            }
        };

        mockState = {
            transitionToIsCalledWith: undefined,
            transitionTo: function(inputState) {
                this.transitionToIsCalledWith = inputState;
            }
        };

        controller = $controller("barcodeController", {
            $ionicPlatform: mockIonicPlatform,
            $state: mockState,
            barcodeService: mockBarcodeservice
        });
    }));

    it("it should exist", function() {
        expect(controller).toBeDefined();
    });

    describe("and scan() for cordovaBarcodeScanner is called", function() {
        it("should be called", function() {
            expect(mockBarcodeservice.scanIsCalled).toBe(true);
        });

        it("should transition to information state", function() {
            expect(mockState.transitionToIsCalledWith).toBe("price");
        });
    });
});
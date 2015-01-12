describe("When barcodeService is referenced", function() {
    var service,
        mockCordovaBarcodeScanner,
        mockWindow;

    beforeEach(function() {
        module("matpriser");
    });

    beforeEach(function() {
        module(function($provide) {
            mockCordovaBarcodeScanner = {
                scanIsCalled: false,
                scan: function() {
                    this.scanIsCalled = true;
                    return {
                        then: function() {
                        }
                    };
                }
            };

            mockWindow = {
                cordova: false
            };

            $provide.value("$cordovaBarcodeScanner", mockCordovaBarcodeScanner);
            $provide.value("$window", mockWindow);
        });

        inject(function($injector, barcodeService) {
            service = $injector.get("barcodeService");
            service = barcodeService;
        });
    });

    it("should be defined", function() {
        expect(service).toBeDefined();
    });

    describe("and scan is called", function() {
        it("should return the barcode TestBarcode when in development mode", function() {
            service.scan().then(function(value) {
                expect(value.text).toBe("TestBarcode");
                exoect(value.cancelled).toBe(false);
            });
        });

        it("should call scan method in $cordovaBarcodeScanner", function() {
            mockWindow.cordova = true;

            // Global object :S how can i mock this out?
            ionic.Platform.isWebView = function(){ return true; };
            service.scan();
            expect(mockCordovaBarcodeScanner.scanIsCalled).toBe(true);
        });
    });
});
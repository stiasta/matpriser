describe("When priceController is referenced", function() {
    var controller,
        mockBarcodeservice,
        mockProductservice,
        mockIonicLoading;

    beforeEach(function() {
        module("matpriser");

        inject(function($controller) {
            mockBarcodeservice = {
                text: "testBarcode",
                scanIsCalled: false,

                scan: function() {
                    this.scanIsCalled = true;
                    return {
                        then: function(func) {
                            func();
                        }
                    };
                }
            };

            mockProductservice = {
                getIsCalledWithParameter: undefined,
                get: function(input) {
                    this.getIsCalledWithParameter = input;

                    return {
                        success: function() {
                            return {
                                error: function() {
                                    return {
                                        finally: function() {}
                                    };
                                }
                            };
                        }
                    };
                }
            };

            mockIonicLoading = {
                showIsCalled: false,
                hideIsCalled: false,
                show: function() {
                    this.showIsCalled = true;
                },

                hide: function() {
                    this.hideIsCalled = true;
                }
            };

            controller = $controller("priceController", {
                ionicLoading: mockIonicLoading,
                barcodeService: mockBarcodeservice,
                productService: mockProductservice
            });
        });
    });

    it("it should be created", function() {
        expect(controller).toBeDefined();
    });

    describe("productService.get", function() {
        it("should be called with text from barcodeService", function() {
            expect(mockProductservice.getIsCalledWithParameter).toBe(mockBarcodeservice.text);
        });

        it('should show loader', function() {
            expect(mockIonicLoading.showIsCalled).toBe(true);
        });
    });

    describe("with product variable", function() {
        it("the variable must exist", function() {
            expect(controller.product).toBeDefined();
        });

        it("the newPrice should be initialized to be the same as price", function() {
            expect(controller.product.newPrice).toBe(controller.product.price);
        })
    });
});
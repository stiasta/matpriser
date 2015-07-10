describe("When priceController is referenced", function() {
    var controller,
        mockBarcodeservice,
        mockProductservice,
        mockIonicLoading;

    beforeEach(function() {
        module("matpriser");

        inject(function($controller) {
            angular.element(document.body).append("<input id='new_price' type='number' />");
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
                savedProduct: undefined,
                set: function(product) {
                    this.savedProduct = product;
                    return {
                        success: function(func) {
                            func();
                        }
                    };
                },
                get: function(input) {
                    this.getIsCalledWithParameter = input;

                    return {
                        success: function(func) {
                            func && func();
                            return {
                                error: function() {
                                    return {
                                        finally: function(func) {
                                            func();
                                        }
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
                $ionicLoading: mockIonicLoading,
                barcodeService: mockBarcodeservice,
                productService: mockProductservice
            });
        });
    });

    afterEach(function() {
        document.body.innerHTML = "";
    });

    it("it should be created", function() {
        expect(controller).toBeDefined();
    });

    it("should have a function called save", function() {
        expect(controller.save).toBeDefined();
    });

    it("should save product in productService when save is called", function() {
        var product = {
            name: "foo"
        };
        controller.save(product);
        expect(mockProductservice.savedProduct).toBe(product);
    });

    describe("productService.get", function() {
        it("should be called with text from barcodeService", function() {
            expect(mockProductservice.getIsCalledWithParameter).toBe(mockBarcodeservice.text);
        });

        it('should show loader', function() {
            expect(mockIonicLoading.showIsCalled).toBe(true);
        });

        it("should hide loader when finally is called", function() {
            expect(mockIonicLoading.hideIsCalled).toBe(true);
        });

        it("should set newPrice to price from service", function() {
            expect(controller.product.newPrice).toBe(controller.product.price);
        });
    });

    describe("with product variable", function() {
        it("the variable must exist", function() {
            expect(controller.product).toBeDefined();
        });

        it("the newPrice should be initialized to be the same as price", function() {
            expect(controller.product.newPrice).toBe(controller.product.price);
        });
    });
});
describe("productService", function() {
    var service,
        provider,
        mockHttp;

    beforeEach(module("matpriser"));

    beforeEach(function() {
        mockHttp = {
            getIsCalled: false,
            getIsCalledWithUrl: undefined,
            getIsCalledWithParams: undefined,
            get: function(url, config) {
                this.getIsCalled = true;
                this.getIsCalledWithUrl = url;
                this.getIsCalledWithParams = config.params;
            },

            post: function() {
                return {
                    success: function(func) {
                        return func(true);
                    }
                }
            }
        };

        ionic.Platform.isWebView = function() {
            return true;
        };

        module(function($provide) {
            $provide.value('$http', mockHttp);
        });

        inject(function(productService) {
            service = productService;
        });
    });

    it("should be defined", function() {
        expect(service).toBeDefined();
    });

    describe("get is called", function() {
        it("should call http.get", function() {
            service.get("barcode");
            expect(mockHttp.getIsCalled).toBe(true);
        });

        it("should call http.get with correct url", function() {
            service.get("barcode");
            expect(mockHttp.getIsCalledWithUrl).toBe("product");
        });

        it("should call http.get with barcode", function() {
            service.get("barcode");
            expect(mockHttp.getIsCalledWithParams.barcode).toBe("barcode");
        });

        describe('and its in a webbrowser', function() {
            beforeEach(function() {
                ionic.Platform.isWebView = function() {
                    return false;
                };
            });

            it('should return a object with name dummy', function() {
                service.get("foo").success(function(product) {
                    expect(product.name).toBe("dummy");
                });
            });
        });
    });
});
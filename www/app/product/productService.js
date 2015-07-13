(function () {
    angular.module('matpriser')
        .service('productService', function ($http, $q) {
        var productservice = this;
        productservice.get = function (barcode) {
            if (ionic.Platform.isWebView()) {
                return $http.post("exists", {
                    barcode: barcode
                })
                    .success(function (data) {
                    if (data) {
                        $http.get("product", {
                            params: {
                                barcode: barcode
                            }
                        });
                    }
                });
            } else {
                return {
                    success: function (func) {
                        func({
                            id: 1,
                            storeId: 2,
                            barcode: barcode,
                            name: "dummy",
                            manufacturer: "manufacturer",
                            created: Date.now(),
                            price: 13.37
                        });

                        return {
                            error: function () {
                                return {
                                    finally: function (func) {
                                        func();
                                    }
                                };
                            }
                        };
                    }
                }
            }
        };

        productservice.set = function (product) {
            if (ionic.Platform.isWebView()) {
                return navigator.geolocation.getCurrentPosition(function (position) {
                    product.long = position.coords.longitude;
                    product.lat = position.coords.latitude;
                    return save(product);
                }, function () {
                        return save(product);
                    });
            } else {
                return {
                    success: function (func) {
                        func();
                    }
                }
            }
        };

        function save(product) {
            return $http.post("http://matpriser.azurewebsites.net/price/add", product);
        }
    });
} ());
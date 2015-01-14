(function() {
    angular.module('matpriser')
        .controller("priceController", function($ionicLoading, barcodeService, productService) {
            var pricecontroller = this;
            pricecontroller.product = {
                price: 0,
                newPrice: 0,
                name: "Not found",
                lastUpdated: Date.now()
            };

           	$ionicLoading.show();
            productService
                .get(barcodeService.text)
                .success(function(data) {
                    pricecontroller.product = {
                        price: 0,
                        newPrice: 0,
                        name: "Not found",
                        lastUpdated: Date.now()
                    };
                })
                .error(function(data) { })
                .finally(function(){
                	$ionicLoading.hide();
                });
        });
})();
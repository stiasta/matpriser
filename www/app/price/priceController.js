(function () {
    angular.module('matpriser')
        .controller("priceController", controller);

    function controller($ionicLoading, $state, barcodeService, productService) {
        var vm = this;
        vm.save = save;
        
        vm.product = {
            price: 0,
            newPrice: 0,
            name: "Not found",
            created: Date.now()
        };

        init();
        return vm;

        function save(product) {
            productService.set(product)
                .success(function () {
                $state.transitionTo("home");
            });
        }

        function init() {
            $ionicLoading.show();
            productService
                .get(barcodeService.text)
                .success(function (data) {
                    if (data) {
                        vm.product = data;
                        vm.product.newPrice = data.price;
                    }
                })
                .error(function (data) { })
                .finally(function () {
                $ionicLoading.hide();
            });
        }
    }
})();
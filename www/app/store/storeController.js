(function() {
    angular.module("matpriser")
        .controller('storeController', function($state, storeService) {
            var storeController = this;
            storeController.stores = [];
            storeController.set = function(store) {
                storeService
                    .set(store)
                    .then(function() {
                        $state.transitionTo("barcode");
                    });
            };

            storeService
                .get()
                .then(function(stores) {
                    storeController.stores = stores;
                });
        });
})();
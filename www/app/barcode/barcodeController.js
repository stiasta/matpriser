(function() {
    angular.module("matpriser")
        .controller("barcodeController", function($ionicPlatform, $state, barcodeService) {
            $ionicPlatform.ready(function() {
                barcodeService
                    .scan()
                    .then(function(imageData) {
                            $state.transitionTo("price");
                        },
                        function(error) {
                            console.log("An error happened -> " + error);
                        });
            });
        });
})();
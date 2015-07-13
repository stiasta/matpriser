(function () {
    angular.module("matpriser")
        .controller("barcodeController", controller);

    function controller($ionicPlatform, $state, $ionicNavBarDelegate, barcodeService) {
        $ionicNavBarDelegate.title("Scan strekkode");
        if (!ionic.Platform.isReady) {
            $ionicPlatform.ready(function () {
                init();
            });
        } else {
            init();
        }

        function init() {
            barcodeService
                .scan()
                .then(function (imageData) {
                $state.transitionTo("price");
            },
                function (error) {
                    console.log("An error happened -> " + error);
                });
        }
    }
})();
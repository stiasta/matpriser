(function() {
    angular.module("matpriser")
        .controller("barcodeController", function(barcodeService) {
            barcodeService.scan()
                .then(function(imageData) {
                        console.log(imageData);
                    },
                    function(error) {
                        console.log("An error happened -> " + error);
                    });
        });
})();
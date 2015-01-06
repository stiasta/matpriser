(function() {
    angular.module('matpriser')
        .service("barcodeService", function($window, $q, $cordovaBarcodeScanner) {
            var barcodeservice = this;

            barcodeservice.barcode = "";
            barcodeservice.isCancelled = false;
            barcodeservice.format = "";

            barcodeservice.scan = function() {
                    return $cordovaBarcodeScanner.scan()
                                                 .then(function(imageData) {
                                                            barcodeservice.barcode = imageData.text;
                                                            barcodeservice.isCancelled = imageData.cancelled;
                                                            barcodeservice.format = imageData.format;
                                                        });
            };
        });
})();
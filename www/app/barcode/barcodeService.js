(function() {
    angular.module('matpriser')
        .service("barcodeService", function($window, $q, $cordovaBarcodeScanner) {
            var barcodeservice = this;

            barcodeservice.text = "";
            barcodeservice.cancelled = false;
            barcodeservice.format = "";

            barcodeservice.scan = function() {
                if (ionic.Platform.isWebView()) {
                    return $cordovaBarcodeScanner
                        .scan()
                        .then(function(imageData) {
                            barcodeservice.text = imageData.text;
                            alert(imageData.text);
                            barcodeservice.cancelled = imageData.cancelled;
                            barcodeservice.format = imageData.format;
                        });
                } else {
                    // Creating test data for development purposes
                    var deferred = $q.defer();
                    barcodeservice.text = "TestBarcode";
                    barcodeservice.cancelled = false;
                    barcodeservice.format = "EAN-13";
                    deferred.resolve(barcodeservice);
                    return deferred.promise;
                }
            };
        });
})();
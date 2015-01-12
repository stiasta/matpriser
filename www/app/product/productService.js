(function() {
    angular.module('matpriser')
        .service('productService', function($http, $q) {
            var productservice = this;
            productservice.get = function(barcode) {
        		return $http.get("product", {
        			params: {
        				barcode: barcode
        			}
        		});
            };
        });
}());
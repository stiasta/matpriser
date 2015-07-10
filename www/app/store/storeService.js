(function() {
    angular.module('matpriser')
        .service("storeService", function($q) {
            var storeService = this;
            storeService.store = {};
            storeService.set = function(store) {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise.then(function() {
                    storeService.store = store;
                });
            };

            storeService.get = function() {
                var deferred = $q.defer();
                deferred.resolve([{
                    name: "Bunnpris",
                    id: 1
                }, {
                    name: "Coop Hypermarked",
                    id: 4
                }, {
                    name: "Coop Mega",
                    id: 5
                }, {
                    name: "Coop Prix",
                    id: 6
                }, {
                    name: "Kiwi",
                    id: 3
                }, {
                    name: "Rema 1000",
                    id: 2
                }, {
                    name: "Rimi",
                    id: 7
                }]);

                return deferred.promise;
            };
        });
})();
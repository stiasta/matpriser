(function() {
    angular.module('matpriser')
        .service("storeService", function() {
            var storeService = this;
            storeService.get = function() {
                return [{
                    navn: "Bunnpris",
                    id: 1
                }, {
                    navn: "Coop Mega",
                    id: 3
                }, {
                    navn: "Kiwi",
                    id: 2
                }];
            };
        });
})();
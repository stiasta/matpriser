describe('when storeService is called', function() {
    var service;

    beforeEach(function() {
        module("matpriser");
    });

    beforeEach(function() {
        inject(function($injector) {
            service = $injector.get("storeService");
        });
    });

    it("should be created", function() {
        expect(service).toBeDefined();
    });

    it("should have a function called get", function() {
        expect(service.get).toBeDefined();
    });
});
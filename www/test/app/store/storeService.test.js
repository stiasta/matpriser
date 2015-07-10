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

    it("should have a variable called store", function() {
        expect(service.store).toBeDefined();
    });

    it("should have a function called set", function() {
        expect(service.set).toBeDefined();
    });

    it("should save input store in the store variable when set is called", function() {
        var name = "foo";
        service
            .set({
                name: name
            })
            .then(function() {
                expect(service.store.name).toBe(name);
            });
    })
});
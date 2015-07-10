describe('when storecontroller is used', function() {
    var controller,
        store,
        mockstoreService,
        mockState;

    beforeEach(function() {
        module("matpriser");

        store = {
            name: "Rema 1000",
            id: 1
        };

        mockstoreService = {
            inputStoreForSet: undefined,
            haveRetrievedStores: false,
            get: function() {
                return {
                    parent: this,
                    then: function(func) {
                        this.parent.haveRetrievedStores = true;
                        func([store, {
                            name: "Rimi",
                            id: 2
                        }, {
                            name: "Bunnpris",
                            id: 3
                        }]);
                    }
                };
            },

            set: function(store) {
                this.inputStoreForSet = store;
                return {
                    then: function(func) {
                        func();
                    }
                };
            }
        };

        mockState = {
            transitionToState: undefined,
            transitionTo: function(state) {
                this.transitionToState = state;
            }
        };

        inject(function($controller) {
            controller = $controller("storeController", {
                $state: mockState,
                storeService: mockstoreService
            });
        });
    });

    it("should be created", function() {
        expect(controller).toBeDefined();
    });

    it("should have the variable stores", function() {
        expect(controller.stores).toBeDefined();
    });

    it("should have the function set", function() {
        expect(controller.set).toBeDefined();
    });

    it("should retrieve stores from storeService", function() {
        expect(mockstoreService.haveRetrievedStores).toBe(true);
    });

    describe("when set is called", function() {
        it("should call the set variable in the storeService", function() {
            controller.set(store);
            expect(mockstoreService.inputStoreForSet).toBe(store);
        })
    });
});
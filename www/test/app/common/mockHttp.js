var mock = mock || {};
mock.http = (function() {
    return {
        getIsCalled: false,
        getIsCalledWithUrl: undefined,
        getIsCalledWithParams: undefined,
        get: function(url, config) {
            this.getIsCalled = true;
            this.getIsCalledWithUrl = url;
            this.getIsCalledWithParams = config.params;
        }
    };
})();
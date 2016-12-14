var MessageFactory = function() {
    this.createInitMessage = function() {
        var json = {};
        json.type = "init";
        //OF maybe add some other fields here;
        return JSON.stringify(json);
    }

    this.getMessage = function(message) {
        return JSON.parse(message);
    }

    this.createSyncMessage = function() {
        var json = {};
        json.type = "sync";
        //OF maybe add some other fields here;
        return JSON.stringify(json);
    }
}

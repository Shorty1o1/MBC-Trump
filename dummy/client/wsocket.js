var WSocket = function(serverAddr) {
    log("WSocket", "Init websocket");
    log("WSocket", "Server located at: " + serverAddr);
    var connection = new WebSocket('ws://' + serverAddr, 'echo-protocol');

    connection.onmessage = function(message) {
        log("WSocket", "Got a message from " + serverAddr);
        log("WSocket", message);
    }

    connection.onopen = function(message) {
        log("WSocket", "Websocket to " + serverAddr + " is established");
    }

    this.addConnectionOpenCallback = function(callback) {
        connection.onopen = function(event) {
            callback(event);
        }
        log("WSocket", "Connection open callback added");
    }

    this.send = function(message) {
        log("WSocket", "sending message: " + message);
        connection.send(message);
    }

    this.addReceiveCallback = function(callback) {
        connection.onmessage = function(message) {
            callback(message);
        }
        log("WSocket", "ReceiveCallback added");
    }
}

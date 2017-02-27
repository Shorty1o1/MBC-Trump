"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WSocket = (function () {
    function WSocket() {
        this.addConnectionOpenCallback = function (callback) {
            this.connection.onopen = function (event) {
                callback(event);
            };
            console.log("WSocket Connection open callback added");
        };
        this.addReceiveCallback = function (callback) {
            this.connection.onmessage = function (message) {
                callback(message);
            };
            console.log("WSocket ReceiveCallback added");
        };
        this.connection = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port, 'echo-protocol');
        console.log("Created Websocket");
        this.connection.onmessage = function (message) {
            console.log("WSocket got a message from server");
            console.log("WSocket" + message);
        };
        this.connection.onopen = function (message) {
            console.log("Websocket to server is established");
        };
    }
    WSocket.prototype.send = function (message) {
        console.log("WSocket sending message: " + message);
        this.connection.send(message);
    };
    return WSocket;
}());
exports.WSocket = WSocket;
//# sourceMappingURL=WSocket.js.map
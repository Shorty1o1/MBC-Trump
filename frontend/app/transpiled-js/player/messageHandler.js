"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageHandler = (function () {
    function MessageHandler(socket, messageFactory) {
        var _this = this;
        this.handler = {};
        socket.addReceiveCallback(function (message) {
            _this.handleMessages(message);
        });
    }
    MessageHandler.prototype.handleMessages = function (message) {
        if (message.data) {
            if (message.data == "wrong message") {
            }
            console.log("Client Got message " + message.data);
            try {
                var messageObj = this.messageFactory.getMessage(message.data);
                for (var _i = 0, _a = this.handler[messageObj.type]; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler();
                }
            }
            catch (err) {
                console.log("ERROR: " + err);
            }
        }
        else {
            console.log("Client No data in this message available");
        }
    };
    MessageHandler.prototype.addHandler = function (messageType, handler) {
        if (this.handler[messageType] === undefined) {
            this.handler[messageType] = [];
        }
        this.handler[messageType].push(handler);
    };
    return MessageHandler;
}());
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=messageHandler.js.map
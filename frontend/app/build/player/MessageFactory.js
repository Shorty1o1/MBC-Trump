"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SONG_REQUEST = "song_request";
exports.RTT = "rtt";
exports.PLAYER_DELAY = "player_delay";
exports.IP_RECEIVED = "ip_message";
var MessageFactory = (function () {
    function MessageFactory() {
    }
    MessageFactory.prototype.getMessage = function (message) {
        return JSON.parse(message);
    };
    MessageFactory.prototype.createRTTMessage = function () {
        var json = {};
        json.type = exports.RTT;
        json.sentTime = Date.now();
        //OF maybe add some other fields here;
        return JSON.stringify(json);
    };
    MessageFactory.prototype.createPlayerDelayMessage = function () {
        var json = {};
        json.type = exports.PLAYER_DELAY;
        return JSON.stringify(json);
    };
    MessageFactory.prototype.createSongRequestMessage = function () {
        var json = {};
        json.type = exports.SONG_REQUEST;
        return JSON.stringify(json);
    };
    MessageFactory.prototype.createIpMessagge = function (ipAddr) {
        var json = {};
        json.type = exports.IP_RECEIVED;
        json.ip = ipAddr;
        return JSON.stringify(json);
    };
    return MessageFactory;
}());
exports.MessageFactory = MessageFactory;
//# sourceMappingURL=MessageFactory.js.map
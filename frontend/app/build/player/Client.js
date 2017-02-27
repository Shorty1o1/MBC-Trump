"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WSocket_1 = require("./WSocket");
var MessageFactory_1 = require("./MessageFactory");
var Player_1 = require("./Player");
var Client = (function () {
    function Client() {
        var _this = this;
        this.rtt = 0;
        this.rttSum = 0;
        this.rttCounter = 0;
        this.firstTimeTemp = 0;
        this.timeAtStartPlayerDelay = 0;
        this.messageFactory = new MessageFactory_1.MessageFactory();
        this.wsocket = new WSocket_1.WSocket(); // TODO -> sp�ter zu player
        this.wsocket.addReceiveCallback(function (message) {
            _this.handleMessages(message);
        });
        console.log("Client callback for receiving messages added");
        this.player = new Player_1.Player();
        this.player.createAudioElem();
        console.log("Client Audio element created");
        this.wsocket.addConnectionOpenCallback(function (event) {
            console.log("Client Connection to server established");
            var ipAddr = window.location.hostname;
            _this.sendIpAddr(ipAddr);
        });
    }
    Client.prototype.sendRTT = function () {
        var rttMessage = this.messageFactory.createRTTMessage();
        this.wsocket.send(rttMessage);
    };
    Client.prototype.sendPLAYER_DELAY = function () {
        var playerDelayMessage = this.messageFactory.createPlayerDelayMessage();
        this.wsocket.send(playerDelayMessage);
    };
    Client.prototype.sendSONG_REQUEST = function () {
        var songRequestMessage = this.messageFactory.createSongRequestMessage();
        this.wsocket.send(songRequestMessage);
    };
    Client.prototype.sendIpAddr = function (ipAddr) {
        var ipMessage = this.messageFactory.createIpMessagge(ipAddr);
        this.wsocket.send(ipMessage);
    };
    Client.prototype.handleMessages = function (message) {
        if (message.data) {
            if (message.data == "wrong message") {
            }
            console.log("Client Got message " + message.data);
            try {
                var messageObj = this.messageFactory.getMessage(message.data);
                switch (messageObj.type) {
                    case MessageFactory_1.RTT:
                        this.handleRTTMessage(messageObj);
                        break;
                    case MessageFactory_1.PLAYER_DELAY:
                        this.handlePlayerDelayMessage(messageObj);
                        break;
                    case MessageFactory_1.SONG_REQUEST:
                        this.handleSongRequestMessage(messageObj);
                        break;
                    case MessageFactory_1.IP_RECEIVED:
                        this.handleIpReceived(messageObj);
                        break;
                    default:
                        console.log("Client Message type not supported");
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
    Client.prototype.initRttAndDelay = function () {
        for (var i = 0; i < 10; i++) {
            this.sendRTT();
        }
        this.sendPLAYER_DELAY();
    };
    Client.prototype.handleIpReceived = function (messageObj) {
        console.log("ip has been set");
        this.initRttAndDelay();
    };
    Client.prototype.handleRTTMessage = function (messageObj) {
        var sentTime = messageObj.sentTime;
        var receivedTime = Date.now();
        this.rttSum += ((receivedTime - sentTime) / 2);
        this.rttCounter++;
        this.rtt = this.rttSum / this.rttCounter;
        console.log(this.rtt);
    };
    Client.prototype.handlePlayerDelayMessage = function (messageObj) {
        console.log("received PlayerDelayMessage");
        this.initTestAudio(messageObj.source);
    };
    Client.prototype.handleSongRequestMessage = function (messageObj) {
        this.firstTimeTemp = Date.now();
        console.log("received SongRequestMessage");
        this.initAudio(messageObj.source, messageObj.time);
    };
    Client.prototype.playPauseToggle = function () {
        if (this.player.getState() === Player_1.Player.PAUSE) {
            this.player.start();
        }
        else {
            this.player.pause();
        }
        this.stateChangedEventFunction(this.player.getState());
    };
    Client.prototype.initTestAudio = function (src) {
        var _this = this;
        this.player.setSource(src);
        console.log("Client source is set");
        this.player.mute();
        this.player.start();
        this.timeAtStartPlayerDelay = Date.now();
        window.setTimeout(function () {
            var delay = ((Date.now() - _this.timeAtStartPlayerDelay) / 1000) - (_this.player.getCurrentTime());
            _this.player.setDelay(delay);
            _this.player.pause();
            _this.player.unmute();
            _this.sendSONG_REQUEST();
            console.log(delay);
        }, 1000);
    };
    Client.prototype.initAudio = function (src, time) {
        this.player.setSource(src);
        console.log("Client source is set");
        this.player.setTime(time + (this.rtt / 1000));
        console.log("Client time is set");
        this.player.start();
        console.log(Date.now() - this.firstTimeTemp);
    };
    Client.prototype.addChangeEventHandler = function (callback) {
        this.stateChangedEventFunction = callback;
    };
    return Client;
}());
exports.Client = Client;
;
//# sourceMappingURL=Client.js.map
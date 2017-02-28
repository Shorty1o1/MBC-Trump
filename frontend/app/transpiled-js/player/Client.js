"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WSocket_1 = require("./WSocket");
var MessageFactory_1 = require("./MessageFactory");
var Player_1 = require("./Player");
var messageHandler_1 = require("./messageHandler");
var Client = (function () {
    function Client() {
        var _this = this;
        this.rtt = 0;
        this.rttSum = 0;
        this.rttCounter = 0;
        this.firstTimeTemp = 0;
        this.timeAtStartPlayerDelay = 0;
        this.handleIpReceived = function (messageObj) {
            console.log("ip has been set");
            _this.initRttAndDelay();
        };
        this.handleRTTMessage = function (messageObj) {
            var sentTime = messageObj.sentTime;
            var receivedTime = Date.now();
            _this.rttSum += ((receivedTime - sentTime) / 2);
            _this.rttCounter++;
            _this.rtt = _this.rttSum / _this.rttCounter;
            console.log(_this.rtt);
        };
        this.handlePlayerDelayMessage = function (messageObj) {
            console.log("received PlayerDelayMessage");
            _this.initTestAudio(messageObj.source);
        };
        this.handleSongRequestMessage = function (messageObj) {
            _this.firstTimeTemp = Date.now();
            console.log("received SongRequestMessage");
            _this.initAudio(messageObj.source, messageObj.time);
        };
        this.messageFactory = new MessageFactory_1.MessageFactory();
        this.wsocket = new WSocket_1.WSocket(); // TODO -> sp�ter zu player
        this.messageHandler = new messageHandler_1.MessageHandler(this.wsocket, this.messageFactory);
        this.messageHandler.addHandler("rtt", this.handleRTTMessage);
        this.messageHandler.addHandler("player_delay", this.handlePlayerDelayMessage);
        this.messageHandler.addHandler("song_request", this.handleSongRequestMessage);
        this.messageHandler.addHandler("ip_message", this.handleIpReceived);
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
    Client.prototype.initRttAndDelay = function () {
        for (var i = 0; i < 10; i++) {
            this.sendRTT();
        }
        this.sendPLAYER_DELAY();
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
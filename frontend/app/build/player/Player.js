"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = (function () {
    function Player() {
        this.state = Player.PAUSE;
        this.delay = 0;
    }
    Player.prototype.createAudioElem = function () {
        this.audio = document.createElement('audio');
        console.log("Player audio element created");
    };
    Player.prototype.start = function () {
        this.audio.play();
        this.state = Player.PLAY;
        console.log("Player audio started at " + this.audio.currentTime);
    };
    Player.prototype.setSource = function (source) {
        this.audio.setAttribute('src', source);
        console.log("Player source set to " + source);
    };
    Player.prototype.setTime = function (time) {
        console.log("Setting time.." + time);
        var before = this.audio.currentTime;
        this.audio.currentTime = time + this.delay;
        console.log("Player audio time from " + before + " is set to " + time);
    };
    Player.prototype.pause = function () {
        this.audio.pause();
        this.state = Player.PAUSE;
        console.log("Player pause");
    };
    Player.prototype.getCurrentTime = function () {
        console.log("getCurrentTime: " + this.audio.currentTime);
        // var time = audio.currentTime;
        // document.body.innerHTML += time + "\n";
        return this.audio.currentTime;
    };
    Player.prototype.mute = function () {
        this.audio.muted = true;
    };
    Player.prototype.unmute = function () {
        this.audio.muted = false;
    };
    Player.prototype.setDelay = function (delay) {
        this.delay = delay;
    };
    Player.prototype.stop = function () {
        this.audio.stop;
    };
    Player.prototype.getState = function () {
        return this.state;
    };
    return Player;
}());
Player.PLAY = "play";
Player.PAUSE = "pause";
exports.Player = Player;
//# sourceMappingURL=Player.js.map
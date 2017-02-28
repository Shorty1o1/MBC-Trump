"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Song = (function () {
    function Song() {
    }
    Song.prototype.getAlbum = function () {
        return this.album;
    };
    Song.prototype.getTitle = function () {
        return this.title;
    };
    Song.prototype.getLengt = function () {
        return this.length;
    };
    Song.prototype.setAlbum = function (album) {
        this.album = album;
    };
    Song.prototype.setTitle = function (title) {
        this.title = title;
    };
    Song.prototype.setLength = function (length) {
        this.length = length;
    };
    return Song;
}());
exports.Song = Song;
//# sourceMappingURL=song.js.map
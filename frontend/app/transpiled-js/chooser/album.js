"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Album = (function () {
    function Album() {
    }
    Album.prototype.getArtist = function () {
        return this.artist;
    };
    Album.prototype.getTitle = function () {
        return this.title;
    };
    Album.prototype.getSongs = function () {
        return this.songs;
    };
    Album.prototype.setArtist = function (artist) {
        this.artist = artist;
    };
    Album.prototype.setTitle = function (title) {
        this.title = title;
    };
    Album.prototype.setSongs = function (songs) {
        this.songs = songs;
    };
    return Album;
}());
exports.Album = Album;
//# sourceMappingURL=album.js.map
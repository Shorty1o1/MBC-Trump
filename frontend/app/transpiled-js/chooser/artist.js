"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Artist = (function () {
    function Artist() {
    }
    Artist.prototype.getAlbums = function () {
        return this.albums;
    };
    Artist.prototype.getName = function () {
        return this.name;
    };
    Artist.prototype.setAlbums = function (albums) {
        this.albums = albums;
    };
    Artist.prototype.setName = function (name) {
        this.name = name;
    };
    return Artist;
}());
exports.Artist = Artist;
//# sourceMappingURL=artist.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpotifyCoverArtwork = (function () {
    function SpotifyCoverArtwork(http) {
        this.http = http;
        //this.getCoverLink("Linkin Park" , "RECHARGED");  // TODO, woanders
    }
    ;
    SpotifyCoverArtwork.prototype.getCoverLink = function (artistName, albumTitle) {
        var _this = this;
        this.http.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist').subscribe(function (res) {
            var foundArtists = res.json().artists.items || {};
            var artistID = "";
            for (var artistIndex = 0; artistIndex < foundArtists.length; artistIndex++) {
                if (foundArtists[artistIndex].name === artistName) {
                    artistID = foundArtists[artistIndex].id;
                }
            }
            if (artistID != "") {
                _this.getArtistsAlbums(artistID, albumTitle);
            }
            else {
                // Leeren string returnen wenn nicht gefunden
                if (_this.coverReceivedEventFunction) {
                    _this.coverReceivedEventFunction("");
                }
                console.log("Spotify kennt diesen Artist nicht");
            }
        });
    };
    SpotifyCoverArtwork.prototype.getArtistsAlbums = function (artistID, albumTitle) {
        var _this = this;
        this.http.get('https://api.spotify.com/v1/artists/' + artistID + '/albums').subscribe(function (res) {
            var foundAlbums = res.json().items || {};
            var albumCoverLink = "";
            for (var albumIndex = 0; albumIndex < foundAlbums.length; albumIndex++) {
                if (foundAlbums[albumIndex].name === albumTitle) {
                    albumCoverLink = foundAlbums[albumIndex].images[1].url;
                }
            }
            // Wenn artist nicht gefunden, dann ver
            if (albumCoverLink != "") {
                console.log("Spotify hat das Album-Cover gefunden: " + albumCoverLink);
                if (_this.coverReceivedEventFunction) {
                    _this.coverReceivedEventFunction(albumCoverLink);
                }
                else {
                    console.log("Could not execute callback-function because it is undefined");
                }
            }
            else {
                // Leeren string returnen wenn nicht gefunden
                if (_this.coverReceivedEventFunction) {
                    _this.coverReceivedEventFunction("");
                }
                console.log("Spotify hat das Album nicht gefunden");
            }
        });
    };
    // Todo. vll eine string-compare-methode, die case-insensitv ist und vll nur nach contains guckt, aber auch checkt, wenn EXAKT der selbe string
    SpotifyCoverArtwork.prototype.addCoverReceivedEventHandler = function (callback) {
        this.coverReceivedEventFunction = callback;
    };
    return SpotifyCoverArtwork;
}());
exports.SpotifyCoverArtwork = SpotifyCoverArtwork;
//# sourceMappingURL=SpotifyCoverArtwork.js.map
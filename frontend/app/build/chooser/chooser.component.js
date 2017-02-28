"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ChooserComponent = (function () {
    // Get JSON and set parents // TODO: maybe better method to do so
    function ChooserComponent(http) {
        var _this = this;
        this.http = http;
        // Filter muessen initialisiert werden, sonst ist liste am Anfang leer
        this.artistFilter = "";
        this.albumFilter = "";
        this.songFilter = "";
        this.newPlayList = [];
        this.http.get('app/chooser/artists.json').subscribe(function (res) {
            _this.artists = res.json();
            for (var artistI = 0; artistI < _this.artists.length; artistI++) {
                var curArtist = _this.artists[artistI];
                console.log(_this.artists[0].peter);
                for (var albumI = 0; albumI < curArtist.albums.length; albumI++) {
                    var curAlbum = curArtist.albums[albumI];
                    curAlbum.artist = curArtist;
                    for (var songI = 0; songI < curAlbum.songs.length; songI++) {
                        var curSong = curAlbum.songs[songI];
                        curSong.album = curAlbum;
                    }
                }
            }
        });
    }
    ;
    ChooserComponent.prototype.setArtist = function (artist) {
        console.log("SetArtist: " + artist.name);
        this.selectedArtist = artist;
        this.selectedAlbum = null; // Damit sich die Songliste leert (vom vorherigen Artist)
    };
    ChooserComponent.prototype.setAlbum = function (album) {
        console.log("SetAlbum: " + album.title);
        this.selectedAlbum = album;
    };
    ChooserComponent.prototype.removeSongFromPlaylist = function (song) {
        console.log("remove");
        for (var i = 0; i < this.newPlayList.length; i++) {
            console.log("i: " + i);
            if (this.newPlayList[i] == song) {
                this.newPlayList.splice(i, 1);
                break;
            }
        }
    };
    ChooserComponent.prototype.addSongToPlaylist = function (song) {
        // Todo:
        this.newPlayList[this.newPlayList.length] = song;
    };
    ChooserComponent.prototype.addAlbumToPlaylist = function (album) {
        for (var i = 0; i < album.songs.length; i++) {
            this.addSongToPlaylist(album.songs[i]);
        }
    };
    ChooserComponent.prototype.addArtistToPlaylist = function (artist) {
        console.log("Add artist" + artist.albums.length);
        for (var i = 0; i < artist.albums.length; i++) {
            this.addAlbumToPlaylist(artist.albums[i]);
        }
    };
    return ChooserComponent;
}());
ChooserComponent = __decorate([
    core_1.Component({
        selector: 'app-chooser',
        templateUrl: 'app/chooser/chooser.html',
        styleUrls: ['app/chooser/panelStyle.css']
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ChooserComponent);
exports.ChooserComponent = ChooserComponent;
;
//# sourceMappingURL=chooser.component.js.map
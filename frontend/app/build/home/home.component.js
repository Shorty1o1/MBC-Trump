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
var app_component_1 = require("../app.component");
var SpotifyCoverArtwork_1 = require("../player/SpotifyCoverArtwork");
var HomeComponent = (function () {
    function HomeComponent(http, app) {
        this.http = http;
        this.app = app;
        this.trumpCoverLink = "../trumpCover.png";
        this.albumCoverLink = this.trumpCoverLink;
        this.isPlaying = true;
        console.log("los gehts");
        this.coverGetter = new SpotifyCoverArtwork_1.SpotifyCoverArtwork(http);
        this.coverGetter.addCoverReceivedEventHandler(this.coverReveicedCallbackFunction());
        this.client = app.getClient();
        this.client.addChangeEventHandler(this.stateEventCallbackFunction());
    }
    ;
    HomeComponent.prototype.skip = function () {
        console.log("Skip");
        this.coverGetter.getCoverLink("Linkin Park", "RECHARGED"); // TODO: artist und desen album 
    };
    HomeComponent.prototype.pause = function () {
        console.log("pause");
        this.client.playPauseToggle();
    };
    HomeComponent.prototype.stateEventCallbackFunction = function () {
        return (function (state) {
            if (state === "play") {
                this.isPlaying = true;
                console.log("isplaying " + state);
            }
            else {
                this.isPlaying = false;
                console.log("isNotPlaying " + state);
            }
        }).bind(this);
    };
    HomeComponent.prototype.coverReveicedCallbackFunction = function () {
        console.log("WAS DA LOS!?");
        return (function (coverLink) {
            if (coverLink != "") {
                this.albumCoverLink = coverLink;
            }
            else {
                this.albumCoverLink = this.trumpCoverLink;
            }
        }).bind(this);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'app-home',
        templateUrl: 'app/home/home.html'
    }),
    __metadata("design:paramtypes", [http_1.Http, app_component_1.AppComponent])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map
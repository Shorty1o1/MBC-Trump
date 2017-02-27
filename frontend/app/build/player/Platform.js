"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Platform = (function () {
    function Platform() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("android") > -1 && ua.indexOf("mobile") > -1) {
            this.android = true;
            console.log("android");
        }
        else if (ua.indexOf("linux") > -1) {
            this.linux = true;
            console.log("linux");
        }
        else if (ua.indexOf("windows") > -1) {
            this.windows = true;
            console.log("windows");
        }
    }
    Platform.prototype.isAndroid = function () {
        return this.android;
    };
    Platform.prototype.isWindows = function () {
        return this.windows;
    };
    Platform.prototype.isLinux = function () {
        return this.linux;
    };
    return Platform;
}());
exports.Platform = Platform;
//# sourceMappingURL=Platform.js.map
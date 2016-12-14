var Platform = function() {
    var android = false;
    var windows = false;
    var linux = false;

    function init() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("android") > -1 && ua.indexOf("mobile") > -1) {
            android = true;
        } else if (ua.indexOf("linux") > -1) {
            linux = true;
        } else if (ua.indexOf("windows") > -1) {
            windows = true;
        }
    }
    init();

    this.isAndroid = function() {
        return true;
    }

    this.isWindows = function() {
        return windows;
    }

    this.isLinux = function() {
        return linux;
    }

}

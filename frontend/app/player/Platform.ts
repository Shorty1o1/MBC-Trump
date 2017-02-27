export class Platform {
    android : boolean; // = false;
    windows : boolean; // = false;
    linux : boolean; // = false;
    
    constructor() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("android") > -1 && ua.indexOf("mobile") > -1) {
            this.android = true;            
            console.log("android")
        } else if (ua.indexOf("linux") > -1) {
            this.linux = true;          
            console.log("linux")
        } else if (ua.indexOf("windows") > -1) {
            this.windows = true;
            console.log("windows")
        }
    }

    isAndroid() : boolean {
        return this.android;
    }

    isWindows() : boolean{
        return this.windows;
    }

    isLinux() : boolean {
        return this.linux;  
    }
}
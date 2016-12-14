var Player = function() {
    var audio;
    var button;
    this.createAudioElem = function() {
        audio = document.createElement('audio');
        log("Player", "'audio' element created");
    }

    this.start = function() {
        var startTime = audio.currentTime;
        audio.play();
        log("Player", "audio started at " + startTime);
    }

    this.setSource = function(source) {
        audio.setAttribute('src', source);
    }

    this.setTime = function(time) {
        var before = audio.currentTime;
        audio.currentTime = time;
        log("Player", "audio time from " + before + " is set to " + time);
    }

    this.createPlayButton = function() {
        button = document.createElement("button");
        var textNode = document.createTextNode("Play the Music");
        button.appendChild(textNode);
        document.body.appendChild(button);
        log("Player", "Button'created");
    }

    this.addCallbackForPlayback = function(callback) {
        if (button) {
            button.addEventListener('click', callback);
            log("Player", "callback added");
        } else {
            log("Player", "button not created");
        }

    }
}

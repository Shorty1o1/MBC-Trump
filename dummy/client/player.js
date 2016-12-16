var Player = function() {
    const PLAY = "play";
    const PAUSE = "pause";
    var audio;
    var playButton;
    var pauseButton;
    var state = PAUSE;
    this.createAudioElem = function() {
        audio = document.createElement('audio');
        log("Player", "'audio' element created");
    }

    this.getState = function() {
        return state;
    }

    this.start = function() {
        audio.play();
        state = PLAY;
        log("Player", "audio started at " + audio.currentTime);
    }

    this.setSource = function(source) {
        audio.setAttribute('src', source);
        log("Player", "source set to " + source);
    }

    this.setTime = function(time) {
        var before = audio.currentTime;
        audio.currentTime = time;
        log("Player", "audio time from " + before + " is set to " + time);
    }

    this.createPlayButton = function() {
        playButton = document.createElement("button");
        var textNode = document.createTextNode("Play the Music");
        playButton.appendChild(textNode);
        document.body.appendChild(playButton);
        log("Player", "play button'created");
    }

    this.createPauseButton = function() {
        pauseButton = document.createElement("button");
        var textNode = document.createTextNode("pause");
        pauseButton.appendChild(textNode);
        document.body.appendChild(pauseButton);
        log("Player", "pause button'created");
    }

    this.addCallbackForPause = function(callback) {
        pauseButton.addEventListener('click', callback);
    }

    this.addCallbackForPlayback = function(callback) {
        playButton.addEventListener('click', callback);
    }

    this.pause = function() {
        audio.pause();
        state = PAUSE;
        log("Player", "pause");
    }

    this.getCurrentTime = function() {

        // var time = audio.currentTime;
        // document.body.innerHTML += time + "\n";
        return audio.currentTime;
    }
}

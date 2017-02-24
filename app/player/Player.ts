const PLAY = "play";
const PAUSE = "pause";

export class Player {	
	audio;
    state = PAUSE;
    delay;
	
	createAudioElem() {
        this.audio = document.createElement('audio');
        console.log("Player audio element created");
    }
	
	start() {
        this.audio.play();
        this.state = PLAY;
        console.log("Player audio started at " + this.audio.currentTime);
    }
	
	setSource(source) {
        this.audio.setAttribute('src', source);
        console.log("Player source set to " + source);
    }
	
	setTime(time) {
        console.log("Setting time.." + time);
        var before = this.audio.currentTime;
        this.audio.currentTime = time;
        console.log("Player audio time from " + before + " is set to " + time);
    }
	
	pause() {
        this.audio.pause();
        this.state = PAUSE;
        console.log("Player pause");
    }
	
	getCurrentTime() {
		console.log("getCurrentTime: " + this.audio.currentTime)

        // var time = audio.currentTime;
        // document.body.innerHTML += time + "\n";
        return this.audio.currentTime;
    }

    mute() {
        this.audio.muted = true;
    }

    setDelay(delay) {
        this.delay = delay;
    }

}	
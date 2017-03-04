export class Player {

    public static PLAY: String = "play";
    public static PAUSE: String = "pause";

    private audio;
    private state = Player.PAUSE;
    private delay: number = 0;

    createAudioElem() {
        this.audio = document.createElement('audio');
        console.log("Player audio element created");
    }

    start() {
        this.audio.play();
        this.state = Player.PLAY;
        console.log("Player audio started at " + this.audio.currentTime);
    }

    setSource(source) {
        this.audio.setAttribute('src', source);
        console.log("Player source set to " + source);
    }

    setTime(time) {
        console.log("Setting time.." + time);
        var before = this.audio.currentTime;
        this.audio.currentTime = time + this.delay;
        console.log("Player audio time from " + before + " is set to " + time);
    }

    pause(): void {
        this.audio.pause();
        this.state = Player.PAUSE;
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

    unmute() {
        this.audio.muted = false;
    }

    setDelay(delay) {
        this.delay = delay;
    }

    stop() {
        this.audio.stop;
    }

    getState(): String {
        return this.state;
    }

}   
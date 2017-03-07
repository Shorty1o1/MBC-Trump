export class Player {

    public static PLAY: string = "play";
    public static PAUSE: string = "pause";

    private audio;
    private state = Player.PAUSE;
    private delay: number = 0;

    createAudioElem() {
        this.audio = document.createElement('audio');
    }

    start() {
        this.audio.play();
        this.state = Player.PLAY;
    }

    setSource(source) {
        this.audio.setAttribute('src', source);
    }

    setTime(time) {
        var before = this.audio.currentTime;
        this.audio.currentTime = time + this.delay;
    }

    pause(): void {
        this.audio.pause();
        this.state = Player.PAUSE;
    }

    getCurrentTime() {
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

    isMuted(): Boolean {
        return this.audio.muted === true;
    }

}   
import {WSocket} from "./WSocket";
import {MessageFactory} from "./MessageFactory";
import {Player} from "./Player";
import {MessageHandler} from "./messageHandler";


export class Client {
    private wsocket: WSocket;
    private player: Player;
    private messageHandler: MessageHandler;
    private rtt: number = 0;
    private rttSum: number = 0;
    private rttCounter: number = 0;
    private stateChangedEventFunction: Function;
    private timeAtStartPlayerDelay: number = 0;
    private serverAddress: string;

    constructor() {
        this.wsocket = new WSocket(window.location.port);

        this.messageHandler = new MessageHandler(this.wsocket);

        this.messageHandler.addHandler("rtt", this.handleRTTMessage);
        this.messageHandler.addHandler("play", this.handlePlay);
        this.messageHandler.addHandler("pause", this.handlePause);

        this.player = new Player();

        this.player.createAudioElem();

        this.serverAddress = "http://" + window.location.hostname + ":" + window.location.port;

        this.wsocket.addConnectionOpenCallback((event) => {
            this.initRttAndDelay();
        });
    }

    sendRTT() {
        var rttMessage = MessageFactory.createRTTMessage();
        this.wsocket.send(rttMessage);
    }

    sendSONG_REQUEST() {
        var songRequestMessage = MessageFactory.createSongRequestMessage();
        this.wsocket.send(songRequestMessage);
    }

    initRttAndDelay() {
        this.sendRTT();
    }

    handleRTTMessage = (messageObj) => {
        var sentTime = messageObj.sentTime;
        var receivedTime = Date.now();
        this.rttSum += ((receivedTime - sentTime) / 2);
        this.rttCounter++;
        this.rtt = this.rttSum / this.rttCounter;
        if (this.rttCounter < 10) {
            this.sendRTT();
        } else {
            this.sendSONG_REQUEST();
        }
    }

    handlePlay = (messageObj) => {
        this.initAudio(messageObj.source, messageObj.time);
    }

    handlePause = (messageObj) => {
        this.player.pause();
        this.player.setSource(messageObj.source);
    }

    public toggleMute(): void {
        if (this.player.isMuted()) {
            this.player.unmute();
        } else {
            this.player.mute()
        }
    }

    public mute(): void {
        this.player.mute();
    }

    public unmute():void{
        this.player.unmute();
    }


    public isPlaying(): Boolean {
        return this.player.getState() === Player.PLAY;
    }

    public pause(): void {
        this.player.pause();
    }

//	  (   )
//	  (   ) (
//	   ) _   )
//	    ( \_
//	  _(_\ \)__
//	 (____\___)) 


    initAudio(src, time) {
        this.player.setSource(this.serverAddress + src);

        this.player.setTime(time + (this.rtt / 1000));

        window.setTimeout(() => {
            this.player.start();
        }, 1000);


    }

    addChangeEventHandler(callback: Function) {
        this.stateChangedEventFunction = callback;
    }
}
;
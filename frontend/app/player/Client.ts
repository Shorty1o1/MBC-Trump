import {WSocket} from "./WSocket";
import {MessageFactory} from "./MessageFactory";
import {Player} from "./Player";
// client class doing some stuff
import {MessageHandler} from "./messageHandler";


export class Client {
    private wsocket: WSocket;
    private messageFactory: MessageFactory;
    private player: Player;
    private messageHandler: MessageHandler;
    private rtt: number = 0;
    private rttSum: number = 0;
    private rttCounter: number = 0;
    private stateChangedEventFunction: Function;
    private firstTimeTemp: number = 0;
    private timeAtStartPlayerDelay: number = 0;
    private serverAddress: string;

    constructor() {
        this.messageFactory = new MessageFactory();
        this.wsocket = new WSocket(window.location.port); // TODO -> sp�ter zu player

        this.messageHandler = new MessageHandler(this.wsocket, this.messageFactory);

        this.messageHandler.addHandler("rtt", this.handleRTTMessage);
        this.messageHandler.addHandler("player_delay", this.handlePlayerDelayMessage);
        this.messageHandler.addHandler("play", this.handlePlay);
        this.messageHandler.addHandler("pause", this.handlePause);

        console.log("Client callback for receiving messages added");
        this.player = new Player();

        this.player.createAudioElem();
        console.log("Client Audio element created");

        this.serverAddress = "http://" + window.location.hostname + ":" + window.location.port;

        this.wsocket.addConnectionOpenCallback((event) => {
            console.log("Client Connection to server established");
            this.initRttAndDelay();
        });
    }

    sendRTT() {
        var rttMessage = this.messageFactory.createRTTMessage();
        this.wsocket.send(rttMessage);
    }

    sendPLAYER_DELAY() {
        var playerDelayMessage = this.messageFactory.createPlayerDelayMessage();
        this.wsocket.send(playerDelayMessage);
    }

    sendSONG_REQUEST() {
        var songRequestMessage = this.messageFactory.createSongRequestMessage();
        this.wsocket.send(songRequestMessage);
    }

    initRttAndDelay() {
        this.sendRTT();
        //this.sendPLAYER_DELAY();
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

        console.log(this.rtt);
    }

    handlePlayerDelayMessage = (messageObj) => {
        console.log("received PlayerDelayMessage");
        this.initTestAudio(messageObj.source);
    }

    handlePlay = (messageObj) => {
        this.firstTimeTemp = Date.now();
        console.log("received SongRequestMessage");
        this.initAudio(messageObj.source, messageObj.time);
    }

    handlePause = (messageObj) => {
        this.player.pause();
    }


    playPauseToggle() {
        if (this.player.getState() === Player.PAUSE) {
            this.player.start();
        } else {
            this.player.pause();
        }
        this.stateChangedEventFunction(this.player.getState());
    }

    initTestAudio(src) {

        this.player.setSource(this.serverAddress + src);
        console.log("Client source is set");

        this.player.mute();
        this.player.start();
        this.timeAtStartPlayerDelay = Date.now();


        window.setTimeout(() => {
            var delay: number = ((Date.now() - this.timeAtStartPlayerDelay) / 1000) - (this.player.getCurrentTime());
            this.player.setDelay(delay);
            this.player.pause();
            this.player.unmute();
            this.sendSONG_REQUEST();
            console.log(delay);
        }, 1000);

    }

//	  (   )
//	  (   ) (
//	   ) _   )
//	    ( \_
//	  _(_\ \)__
//	 (____\___)) 


    initAudio(src, time) {
        this.player.setSource(this.serverAddress + src);
        console.log("Client source is set");

        this.player.setTime(time + (this.rtt / 1000));
        console.log("Client time is set");

        window.setTimeout(() => {
            this.player.start();
            console.log(Date.now() - this.firstTimeTemp);
        }, 1000);


    }

    addChangeEventHandler(callback: Function) {
        this.stateChangedEventFunction = callback;
    }
}
;
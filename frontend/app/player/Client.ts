import { WSocket } from './WSocket';
import { MessageFactory, RTT, PLAYER_DELAY, SONG_REQUEST, IP_RECEIVED} from './MessageFactory';
import { Player } from './Player';



// client class doing some stuff

import {first} from "rxjs/operator/first";
import { MessageHandler } from './messageHandler'




export class Client{    
    private wsocket : WSocket;
    private messageFactory : MessageFactory;
    private player : Player;
    private messageHandler : MessageHandler;
    private rtt : number = 0;
    private rttSum : number = 0;
    private rttCounter : number = 0;
    private stateChangedEventFunction:Function;
    private firstTimeTemp : number = 0;
    private timeAtStartPlayerDelay : number = 0;
    
    constructor(){ 
        this.messageFactory = new MessageFactory();
        this.wsocket = new WSocket(); // TODO -> sp�ter zu player

        this.messageHandler = new MessageHandler(this.wsocket, this.messageFactory);

        this.messageHandler.addHandler("rtt", this.handleRTTMessage);
        this.messageHandler.addHandler("player_delay", this.handlePlayerDelayMessage);
        this.messageHandler.addHandler("song_request", this.handleSongRequestMessage);
        this.messageHandler.addHandler("ip_message", this.handleIpReceived);

        console.log("Client callback for receiving messages added");
        this.player = new Player();

        this.player.createAudioElem();
        console.log("Client Audio element created");
        
        this.wsocket.addConnectionOpenCallback((event) => {
            console.log("Client Connection to server established");

            var ipAddr = window.location.hostname;

            this.sendIpAddr(ipAddr);
        });
    }
    
    sendRTT() {
        var rttMessage = this.messageFactory.createRTTMessage();
        this.wsocket.send(rttMessage);
    }
    
    sendPLAYER_DELAY(){
        var playerDelayMessage = this.messageFactory.createPlayerDelayMessage();
        this.wsocket.send(playerDelayMessage);
    }
    
    sendSONG_REQUEST(){
        var songRequestMessage = this.messageFactory.createSongRequestMessage();
        this.wsocket.send(songRequestMessage);
    }

    sendIpAddr(ipAddr:String){
        var ipMessage = this.messageFactory.createIpMessagge(ipAddr);
        this.wsocket.send(ipMessage);
    }

    initRttAndDelay(){
        for(var i = 0; i < 10; i++) {
            this.sendRTT();
        }

        this.sendPLAYER_DELAY();
    }

    handleIpReceived = (messageObj) => {
        console.log("ip has been set");
        this.initRttAndDelay();
    }
    
    handleRTTMessage = (messageObj) =>  {
        var sentTime = messageObj.sentTime;
        var receivedTime = Date.now();
        this.rttSum += ((receivedTime - sentTime) / 2);
        this.rttCounter++;
        this.rtt = this.rttSum / this.rttCounter;
        console.log(this.rtt);
    }
    
    handlePlayerDelayMessage = (messageObj) => {
        console.log("received PlayerDelayMessage");
        this.initTestAudio(messageObj.source);
    }
    
    handleSongRequestMessage = (messageObj) => {
        this.firstTimeTemp = Date.now();
        console.log("received SongRequestMessage");
        this.initAudio(messageObj.source, messageObj.time);
    }

    playPauseToggle(){
        if(this.player.getState()===Player.PAUSE){
            this.player.start();
        } else {
            this.player.pause();
        }
        this.stateChangedEventFunction(this.player.getState());
    }
    
    initTestAudio(src) {

        this.player.setSource(src);
        console.log("Client source is set");

        this.player.mute();
        this.player.start();
        this.timeAtStartPlayerDelay = Date.now();

    
        window.setTimeout(() =>{
            var delay : number = ((Date.now() - this.timeAtStartPlayerDelay)/1000) - (this.player.getCurrentTime());
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
        this.player.setSource(src);
        console.log("Client source is set");

        this.player.setTime(time + (this.rtt/1000));
        console.log("Client time is set");

        this.player.start();
        console.log(Date.now() - this.firstTimeTemp);

    }

    addChangeEventHandler(callback:Function){
        this.stateChangedEventFunction = callback;
    }
};
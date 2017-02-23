import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'app-home',	
    templateUrl: 'app/home/home.html'
})
export class HomeComponent {

	pf = new Platform();
	private client : Client;
	
	spotifyImageJson;
	
	constructor(private http:Http){
		console.log("los gehts")
		//this.spotifyImageJson = "asd"
		//this.http.get('https:// api.spotify.com/v1/search?q=tania%20bowra&type=artist').subscribe(res => console.log("fertig: " +   res.json().data || { }));  
		//console.log("Hi: " + this.spotifyImageJson.data)
		this.client = new Client();

	};

	skip() {
		console.log("Skip")
		//console.log(this.spotifyImageJson.length)
	}
	
	pause(){
		console.log("pause");
	}	
}


const PLAY = "play";
const PAUSE = "pause";

class Player {	
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
        console.log("Player audio time from " + before + " is set to " + this.time);
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
	
	
const SONG_REQUEST = "song_request";
const RTT = "rtt";
const PLAYER_DELAY = "player_delay";


class Client{	
	private wsocket : WSocket;
	private messageFactory : MessageFactory;
	private player : Player;
	rtt;
    rttSum ;
    rttCounter;
	
	constructor(){ 
		;
		this.messageFactory = new MessageFactory();
		this.wsocket = new WSocket(); // TODO -> später zu player
		this.wsocket.addReceiveCallback((message) => {
            this.handleMessages(message);
        });
		
		console.log("Client callback for receiving messages added");
		this.player = new Player();
		
		this.wsocket.addConnectionOpenCallback((event) => {
            console.log("Client Connection to server established");
            for(var i = 0; i < 10; i++) {
				console.log("rtt" );
            	this.sendRTT();
            }

			this.sendPLAYER_DELAY();            
        });
	}
	
	sendRTT() {
		console.log("1");
        var rttMessage = this.messageFactory.createRTTMessage();
		console.log("2");
        this.wsocket.send(rttMessage);
		console.log("3");
    }
	
	sendPLAYER_DELAY(){
    	var playerDelayMessage = this.messageFactory.createPlayerDelayMessage();
    	this.wsocket.send(playerDelayMessage);
    }
	
	sendSONG_REQUEST(){
    	var songRequestMessage = this.messageFactory.createSongRequestMessage();
    	this.wsocket.send(songRequestMessage);
    }
	
	handleMessages(message) {
        if (message.data) {
			if(message.data == "wrong message") {
				
			}
            console.log("Client Got message " + message.data);
            try {
                var messageObj = this.messageFactory.getMessage(message.data);
                switch (messageObj.type) {
                    case RTT:
                        this.handleRTTMessage(messageObj);
                        break;
                    case PLAYER_DELAY:
                    	this.handlePlayerDelayMessage(messageObj);
                    	break;
                    case SONG_REQUEST:
                    	this.handleSongRequestMessage(messageObj);
                    	break;
                    default:
                        console.log("Client Message type not supported");
                }
            } catch (err) {
                console.log( "ERROR: " + err);
            }
        } else {
            console.log("Client No data in this message available");
        }
    }
	
	handleRTTMessage(messageObj) {
        var sentTime = messageObj.sentTime;
        var receivedTime = Date.now();
        this.rttSum += ((receivedTime - sentTime) / 2);
        this.rttCounter++;
        this.rtt = this.rttSum / this.rttCounter;
    }
	
	handlePlayerDelayMessage(messageObj) {
    	console.log("received PlayerDelayMessage");
    	this.initTestAudio(messageObj.source);
    }
	
	handleSongRequestMessage(messageObj) {
    	console.log("received SongRequestMessage");
    	this.initAudio(messageObj.source, messageObj.time);
    }
	
	initTestAudio(src) {
        this.player.createAudioElem();
        console.log("Client Audio element created");

        this.player.setSource(src);
        console.log("Client source is set");

        this.player.mute();
        this.player.start();
	
        window.setTimeout(() =>{
        	var delay = (1000) - (this.player.getCurrentTime());
        	this.player.setDelay(delay);
        	this.sendSONG_REQUEST();
        	alert(delay);
        }, 1000);
    }
	
	initAudio(src, time) {
        this.player.createAudioElem();
        console.log("Client Audio element created");

        this.player.setSource(src);
        console.log("Client source is set");

        this.player.setTime(time);
        console.log("Client time is set");

        this.player.start();
    }
	
};

class Platform {
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
			console.log("win")
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


class WSocket {
	connection : WebSocket;
	
	constructor(){
		this.connection = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port, 'echo-protocol');
		console.log("test", "Created Websocket");
	
	
		this.connection.onmessage = function(message) {
			console.log("WSocket", "Got a message from server");
			console.log("WSocket", message);
		}

		this.connection.onopen = function(message) {
			console.log("WSocket", "Websocket to server is established");
		}
	}
	
	addConnectionOpenCallback = function(callback) {
        this.connection.onopen = function(event) {
            callback(event);
        }
        console.log("WSocket Connection open callback added");
    }
	
	send(message) {
        console.log("WSocket sending message: " + message);
        this.connection.send(message);
    }

    addReceiveCallback = function(callback) {
        this.connection.onmessage = function(message) {
            callback(message);
        }
        console.log("WSocket ReceiveCallback added");
    }
}

class MessageFactory {
    getMessage(message) {
        return JSON.parse(message);
    }

    createRTTMessage() {
        var json = <any>{};
        json.type = RTT;
        json.sentTime = Date.now();
        //OF maybe add some other fields here;
        return JSON.stringify(json);
    }

    createPlayerDelayMessage() {
        var json = <any>{};
        json.type = PLAYER_DELAY;
        return JSON.stringify(json);
    }

    createSongRequestMessage() {
        var json = <any>{};
        json.type = SONG_REQUEST;
        return JSON.stringify(json);
    }
}

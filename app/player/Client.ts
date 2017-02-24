import { WSocket } from './WSocket';
import { MessageFactory, RTT, PLAYER_DELAY, SONG_REQUEST, IP_RECEIVED} from './MessageFactory';
import { Player } from './Player';



export class Client{	
	private wsocket : WSocket;
	private messageFactory : MessageFactory;
	private player : Player;
	private rtt : number = 0;
    private rttSum : number = 0;
    private rttCounter : number = 0;
	
	constructor(){ 
		this.messageFactory = new MessageFactory();
		this.wsocket = new WSocket(); // TODO -> sp�ter zu player
		this.wsocket.addReceiveCallback((message) => {
            this.handleMessages(message);
        });
		
		console.log("Client callback for receiving messages added");
		this.player = new Player();
		
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
                    case IP_RECEIVED:
                        this.handleIpReceived(messageObj);
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

    initRttAndDelay(){
        for(var i = 0; i < 10; i++) {
            this.sendRTT();
        }

        this.sendPLAYER_DELAY();
    }

    handleIpReceived(messageObj){
        console.log("ip has been set");
        this.initRttAndDelay();
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

    playPauseToggle(){
        if(this.player.getState()===Player.PAUSE){
            this.player.start();
        } else {
            this.player.pause();
        }
    }
	
	initTestAudio(src) {
        this.player.createAudioElem();
        console.log("Client Audio element created");

        this.player.setSource(src);
        console.log("Client source is set");

        this.player.mute();
        this.player.start();
	
        window.setTimeout(() =>{
        	var delay : number = (1000) - (this.player.getCurrentTime());
        	this.player.setDelay(delay);
            this.player.pause();
        	this.sendSONG_REQUEST();
        	alert(delay);
        }, 1000);
    }
	
	initAudio(src, time) {
        this.player.setSource(src);
        console.log("Client source is set");

        this.player.setTime(time + this.rtt);
        console.log("Client time is set");

        window.setTimeout(() =>{
            this.player.start();
            this.player.unmute();
        }, 1000);

    }	
};
import {MessageFactory} from './MessageFactory';
import {WSocket} from './WSocket';


export class Master{
	messageFactory : MessageFactory;
	wSocket : WSocket;

	constructor(){
		this.messageFactory = new MessageFactory();
		this.wSocket = new WSocket("8081");
	}
	
	pause(){
		this.wSocket.send(this.messageFactory.createPauseMessage());
	}

	play(){
		this.wSocket.send(this.messageFactory.createPlayMessage());
	}

	skip(){
		this.wSocket.send(this.messageFactory.createSkipMessage());
	}

	back(){
		this.wSocket.send(this.messageFactory.createBackMessage());
	}
}
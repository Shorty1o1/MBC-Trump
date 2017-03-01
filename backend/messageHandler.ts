import { WSocketServer } from './wSocketServer';
import { MessageFactory } from './messageFactory';
import { Server } from './server';

export class MessageHandler{
	private handler : {[key : string] : Function[]} = {};
    private messageFactory : MessageFactory;

    constructor(socket : WSocketServer, messageFactory : MessageFactory){
        this.messageFactory = messageFactory;
        socket.addTextMessageHandler((message) => {
            this.handleMessages(message);
        });
    }

    handleMessages(message) {
        if (message.utf8Data) {
            Server.log("Client Got message " + message.utf8Data);
            try {
                var messageObj = this.messageFactory.getMessage(message.utf8Data);
                for(let handler of this.handler[messageObj.type]){
                    handler(messageObj);
                }
            } catch (err) {
                Server.log( "ERROR: " + err);
            }
        } else {
            Server.log("Client No data in this message available");
            Server.log(message);
        }
    }

    addHandler(messageType : string, handler : Function){
        if(this.handler[messageType] === undefined)
        {
            this.handler[messageType] = [];
        }
        this.handler[messageType].push(handler);
    }
}
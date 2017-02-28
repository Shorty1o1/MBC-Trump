import { WSocket } from './WSocket';
import { MessageFactory } from './MessageFactory';

export class MessageHandler{

    private handler : {[key : string] : Function[]} = {};
    private messageFactory : MessageFactory;

    constructor(socket : WSocket, messageFactory : MessageFactory){
        this.messageFactory = messageFactory;
        socket.addReceiveCallback((message) => {
            this.handleMessages(message);
        });
    }
    
    handleMessages(message) {
        if (message.data) {
            if(message.data == "wrong message") {
                
            }
            console.log("Client Got message " + message.data);
            try {
                var messageObj = this.messageFactory.getMessage(message.data);
                for(let handler of this.handler[messageObj.type]){
                    handler(messageObj);
                }
            } catch (err) {
                console.log( "ERROR: " + err);
            }
        } else {
            console.log("Client No data in this message available");
        }
    }

    addHandler(messageType : string, handler : Function){
        if(this.handler[messageType] === undefined)
        {
            this.handler[messageType] = [];
        }
        this.handler[messageType].push(handler);
    }

    initRttAndDelay()
    {
        console.log("geht nicht");
    }
}
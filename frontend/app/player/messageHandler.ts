import {WSocket} from "./WSocket";
import {MessageFactory} from "./MessageFactory";

export class MessageHandler {

    private handler: {[key: string]: Function[]} = {};

    constructor(socket: WSocket) {
        socket.addReceiveCallback((message) => {
            this.handleMessages(message);
        });
    }

    handleMessages(message) {
        if (message.data) {
            try {
                var messageObj = MessageFactory.getMessage(message.data);
                for (let handler of this.handler[messageObj.type]) {
                    handler(messageObj);
                }
            } catch (err) {
                //console.log("ERROR: " + err);
            }
        }
    }

    addHandler(messageType: string, handler: Function) {
        if (this.handler[messageType] === undefined) {
            this.handler[messageType] = [];
        }
        this.handler[messageType].push(handler);
    }
}
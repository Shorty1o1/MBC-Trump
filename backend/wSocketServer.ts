
export class WSocketServer{
    callbackFunction : Function;
    connections = [];
    constructor(httpServer){
        var WebSocketServer = require('websocket').server;
        var server = new WebSocketServer({
            httpServer : httpServer,
            autoAcceptConnections : false
        });
        server.on('request', this.handleRequest);
    }


    handleRequest = (request) => {
        var connection = request.accept('echo-protocol', request.origin);
        this.connections.push(connection);
        connection.on('message',(messageObj) => {
            this.callbackFunction(messageObj, connection);
        });

        connection.on('close', () => {
            var index = this.connections.indexOf(connection);
            this.connections.splice(index, 1);
        })
    }

    addTextMessageHandler(handler : Function){
    	this.callbackFunction = handler;
    }

    sendToAll(str : string){
        if(this.connections)
        {
            for(let connection of this.connections)
            {
                connection.send(str);
            }    
        }
    } 
}

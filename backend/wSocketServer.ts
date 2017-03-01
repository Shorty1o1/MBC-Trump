
export class WSocketServer{
    callbackFunction : Function;
    connection;
    constructor(httpServer){
        var WebSocketServer = require('websocket').server;
        var server = new WebSocketServer({
            httpServer : httpServer,
            autoAcceptConnections : false
        });
        server.on('request', this.handleRequest);
    }


    handleRequest = (request) => {
        this.connection = request.accept('echo-protocol', request.origin);
        this.connection.on('message',this.callbackFunction);
    }

    addTextMessageHandler(handler : Function){
    	this.callbackFunction = handler;
    }

    send(obj)
    {
    	this.connection.send(JSON.stringify(obj));
    }    
}

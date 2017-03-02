
export class WSocketServer{
    callbackFunction : Function;
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
        connection.on('message',(messageObj) => {
            this.callbackFunction(messageObj, connection);
        });
    }

    addTextMessageHandler(handler : Function){
    	this.callbackFunction = handler;
    }  
}

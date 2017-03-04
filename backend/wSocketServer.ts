
export class WSocketServer{
    callbackFunction : Function;
    connections = [];
    numberOfConnections : number = 0;
    constructor(httpServer, numberOfConnections : number){
        var WebSocketServer = require('websocket').server;
        this.numberOfConnections = numberOfConnections;
        var server = new WebSocketServer({
            httpServer : httpServer,
            autoAcceptConnections : false
        });
        server.on('request', this.handleRequest);
    }


    handleRequest = (request) => {

        if(this.numberOfConnections == 0){
            var connection = request.accept('echo-protocol', request.origin);
            this.connections.push(connection);

            connection.on('message',(messageObj) => {
                this.callbackFunction(messageObj, connection);
            });

            connection.on('close', () => {
                var index = this.connections.indexOf(connection);
                this.connections.splice(index, 1);
            })
        }else if(this.numberOfConnections == 1){
            if(this.connections.length == 1 ){
                var connection = request.reject();
            }else{
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
        }

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

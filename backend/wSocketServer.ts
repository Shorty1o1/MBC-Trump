
export class WSocketServer{
    callbackFunction : Function;
    connections = [];
    isMaster : number = 0;
    constructor(httpServer, isMaster : number){
        var WebSocketServer = require('websocket').server;
        this.isMaster = isMaster;
        var server = new WebSocketServer({
            httpServer : httpServer,
            autoAcceptConnections : false
        });
        server.on('request', this.handleRequest);
    }


    handleRequest = (request) => {

        if(this.isMaster == 0){
            var connection = request.accept('echo-protocol', request.origin);
            this.connections.push(connection);

            connection.on('message',(messageObj) => {
                this.callbackFunction(messageObj, connection);
            });

            connection.on('close', () => {
                var index = this.connections.indexOf(connection);
                this.connections.splice(index, 1);
            })
        }else if(this.isMaster == 1){
            if(this.connections.length == 1 ){
                var connection = request.reject();
                console.log("Master request has been denied!!!!!!");
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

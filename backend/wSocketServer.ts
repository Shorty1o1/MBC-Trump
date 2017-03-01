
export class WSocketServer{
    server;
    constructor(){
        var ws = require('nodejs-websocket');
        this.server = ws.createServer(function(conn){
            console.log("What is happening");
            conn.on("text", function(str){

            })
        });

    }

    
}

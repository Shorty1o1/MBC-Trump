export class WSocket {
    connection : WebSocket;
    
    constructor(port:string){
        this.connection = new WebSocket("ws://" + window.location.hostname + ":" + port, 'echo-protocol');          
    }
    
    addConnectionOpenCallback = function(callback) {
        this.connection.onopen = function(event) {
            callback(event);
        }
    }
    
    send(message) {
        this.connection.send(message);
    }

    addReceiveCallback = function(callback) {
        this.connection.onmessage = function(message) {
            callback(message);
        }
    }
}

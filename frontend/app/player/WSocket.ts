export class WSocket {
	connection : WebSocket;
	
	constructor(){
		this.connection = new WebSocket("ws://" + window.location.hostname + ":" + window.location.port, 'echo-protocol');
		console.log("Created Websocket");
	
	
		this.connection.onmessage = function(message) {
			console.log("WSocket got a message from server");
			console.log("WSocket" + message);
		}

		this.connection.onopen = function(message) {
			console.log("Websocket to server is established");
		}
	}
	
	addConnectionOpenCallback = function(callback) {
        this.connection.onopen = function(event) {
            callback(event);
        }
        console.log("WSocket Connection open callback added");
    }
	
	send(message) {
        console.log("WSocket sending message: " + message);
        this.connection.send(message);
    }

    addReceiveCallback = function(callback) {
        this.connection.onmessage = function(message) {
            callback(message);
        }
        console.log("WSocket ReceiveCallback added");
    }
}

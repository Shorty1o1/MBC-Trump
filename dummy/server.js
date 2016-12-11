var http = require('http');
var debug = true;

var os = require('os');
var ifaces = os.networkInterfaces();
log(ifaces.eth0[0].address);
var ip = ifaces.eth0[0].address;
var port=8080;
var httpAddr = "http://"+ip+":"+port;


var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./");

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});

server.listen(port);

var timeInMs = Date.now();

var WebSocketServer = require('websocket').server;

wsServer = new WebSocketServer({httpServer: server, autoAcceptConnections: false});

function originIsAllowed(origin){
	return true;
}

wsServer.on('request', function(request){
	var con = request.accept('echo-protocol',request.origin);
	log("connection accepted");
	con.on('message',function(message){
		log(message);
		if(message.utf8Data === "init"){
			var passed = (Date.now() - timeInMs) / 1000;
			log("got init");
			var json = {};
			json.source = httpAddr + "/dusche.mp3";
			json.time = passed + (24/1000);
			json.type="init";
			con.send(JSON.stringify(json));
		} else if(message.utf8Data === "sync"){
			//sync
			log("sync");
			var json = {};
			json.source = httpAddr +"/dusche.mp3";
			var passed = (Date.now() - timeInMs) / 1000;
			json.time = passed + (24 / 1000);
			json.type="sync";
			con.send(JSON.stringify(json));
		} else {
			log("got error");
			con.send("wrong message");
		}
	});
});

function log(message){
	if(debug){
		console.log(message);
	}
}

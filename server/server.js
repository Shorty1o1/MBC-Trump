var http = require('http');
var debug = true;

var os = require('os');
var ifaces = os.networkInterfaces();
var ip = "141.22.79.202";

log("Servers ip :: " + ip);
var port = 8080;
var httpAddr = "http://" + ip + ":" + port;


var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic(__dirname + "/../");
var serveMp3 = serveStatic("./");


var server = http.createServer(function(req, res) {
    var done = finalhandler(req, res);
    if (req.url.indexOf("dusche") > -1) {
        serveMp3(req, res, done);
    } else {
        serve(req, res, done);
    }
});

server.listen(port);

var timeInMs = Date.now();

var WebSocketServer = require('websocket').server;

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    return true;
}

wsServer.on('request', function(request) {
    var con = request.accept('echo-protocol', request.origin);
    log("connection accepted");
    con.on('message', function(message) {
        log(message);
        messageObj = JSON.parse(message.utf8Data);
        if (messageObj.type == "song_request") {
            var passed = (Date.now() - timeInMs) / 1000;
            log("song_request");
            var json = {};
            json.source = httpAddr + "/dusche.mp3";
            json.time = passed;
            json.type = "song_request";
            con.send(JSON.stringify(json));
        } else if (messageObj.type == "player_delay") {
            log("player_delay");
            var json = {};
            json.source = httpAddr + "/dusche.mp3";
            json.type = "player_delay";
            con.send(JSON.stringify(json));
        } else if (messageObj.type == "rtt") {           
            log("rtt");
            var json = message.utf8Data;
            con.send(json);
        } else {
            log("got error");
            con.send("wrong message");
        }
    });
});

function log(message) {
    if (debug) {
        console.log(message);
    }
}

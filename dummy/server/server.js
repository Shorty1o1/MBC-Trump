var http = require('http');
var debug = true;

var os = require('os');
var ifaces = os.networkInterfaces();
var ip;
if (ifaces.wlan0 && ifaces.wlan0[0]) {
    ip = ifaces.wlan0[0].address;
}

if (ifaces.eth0 && ifaces.eth0[0]) {
    ip = ifaces.eth0[0].address;
}


log("Servers ip :: " + ip);
var port = 8080;
var httpAddr = "http://" + ip + ":" + port;


var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("../client/");
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
        if (message.utf8Data === "{\"type\":\"init\"}") {
            var passed = (Date.now() - timeInMs) / 1000;
            log("got init");
            var json = {};
            json.source = httpAddr + "/dusche.mp3";
            json.time = passed + (24 / 1000);
            json.type = "init";
            con.send(JSON.stringify(json));
        } else if (message.utf8Data === "{\"type\":\"sync\"}") {
            //sync
            log("sync");
            var json = {};
            json.source = httpAddr + "/dusche.mp3";
            var passed = (Date.now() - timeInMs) / 1000;
            json.time = passed + (24 / 1000);
            json.type = "sync";
            con.send(JSON.stringify(json));
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

var http = require('http');
var debug = true;

var os = require('os');
var ip = "";

log("Servers ip :: " + ip);
var port = 8080;

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic(__dirname + "/../../frontend/");
var serveMp3 = serveStatic(__dirname);
var serveModules = serveStatic(__dirname + "/../../");


//OF TODO refactor content delievery
var server = http.createServer(function (req, res) {
    var done = finalhandler(req, res);
    if (req.url.indexOf(".mp3") > -1) {
        serveMp3(req, res, done);
    } else if (req.url.indexOf("node_modules") > -1) {
        serveModules(req, res, done);
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

const SONG_REQUEST = "song_request";
const RTT = "rtt";
const PLAYER_DELAY = "player_delay";
const IP_RECEIVED = "ip_message";

var currSong = "/dusche.mp3";
wsServer.on('request', function (request) {
    var con = request.accept('echo-protocol', request.origin);
    log("connection accepted");
    con.on('message', function (message) {
        log(message);
        messageObj = JSON.parse(message.utf8Data);
        switch (messageObj.type) {
            case SONG_REQUEST:
                var passed = (Date.now() - timeInMs) / 1000;
                log(SONG_REQUEST);
                var json = {};
                json.source = getHttpAddr() + currSong;
                json.time = passed;
                json.type = SONG_REQUEST;
                con.send(JSON.stringify(json));
                break;
            case PLAYER_DELAY:
                log(PLAYER_DELAY);
                var json = {};
                json.source = getHttpAddr() + currSong;
                json.type = PLAYER_DELAY;
                con.send(JSON.stringify(json));
                break;
            case RTT:
                log(RTT);
                var json = message.utf8Data;
                con.send(json);
                break;
            case IP_RECEIVED:
                ip = messageObj.ip;
                var json = {};
                json.type = IP_RECEIVED;
                con.send(JSON.stringify(json));
                break;
            default:
                log("got error: " + message.type);
                con.send("wrong message");
                break;
        }
    });
});

function log(message) {
    if (debug) {
        console.log(message);
    }
}

function getHttpAddr() {
    var httpAddr = "http://" + ip + ":" + port;
    return httpAddr;
}

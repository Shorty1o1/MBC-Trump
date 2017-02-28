"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var finalhandler = require("finalhandler");
var serveStatic = require("serve-static");
var SONG_REQUEST = "song_request";
var RTT = "rtt";
var PLAYER_DELAY = "player_delay";
var IP_RECEIVED = "ip_message";
var Server = (function () {
    function Server() {
        this.debug = true;
        this.ip = "";
        this.port = 8080;
        this.timeInMs = Date.now();
        this.currSong = "/dusche.mp3";
        console.log("Servers ip :: " + this.ip);
        var serve = serveStatic(__dirname + "/../../frontend/"); // Pfad zur index.html (typescript-ordner)     
        var serveModules = serveStatic(__dirname + "/../../");
        var serveMp3 = serveStatic("./");
        var server = http.createServer(function (req, res) {
            var done = finalhandler(req, res);
            if (req.url.indexOf(".mp3") > -1) {
                serveMp3(req, res, done);
            }
            else if (req.url.indexOf("node_modules") > -1) {
                serveModules(req, res, done);
            }
            else {
                serve(req, res, done);
            }
        });
        server.listen(this.port);
        var WebSocketServer = require('websocket').server;
        var wsServer = new WebSocketServer({
            httpServer: server,
            autoAcceptConnections: false
        });
        wsServer.on('request', this.handleRequest.bind(this)); // Das bind weg sollte weg. Wahrscheinlich muss irgendwo noch eine ArrowFunction => eingebaut werden
    }
    Server.prototype.originIsAllowed = function (origin) {
        return true;
    };
    Server.prototype.handleRequest = function (request) {
        var _this = this;
        var con = request.accept('echo-protocol', request.origin);
        console.log("connection accepted");
        con.on('message', function (message) {
            console.log("Message:");
            // console.log(message);
            var messageObj = JSON.parse(message.utf8Data);
            console.log(messageObj);
            var json = {};
            switch (messageObj.type) {
                case SONG_REQUEST:
                    var passed = (Date.now() - _this.timeInMs) / 1000;
                    console.log(SONG_REQUEST);
                    json.source = _this.getHttpAddr() + _this.currSong;
                    json.time = passed;
                    json.type = SONG_REQUEST;
                    con.send(JSON.stringify(json));
                    break;
                case PLAYER_DELAY:
                    console.log(PLAYER_DELAY);
                    json.source = _this.getHttpAddr() + _this.currSong;
                    json.type = PLAYER_DELAY;
                    con.send(JSON.stringify(json));
                    break;
                case RTT:
                    console.log(RTT);
                    json = message.utf8Data;
                    con.send(json);
                    break;
                case IP_RECEIVED:
                    _this.ip = messageObj.ip;
                    json.type = IP_RECEIVED;
                    con.send(JSON.stringify(json));
                    break;
                default:
                    console.log("got error: " + messageObj.type);
                    con.send("wrong message");
                    break;
            }
        });
    };
    Server.prototype.log = function (message) {
        if (this.debug) {
            console.log(message);
        }
    };
    Server.prototype.getHttpAddr = function () {
        console.log("GET");
        var httpAddr = "http://" + this.ip + ":" + this.port;
        return httpAddr;
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
//# sourceMappingURL=server.js.map
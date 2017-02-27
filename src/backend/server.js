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
        this.log("Servers ip :: " + this.ip);
        //S   T  A  F  B F:\Git\Uni\MBC-Trump\f
        var serve = serveStatic(__dirname + "/../../frontend/"); // TODO: nacher vll vom javascript bekommmen?   // Pfad zur index.html (typescript-ordner)     
        var serveTranspiled = serveStatic(__dirname + "/../");
        var serveModules = serveStatic(__dirname + "/../../");
        var serveMp3 = serveStatic("./");
        console.log("Dirname: " + __dirname); //
        var server = http.createServer(function (req, res) {
            var done = finalhandler(req, res);
            if (req.url.indexOf(".mp3") > -1) {
                console.log("mp3-req");
                serveMp3(req, res, done);
            }
            else if (req.url.indexOf("node_modules") > -1) {
                console.log("node");
                serveModules(req, res, done);
            } /*else if (req.url.indexOf("frontend") > -1) {
                console.log("trans" + req.url);
                console.log(__dirname)
                serveTranspiled(req, res, done);
            }*/
            else {
                console.log("serve");
                serve(req, res, done);
            }
        });
        server.listen(this.port);
        var WebSocketServer = require('websocket').server;
        var wsServer = new WebSocketServer({
            httpServer: server,
            autoAcceptConnections: false
        });
        wsServer.on('request', this.handleRequest);
    }
    Server.prototype.originIsAllowed = function (origin) {
        return true;
    };
    Server.prototype.handleRequest = function (request) {
        var con = request.accept('echo-protocol', request.origin);
        this.log("connection accepted");
        con.on('message', function (message) {
            this.log(message);
            var messageObj = JSON.parse(message.utf8Data);
            var json = {};
            switch (messageObj.type) {
                case this.SONG_REQUEST:
                    var passed = (Date.now() - this.timeInMs) / 1000;
                    this.log(this.SONG_REQUEST);
                    json.source = this.getHttpAddr() + this.currSong;
                    json.time = passed;
                    json.type = this.SONG_REQUEST;
                    con.send(JSON.stringify(json));
                    break;
                case this.PLAYER_DELAY:
                    this.log(this.PLAYER_DELAY);
                    json.source = this.getHttpAddr() + this.currSong;
                    json.type = this.PLAYER_DELAY;
                    con.send(JSON.stringify(json));
                    break;
                case this.RTT:
                    this.log(this.RTT);
                    json = message.utf8Data;
                    con.send(json);
                    break;
                case this.IP_RECEIVED:
                    this.ip = messageObj.ip;
                    json.type = this.IP_RECEIVED;
                    con.send(JSON.stringify(json));
                    break;
                default:
                    this.log("got error: " + message.type);
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
        var httpAddr = "http://" + this.ip + ":" + this.port;
        return httpAddr;
    };
    return Server;
}());
exports.Server = Server;
var server = new Server();
//# sourceMappingURL=server.js.map
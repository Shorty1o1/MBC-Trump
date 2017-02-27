import http = require('http');
import os = require('os');
import finalhandler = require('finalhandler');
import serveStatic = require('serve-static');


const SONG_REQUEST = "song_request";
const RTT = "rtt";
const PLAYER_DELAY = "player_delay";
const IP_RECEIVED = "ip_message";

export class Server {
    private debug : boolean = true;
    private ip = "";
    private port : number = 8080;

    private timeInMs = Date.now();

    constructor(){
        console.log("Servers ip :: " + this.ip);
        let serve           = serveStatic(__dirname + "/../../frontend/");   // Pfad zur index.html (typescript-ordner)     
        let serveModules    = serveStatic(__dirname + "/../../");
        let serveMp3        = serveStatic("./");

        var server = http.createServer(function(req, res) { // Todo: extra function fuer machen wie in handleRequest()
            var done = finalhandler(req, res);
            if (req.url.indexOf(".mp3") > -1) {
                serveMp3(req, res, done);
            } else if (req.url.indexOf("node_modules") > -1) {
                serveModules(req, res, done);
            } else {
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

    originIsAllowed(origin) : boolean {
        return true;
    }  
   
    private currSong : string = "/dusche.mp3";
    handleRequest(request){
        var con = request.accept('echo-protocol', request.origin);
        console.log("connection accepted");
        con.on('message', function(message) {
            console.log(message);
            var messageObj = JSON.parse(message.utf8Data);
            var json = <any> {};
            switch (messageObj.type) {
                case this.SONG_REQUEST:
                    var passed = (Date.now() - this.timeInMs) / 1000;
                    console.log(this.SONG_REQUEST);                    
                    json.source = this.getHttpAddr() + this.currSong;
                    json.time = passed;
                    json.type = this.SONG_REQUEST;
                    con.send(JSON.stringify(json));
                    break;
                case this.PLAYER_DELAY:
                    console.log(this.PLAYER_DELAY);
                    json.source = this.getHttpAddr() + this.currSong;
                    json.type = this.PLAYER_DELAY;
                    con.send(JSON.stringify(json));
                    break;
                case this.RTT:
                    console.log(this.RTT);
                    json = message.utf8Data;
                    con.send(json);
                    break;
                case this.IP_RECEIVED:
                    this.ip = messageObj.ip;
                    json.type = this.IP_RECEIVED;
                    con.send(JSON.stringify(json));
                    break;
                default:
                    console.log("got error: " + message.type);
                    con.send("wrong message");
                    break;
            }
        });
    }

    log(message : string) {
        if (this.debug) {
            console.log(message);
        }
    }

    getHttpAddr(){
        var httpAddr = "http://" + this.ip + ":" + this.port;
        return httpAddr;
    }
}

var server = new Server();
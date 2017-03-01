import http = require('http');
import os = require('os');
import finalhandler = require('finalhandler');
import serveStatic = require('serve-static');
import { WSocketServer } from './wSocketServer';
import { MessageHandler } from './messageHandler';
import { MessageFactory } from './messageFactory';


const SONG_REQUEST = "song_request";
const RTT = "rtt";
const PLAYER_DELAY = "player_delay";
const IP_RECEIVED = "ip_message";

export class Server {
    private static debug : boolean = true;
    private ip = "";
    private port : number = 8080;

    private timeInMs = Date.now();
    private wSocket : WSocketServer;

    private messageHandler : MessageHandler;
    private messageFactory : MessageFactory;

    private currSong : string = "/dusche.mp3";

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

        this.wSocket = new WSocketServer(server);
        this.messageFactory = new MessageFactory();
        this.messageHandler = new MessageHandler(this.wSocket, this.messageFactory);

        this.messageHandler.addHandler("rtt", this.handleRTT);
        this.messageHandler.addHandler("player_delay", this.handlePlayerDelay);
        this.messageHandler.addHandler("song_request", this.handleSongRequest);
        this.messageHandler.addHandler("ip_message", this.handleIpReceived);
        

    }

    originIsAllowed(origin) : boolean {
        return true;
    }  

    handleSongRequest = (messageObj) => {
        var passed = (Date.now() - this.timeInMs) / 1000;
        var json = {} as any;
        console.log(SONG_REQUEST);                    
        json.source = this.getHttpAddr() + this.currSong;
        json.time = passed;
        json.type = SONG_REQUEST;
        this.wSocket.send(json);
    }

    handleRTT = (messageObj) => {
        console.log(RTT);
        var json = messageObj;
        this.wSocket.send(json);
    }

    handlePlayerDelay = (messageObj) => {
        console.log(PLAYER_DELAY);
        var json = {} as any;
        json.source = this.getHttpAddr() + this.currSong;
        json.type = PLAYER_DELAY;
        this.wSocket.send(json);
    }

    handleIpReceived = (messageObj) => {
        this.ip = messageObj.ip;
        var json = {} as any;
        json.type = IP_RECEIVED;
        this.wSocket.send(json);
    }

    public static log(message : string) {
        if (this.debug) {
            console.log(message);
        }
    }

    getHttpAddr(){
        console.log("GET");
        var httpAddr = "http://" + this.ip + ":" + this.port;
        return httpAddr;
    }
}

var server = new Server();
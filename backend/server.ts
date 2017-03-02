import http = require('http');
import os = require('os');
import finalhandler = require('finalhandler');
import serveStatic = require('serve-static');
import { WSocketServer } from './wSocketServer';
import { MessageHandler } from './messageHandler';
import { MessageFactory } from './messageFactory';
import { Playlist } from './playlist';


const SONG_REQUEST = "song_request";
const RTT = "rtt";
const PLAYER_DELAY = "player_delay";

export class Server {
    private static debug : boolean = true;
    private static port : number = 8080;

    private timeInMs : number = 0;
    private playedTime : number = 0;
    private wSocket : WSocketServer;

    private messageHandler : MessageHandler;
    private messageFactory : MessageFactory;

    private playlist : Playlist;
    private currSong : string = "/dusche.mp3";

    constructor(){

        let serve           = serveStatic("./frontend/");   // Pfad zur index.html (typescript-ordner)     
        let serveModules    = serveStatic("./");
        let serveMp3        = serveStatic("./mp3/");

        var server = http.createServer(function(req, res) { // Todo: extra function fuer machen wie in handleRequest()
            var done = finalhandler(req, res);
            if (req.url.indexOf(".mp3") > -1) {
				console.log("mp3")
                serveMp3(req, res, done);
            } else if (req.url.indexOf("node_modules") > -1) {
                serveModules(req, res, done);
            } else {
                serve(req, res, done);
            }
        });

        server.listen(Server.port);

        this.wSocket = new WSocketServer(server);
        this.messageFactory = new MessageFactory();
        this.messageHandler = new MessageHandler(this.wSocket, this.messageFactory);
        this.playlist = new Playlist();

        this.messageHandler.addHandler("rtt", this.handleRTT);
        this.messageHandler.addHandler("player_delay", this.handlePlayerDelay);
        this.messageHandler.addHandler("song_request", this.handleSongRequest);
        this.messageHandler.addHandler("play", this.handlePlay);
        this.messageHandler.addHandler("pause", this.handleBack);
        this.messageHandler.addHandler("skip", this.handleSkip);
        this.messageHandler.addHandler("back", this.handleBack);

    }

    originIsAllowed(origin) : boolean {
        return true;
    }  

    handleSongRequest = (messageObj, connection) => {
        var passed = (Date.now() - this.timeInMs) / 1000;
        console.log(SONG_REQUEST);                    
        connection.send(this.messageFactory.createPlayMessage(this.currSong, passed));
    }

    handleRTT = (messageObj, connection) => {
        console.log(RTT);
        connection.send(this.messageFactory.createRTTMessage(messageObj));   
    
    }

    handlePlayerDelay = (messageObj, connection) => {
        console.log(PLAYER_DELAY);
        connection.send(this.messageFactory.createPlayerDelayMessage(this.currSong));
    }

    handlePause = (messageObj, connection) => {
        this.playedTime = Date.now() - this.timeInMs;
        this.wSocket.sendToAll(this.messageFactory.createPauseMessage());
    }

    handlePlay = (messageObj, connection) => {
        this.timeInMs = Date.now() - this.playedTime;
        var passed = (Date.now() - this.timeInMs) / 1000;

        this.wSocket.sendToAll(this.messageFactory.createPlayMessage(this.playlist.getSong().path, passed));
    }

    handleSkip = (messageObj, connection) => {
        this.playlist.nextSong();
        this.playedTime = 0;
        this.timeInMs = Date.now();
        var passed = (Date.now() - this.timeInMs) / 1000;
        this.wSocket.sendToAll(this.messageFactory.createPlayMessage(this.playlist.getSong().path,passed))
    }

    handleBack = (messageObj, connection) => {
        this.playlist.previousSong();
        this.playedTime = 0;
        this.timeInMs = Date.now();
        var passed = (Date.now() - this.timeInMs) / 1000;
        this.wSocket.sendToAll(this.messageFactory.createPlayMessage(this.playlist.getSong().path,passed))
    }

    public static log(message : string) {
        if (this.debug) {
            console.log(message);
        }
    }
}

var server = new Server();
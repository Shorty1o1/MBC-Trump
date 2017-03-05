import http = require('http');
import os = require('os');
import finalhandler = require('finalhandler');
import serveStatic = require('serve-static');
import {WSocketServer} from "./wSocketServer";
import {MessageHandler} from "./messageHandler";
import {MessageFactory} from "./messageFactory";
import {Playlist} from "./playlist";


const SONG_REQUEST = "song_request";
const RTT = "rtt";
const PLAYER_DELAY = "player_delay";

export class Server {
    private static debug: boolean = true;
    private static port: number = 8080;

    private timeInMs: number = 0;
    private playedTime: number = 0;
    private isPlaying: boolean = false;
    private clientWSocket: WSocketServer;
    private masterWSocket: WSocketServer;

    private messageHandler: MessageHandler;
    private masterMessageHandler: MessageHandler;
    private messageFactory: MessageFactory;

    private playlist: Playlist;
    private currSong: string = "/dusche.mp3";

    constructor() {

        let serve = serveStatic("./frontend/");   // Pfad zur index.html (typescript-ordner)
        let serveModules = serveStatic("./");
        let serveMp3 = serveStatic("./");

        var server = http.createServer(function (req, res) { // Todo: extra function fuer machen wie in handleRequest()
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

        var masterServer = http.createServer();
        masterServer.listen(8081);

        this.clientWSocket = new WSocketServer(server, 0);
        this.masterWSocket = new WSocketServer(masterServer, 1);
        this.messageFactory = new MessageFactory();
        this.messageHandler = new MessageHandler(this.clientWSocket, this.messageFactory);
        this.masterMessageHandler = new MessageHandler(this.masterWSocket, this.messageFactory);
        this.playlist = new Playlist();

        this.messageHandler.addHandler("rtt", this.handleRTT);
        this.messageHandler.addHandler("player_delay", this.handlePlayerDelay);
        this.messageHandler.addHandler("song_request", this.handleSongRequest);
        this.masterMessageHandler.addHandler("play", this.handlePlay);
        this.masterMessageHandler.addHandler("pause", this.handlePause);
        this.masterMessageHandler.addHandler("skip", this.handleSkip);
        this.masterMessageHandler.addHandler("back", this.handleBack);
        this.masterMessageHandler.addHandler(MessageFactory.IS_PLAYING_REQUEST, this.handlePlayingState)

        this.masterMessageHandler.addHandler(MessageFactory.LIBRARY_REQUEST, this.handleLibraryRequest);
        this.masterMessageHandler.addHandler(MessageFactory.PLAYLIST_REQUEST, this.handlePlaylistRequest);
        this.masterMessageHandler.addHandler(MessageFactory.SET_PLAYLIST, this.handleSetPlaylist)
        this.messageHandler.addHandler(MessageFactory.PLAYLIST_REQUEST, this.handlePlaylistRequest);
    }

    originIsAllowed(origin): boolean {
        return true;
    }

    handleSongRequest = (messageObj, connection) => {
        if (this.isPlaying) {
            var passed = (Date.now() - this.timeInMs) / 1000;
            console.log(SONG_REQUEST + "play");
            connection.send(this.messageFactory.createPlayMessage(this.playlist.getSong(), passed));
        } else {
            connection.send(this.messageFactory.createPauseMessage(this.playlist.getSong()));
        }

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
        this.clientWSocket.sendToAll(this.messageFactory.createPauseMessage(this.playlist.getSong()));
        this.isPlaying = false;
    }

    handlePlay = (messageObj, connection) => {
        console.log("handle play by master");
        this.timeInMs = Date.now() - this.playedTime;
        var passed = (Date.now() - this.timeInMs) / 1000;
        this.clientWSocket.sendToAll(this.messageFactory.createPlayMessage(this.playlist.getSong(), passed));
        this.isPlaying = true;
    }

    handleSkip = (messageObj, connection) => {
        this.playlist.nextSong();
        this.playedTime = 0;
        this.timeInMs = Date.now();
        var passed = (Date.now() - this.timeInMs) / 1000;
        if(this.isPlaying){
            this.clientWSocket.sendToAll(this.messageFactory.createPlayMessage(this.playlist.getSong(), passed));
        }else if(!this.isPlaying){
            this.clientWSocket.sendToAll(this.messageFactory.createPauseMessage(this.playlist.getSong()));
        }
        
    }

    handleBack = (messageObj, connection) => {
        this.playlist.previousSong();
        this.playedTime = 0;
        this.timeInMs = Date.now();
        var passed = (Date.now() - this.timeInMs) / 1000;
        if(this.isPlaying){
            this.clientWSocket.sendToAll(this.messageFactory.createPlayMessage(this.playlist.getSong(), passed));
        }else if(!this.isPlaying){
            this.clientWSocket.sendToAll(this.messageFactory.createPauseMessage(this.playlist.getSong()));
        }
    }

    handlePlayingState = (messageObj, connection) => {
        connection.send(this.messageFactory.createPlayingStateMessage(this.isPlaying));
    }

    handleLibraryRequest =  (messageObj, connection) => {
        connection.send(this.messageFactory.createLibraryResponseMessage(this.playlist.getLibrary()));
    }

    handleSetPlaylist = (messageObj, connection) => {
        console.log("set playlist!");
        console.log(messageObj.playlist);
        this.playlist.setPlaylist(messageObj.playlist);
        connection.send(this.messageFactory.createGetPlaylistResponseMessage(this.playlist.getPlaylist()));
    }

    handlePlaylistRequest =  (messageObj, connection) => {
        console.log("playlistresponse!")
        connection.send(this.messageFactory.createGetPlaylistResponseMessage(this.playlist.getPlaylist()));
    }

    public static log(message: string) {
        if (this.debug) {
            console.log(message);
        }
    }
}

var server = new Server();
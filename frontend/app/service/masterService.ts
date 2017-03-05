import {Injectable} from "@angular/core";
import {MessageFactory} from "../player/MessageFactory";
import {WSocket} from "../player/WSocket";
import {MessageHandler} from "../player/messageHandler";
import {Artist, Album, Song} from "./playlistService";

/**
 * Created by motation on 04.03.2017.
 */

@Injectable()
export class MasterService {
    private wSocket: WSocket;
    private messageHandler: MessageHandler;

    constructor() {
 
    }

    pause(): void {
        this.wSocket.send(MessageFactory.createPauseMessage());
    }

    public play(): void {
        this.wSocket.send(MessageFactory.createPlayMessage());
    }

    public skip(): void {
        this.wSocket.send(MessageFactory.createSkipMessage());
    }

    public backward(): void {
        this.wSocket.send(MessageFactory.createBackMessage());
    }

    public isPlayingRequest(callback: Function): void {
        if (this.wSocket.connection.readyState === this.wSocket.connection.CONNECTING) {
            this.wSocket.connection.onopen = () => {
                this.sendIsPlayingRequest(callback);
            }
        } else {
            this.sendIsPlayingRequest(callback);
        }
    }

    private sendIsPlayingRequest(callback: Function) {
        this.wSocket.send(MessageFactory.createIsPlayingRequestMessage());
        this.messageHandler.addHandler(MessageFactory.IS_PLAYING_RESPONSE, callback);
    }

    public releaseWS(): void {
        this.wSocket.connection.close();
    }

    public connectWS(): void {
        this.wSocket = new WSocket("8081");
        this.messageHandler = new MessageHandler(this.wSocket);
    }

    public sendSetSetPlaylist(songs: Song[]) {
        this.wSocket.send(MessageFactory.createSetPlaylistMessage(songs));
    }

    public sendGetPlaylistRequest(callback: Function) : void {
       
        if (this.wSocket.connection.readyState === this.wSocket.connection.CONNECTING) {
            this.wSocket.connection.onopen = () => {
                 this.wSocket.send(MessageFactory.createPlaylistRequestMessage());
            }
        } else {
             this.wSocket.send(MessageFactory.createPlaylistRequestMessage());            
        }
        this.messageHandler.addHandler(MessageFactory.PLAYLIST_RESPONSE, callback);
    }

    public sendGetLibraryRequest(callback: Function): void{
        if (this.wSocket.connection.readyState === this.wSocket.connection.CONNECTING) {
            this.wSocket.connection.onopen = () => {
                this.wSocket.send(MessageFactory.createLibraryRequestMessage());   
            }
        } else {       
            this.wSocket.send(MessageFactory.createLibraryRequestMessage());   
        }
        this.messageHandler.addHandler(MessageFactory.LIBRARY_RESPONSE, callback); 
    }
}
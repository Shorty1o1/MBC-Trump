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
        this.wSocket = new WSocket("8081");
        this.messageHandler = new MessageHandler(this.wSocket);
    }

    pause(): void {
        this.wSocket.send(MessageFactory.createPauseMessage());
    }

    public play(): void {
        this.wSocket.send(MessageFactory.createPlayMessage());
    }

    public skip(): void {
        console.log(this.wSocket.connection.readyState);
        // this.wSocket.send(MessageFactory.createSkipMessage());
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

    public sendSetSetPlaylist(songs: Song[]) {
        this.wSocket.send(MessageFactory.createSetPlaylistMessage(songs));
    }

    public sendGetPlaylistRequest(callback: Function) : void {
        this.wSocket.send(MessageFactory.createPlaylistRequestMessage());
        if (this.wSocket.connection.readyState === this.wSocket.connection.CONNECTING) {
            this.wSocket.connection.onopen = () => {
                this.messageHandler.addHandler(MessageFactory.PLAYLIST_RESPONSE, callback);
            }
        } else {
                this.messageHandler.addHandler(MessageFactory.PLAYLIST_RESPONSE, callback);            
        }
    }

    public sendGetLibraryRequest(callback: Function): void{
        this.wSocket.send(MessageFactory.createLibraryRequestMessage());
        if (this.wSocket.connection.readyState === this.wSocket.connection.CONNECTING) {
            this.wSocket.connection.onopen = () => {
                this.messageHandler.addHandler(MessageFactory.LIBRARY_RESPONSE, callback);       
            }
        } else {
            this.messageHandler.addHandler(MessageFactory.LIBRARY_RESPONSE, callback);        
        }
    }

}
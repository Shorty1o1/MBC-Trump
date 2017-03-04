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

    private messageFactory: MessageFactory;
    private wSocket: WSocket;
    private messageHandler: MessageHandler;

    constructor() {
        this.messageFactory = new MessageFactory();
        this.wSocket = new WSocket("8081");
        this.messageHandler = new MessageHandler(this.wSocket, this.messageFactory);
    }

    pause(): void {
        this.wSocket.send(this.messageFactory.createPauseMessage());
    }

    public play(): void {
        this.wSocket.send(this.messageFactory.createPlayMessage());
    }

    public skip(): void {
        console.log(this.wSocket.connection.readyState);
        // this.wSocket.send(this.messageFactory.createSkipMessage());
    }

    public backward(): void {
        this.wSocket.send(this.messageFactory.createBackMessage());
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
        this.wSocket.send(this.messageFactory.createIsPlayingRequestMessage());
        this.messageHandler.addHandler(MessageFactory.IS_PLAYING_RESPONSE, callback);
    }

    private sendSetSetPlaylist(songs: Song[]) {

    }

    private sendGetPlaylistRequest() : void {

    }

    private sendGetLibraryRequest(): void{

    }

}
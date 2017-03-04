import {Injectable} from "@angular/core";
import {MessageFactory} from "../player/MessageFactory";
import {WSocket} from "../player/WSocket";
import {MessageHandler} from "../player/messageHandler";
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
        this.wSocket.send(this.messageFactory.createSkipMessage());
    }

    public backward(): void {
        this.wSocket.send(this.messageFactory.createBackMessage());
    }

    public isPlayingRequest(callback: Function): void {
        //OF TODO work in progress....

        // console.log("request play state");
        // console.log(this.wSocket.connection.OPEN);
        // console.log(this.wSocket.connection.CLOSING);
        // console.log(this.wSocket.connection.CLOSED);
        // console.log(this.wSocket.connection.readyState);
        //
        // let isPlaying = this.wSocket.send(this.messageFactory.createIsPlayingRequestMessage());
        // this.messageHandler.addHandler(MessageFactory.IS_PLAYING_RESPONSE, callback);
    }
}

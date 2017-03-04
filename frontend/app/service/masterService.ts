import {Injectable} from "@angular/core";
import {MessageFactory} from "../player/MessageFactory";
import {WSocket} from "../player/WSocket";
import {MessageHandler} from "../player/messageHandler";
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
    }
}
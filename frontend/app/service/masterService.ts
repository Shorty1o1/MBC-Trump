import {Injectable} from "@angular/core";
import {Master} from "../player/master";
/**
 * Created by motation on 04.03.2017.
 */

@Injectable()
export class MasterService {
    private master: Master;

    constructor() {
        this.master = new Master();
    }

    public sendBackwardSkip(): void {

    }

    public sendPlay(): void {
        this.master.play();
    }

    public sendPause(): void {
        this.master.pause();
    }

    public sendSkip(): void {

    }

    public getPlayerState(): string {
        //OF TODO get real state from backend
        return "pause";
    }
}

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

    }

    public sendPause(): void {

    }

    public sendSkip(): void {

    }
}

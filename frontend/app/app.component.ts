import {Component} from "@angular/core";
import {Client} from "./player/Client";
import {Router} from "@angular/router";
import {MasterService} from "./service/masterService";

@Component({
    selector: 'app-root',
    templateUrl: './app/app.component.html',
})
export class AppComponent {
    private client;

    private isMaster: boolean = false;

    private router: Router;

    getClient(): Client {
        return this.client;
    }

    changeMasterSlave() {
        if (this.isMaster) {
            this.client.unmute();
            this.masterService.releaseWS();
            this.router.navigate(['./slave']);
        } else {
            this.client.mute();
            this.masterService.connectWS();
            this.router.navigate(['./master']);
        }
    }

    private ngAfterViewInit(): void {
        this.client = new Client();
    }

    constructor(router: Router, private masterService: MasterService) {
        this.router = router;
    }
}
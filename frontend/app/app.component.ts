import {Component} from "@angular/core";
import {Platform} from "./player/Platform";
import {Client} from "./player/Client";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app/app.component.html',
})
export class AppComponent {
    private pf = new Platform();

    private client = new Client();

    private isMaster: boolean = true;

    private router: Router;

    getClient(): Client {
        return this.client;
    }


    // Todo:
    changeMasterSlave() {
        console.log("Master-Slave-Change ")
        if (this.isMaster) {
            this.router.navigate(['./slave']);
        } else {
            this.client.pause();
            this.router.navigate(['./master']);
        }
    }


    constructor(router: Router) {
        this.router = router;
        console.log("Hauptkomponente initialisiert!");
    }
}
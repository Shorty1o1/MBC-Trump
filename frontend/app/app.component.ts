import { Component } from '@angular/core';

import { Platform } from './player/Platform';
import { Client } from './player/Client';

@Component({
    selector: 'app-root',
    templateUrl: './app/app.component.html',
})
export class AppComponent {
	private pf = new Platform();

	private client = new Client();

	private isMaster : boolean = true;

	getClient():Client{
		return this.client;
	}


	// Todo:
	changeMasterSlave(){
		console.log("Master-Slave-Change ")
		if(this.isMaster){
			// Wechsel zur slave-component-seite
		} else {
			// Wechsel zur master-component-seite
		}
	}

	
    constructor(){
		 console.log("Hauptkomponente initialisiert!");
	}
}
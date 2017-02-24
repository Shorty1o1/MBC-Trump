import { Component } from '@angular/core';


import { Platform } from './player/Platform';
import { Client } from './player/Client';


@Component({
    selector: 'app-root',
    templateUrl: './app/app.component.html',
})
export class AppComponent {
	pf = new Platform();

	client = new Client();

	
    constructor(){
		 console.log("Hauptkomponente initialisiert!");
	}

	test(){
		console.log("Testmethod called");
	}
}
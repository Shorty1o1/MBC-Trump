import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {AppComponent} from "../app.component";
import {Client} from '../player/Client';

@Component({
    selector: 'app-home',	
    templateUrl: 'app/home/home.html'
})
export class HomeComponent {
	//spotifyImageJson;

	private client:Client;
	
	constructor(private http:Http, private app:AppComponent){
		console.log("los gehts")
		//this.spotifyImageJson = "asd"
		//this.http.get('https:// api.spotify.com/v1/search?q=tania%20bowra&type=artist').subscribe(res => console.log("fertig: " +   res.json().data || { }));  
		//console.log("Hi: " + this.spotifyImageJson.data)
		this.client = app.getClient();
		this.client.addChangeEventHandler(this.stateEventCallbackFunction());
	};

	skip() {
		console.log("Skip")
		//console.log(this.spotifyImageJson.length)
	}
	
	pause(){
		console.log("pause");
		this.client.playPauseToggle();
	}

	stateEventCallbackFunction():Function{
		return function(state:String){
			console.log("actual state " + state);
		}
	}
}

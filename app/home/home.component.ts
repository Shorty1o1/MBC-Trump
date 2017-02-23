import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'app-home',	
    templateUrl: 'app/home/home.html'
})
export class HomeComponent {

	spotifyImageJson;
	
	constructor(private http:Http){
		console.log("los gehts")
		//this.spotifyImageJson = "asd"
		//this.http.get('https://api.spotify.com/v1/search?q=tania%20bowra&type=artist').subscribe(res => console.log("fertig: " +   res.json().data || { }));  
		//console.log("Hi: " + this.spotifyImageJson.data)
	};

	skip() {
		console.log("Skip")
		//console.log(this.spotifyImageJson.length)
	}
	
	pause(){
		console.log("pause");
	}
};
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AppComponent } from "../app.component";
import { Client } from '../player/Client';
import { SpotifyCoverArtwork, IGetAlbumCover } from '../player/SpotifyCoverArtwork';

@Component({
    selector: 'app-slave',	
    templateUrl: 'app/slave/slave.html'
})

export class SlaveComponent {
	private client:Client;
	private coverGetter : IGetAlbumCover;
	private trumpCoverLink : string = "../trumpCover.png"
	private albumCoverLink : string = this.trumpCoverLink;
	
	constructor(private http:Http, private app:AppComponent){
		console.log("los gehts")
		
		this.coverGetter = new SpotifyCoverArtwork(http);
		this.coverGetter.addCoverReceivedEventHandler(this.coverReveicedCallbackFunction());
		
		this.client = app.getClient();
		this.client.addChangeEventHandler(this.stateEventCallbackFunction());		
	};

	skip() {
		console.log("Skip")
		
		this.coverGetter.getCoverLink("Linkin Park", "RECHARGED"); // TODO: artist und desen album 
	}
	
	pause(){
		console.log("pause");
		this.client.playPauseToggle();
	}

	private isPlaying: boolean = true;
	stateEventCallbackFunction():Function{
		return (function(state:String){
			if(state === "play"){
				this.isPlaying = true;
				console.log("isplaying " + state);
			} else {
				this.isPlaying = false;
			console.log("isNotPlaying " + state);
			}
		}).bind(this);
	}
	
	coverReveicedCallbackFunction() : Function {
		return (function(coverLink: String){
			if(coverLink != ""){
				this.albumCoverLink = coverLink;
			} else {
				this.albumCoverLink = this.trumpCoverLink;
			}
		}).bind(this)
	}
}

import {Http} from '@angular/http';

export interface IGetAlbumCover{
	
	getCoverLink(artistName: string, albumTitle: string);	
	addCoverReceivedEventHandler(callback: Function); // Function called, when coverLink 
}

export class SpotifyCoverArtwork implements IGetAlbumCover {
	private coverReceivedEventFunction: Function;
	
	constructor (private http:Http) {
		//this.getCoverLink("Linkin Park" , "RECHARGED");  // TODO, woanders
	};
	
	getCoverLink(artistName: string, albumTitle: string){
		this.http.get('https://api.spotify.com/v1/search?q=' + artistName + '&type=artist').subscribe(res => {
			var foundArtists =  res.json().artists.items || { };
			var artistID = "";
			for(var artistIndex = 0; artistIndex < foundArtists.length; artistIndex++){
				if(foundArtists[artistIndex].name === artistName){
					artistID = foundArtists[artistIndex].id;
				}
			}
			
			if(artistID != "") {
				this.getArtistsAlbums(artistID, albumTitle);
			} else {
				// Leeren string returnen wenn nicht gefunden
				if(this.coverReceivedEventFunction){
					this.coverReceivedEventFunction("");
				}
				console.log ("Spotify kennt diesen Artist nicht")				
			}
		});  
	}
	
	
	private getArtistsAlbums(artistID: string, albumTitle: string){
		this.http.get('https://api.spotify.com/v1/artists/' + artistID + '/albums').subscribe(res => {
			var foundAlbums =  res.json().items || { };
			var albumCoverLink = "";
			for(var albumIndex = 0; albumIndex < foundAlbums.length; albumIndex++){
				if(foundAlbums[albumIndex].name === albumTitle){
					albumCoverLink = foundAlbums[albumIndex].images[1].url;
				}
			}
			
			// Wenn artist nicht gefunden, dann ver
			if(albumCoverLink != "") {				
				console.log ("Spotify hat das Album-Cover gefunden: " + albumCoverLink)	
				if(this.coverReceivedEventFunction){
					this.coverReceivedEventFunction(albumCoverLink);
				} else {
					console.log("Could not execute callback-function because it is undefined")
				}
			} else {
				// Leeren string returnen wenn nicht gefunden
				if(this.coverReceivedEventFunction){
					this.coverReceivedEventFunction("");
				}			
				console.log ("Spotify hat das Album nicht gefunden")		
			}
		});
	}
	
	// Todo. vll eine string-compare-methode, die case-insensitv ist und vll nur nach contains guckt, aber auch checkt, wenn EXAKT der selbe string
	
	addCoverReceivedEventHandler(callback:Function){
		this.coverReceivedEventFunction = callback;
	}
}
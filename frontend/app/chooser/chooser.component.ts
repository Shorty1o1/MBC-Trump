import {Component} from '@angular/core';
import {Http} from '@angular/http';

import { Album } from './album';
import { Song } from './song';
import { Artist } from './artist';


@Component({
    selector: 'app-chooser',
    templateUrl: 'app/chooser/chooser.html',
    styleUrls: ['app/chooser/panelStyle.css']
})
export class ChooserComponent {
	private artists : Artist [];
	private selectedArtist : Artist;
	private selectedAlbum : Album;
	private selectedSong : Song;
	private newPlayList : Song[];
	
	// Filter muessen initialisiert werden, sonst ist liste am Anfang leer
	artistFilter = ""; 
	albumFilter = "";
	songFilter = "";
	
	// Get JSON and set parents // TODO: maybe better method to do so
    constructor(private http:Http){
    	this.newPlayList = [];
		this.http.get('app/chooser/artists.json').subscribe(res => {
			this.artists = res.json() as Artist[];
		    for(var artistI = 0; artistI < this.artists.length; artistI++){
		    	var curArtist : Artist = this.artists[artistI];
		    	for(var albumI = 0; albumI < curArtist.getAlbums().length; albumI++){
		    		var curAlbum : Album = curArtist.getAlbums()[albumI];
		    		curAlbum.setArtist(curArtist);
		    		for(var songI = 0; songI < curAlbum.getSongs().length; songI++){
		    			var curSong = curAlbum.getSongs()[songI];
		    			curSong.setAlbum(curAlbum);
		    		}
		    	}
		    }
		}); 		
	};
  
    setArtist(artist : Artist) {        
        console.log("SetArtist: " + artist.getName());
        this.selectedArtist = artist;
		this.selectedAlbum = null; // Damit sich die Songliste leert (vom vorherigen Artist)
    }			
   
	setAlbum(album : Album) {
		console.log("SetAlbum: " + album.getTitle())
		this.selectedAlbum = album;
		
	}
	
	removeSongFromPlaylist(song : Song) {
		console.log("remove")
		for(var i = 0; i < this.newPlayList.length; i++){
			console.log("i: " +i)
			if(this.newPlayList[i] == song) { // bloss nicht ===
				this.newPlayList.splice(i, 1);
				break;
			}
		}
	}
 
    addSongToPlaylist(song : Song) {
		// Todo:
		this.newPlayList[this.newPlayList.length] = song;
	}
	
	addAlbumToPlaylist(album : Album) {
		for(var i = 0; i < album.getSongs().length; i++) {			
			this.addSongToPlaylist(album.getSongs()[i]);
		}
	}
	
	addArtistToPlaylist(artist : Artist){
		console.log("Add artist"  + artist.getAlbums().length)
		for(var i = 0; i < artist.getAlbums().length; i++) {
			this.addAlbumToPlaylist(artist.getAlbums()[i]);
		}
	}
};
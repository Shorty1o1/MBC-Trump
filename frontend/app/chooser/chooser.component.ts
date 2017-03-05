import {Component} from '@angular/core';
import {PlaylistService, Artist, Album, Song} from "../service/playlistService"

@Component({
    selector: 'app-chooser',
    templateUrl: 'app/chooser/chooser.html',
    styleUrls: ['app/chooser/panelStyle.css']
})
export class ChooserComponent {
	private selectedArtist : Artist;
	private selectedAlbum : Album;
	private selectedSong : Song;
	// Filter muessen initialisiert werden, sonst ist liste am Anfang leer
	artistFilter = ""; 
	albumFilter = "";
	songFilter = "";
	
	// Get JSON and set parents // TODO: maybe better method to do so
    constructor(private playlistService:PlaylistService){
	};
  
    setArtist(artist : Artist) {
        this.selectedArtist = artist;
		this.selectedAlbum = null; // Empty old list of songs
    }

	setAlbum(album : Album) {
		console.log("SetAlbum: " + album.title)
		this.selectedAlbum = album;		
	}
	
	removeSongFromPlaylist(song : Song) {
    	this.playlistService.removeFromPlaylist(song);
	}
 
    addSongToPlaylist(song : Song) {
    	this.playlistService.addSongToPlaylist(song);
	}
	
	addAlbumToPlaylist(album : Album) {
		this.playlistService.addAlbumToPlaylist(album);
	}
	
	addArtistToPlaylist(artist : Artist){
		this.playlistService.addArtistToPlaylist(artist);
	}

	getPlaylist() : Song[] {
		return this.playlistService.getPlaylist();
	}

	getLibrary(): Artist[]{
		return this.playlistService.getLibrary();
	}
};

import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'app-chooser',
    templateUrl: 'app/chooser/chooser.html',
    styleUrls: ['app/chooser/panelStyle.css']
})
export class ChooserComponent {
	private artists[] : Artist [];
	private selectedArtist : Artist;
	private selectedAlbum : Album;
	private selectedSong : Song;
	private newPlayList[] : Song[];
	
	// Filter muessen initialisiert werden, sonst ist liste am Anfang leer
	artistFilter = ""; 
	albumFilter = "";
	songFilter = "";
	
    constructor(private http:Http){
		this.http.get('app/chooser/artists.json').subscribe(res => this.artists = res.json() as Artist[]); 
	};
  
    setArtist(artist : Artist) {        
        console.log("SetArtist: " + artist.name);
        this.selectedArtist = artist;
		this.selectedAlbum = null; // Damit sich die Songliste leert (vom vorherigen Artist)
    }			
   
	setAlbum(album : Album) {
		console.log("SetAlbum: " + album.title)
		this.selectedAlbum = album;
		
	}	
	
	removeSongFromPlaylist(song : Song){
		console.log("remove")
		for(var i = 0; i < this.newPlayList.length; i++){
			console.log("i: " +i)
			if(this.newPlayList[i] == song) { // bloss nicht ===
				console.log("gefunden")
				this.newPlayList.splice(i, 1);
				break;
			}
		}
	}
 
    addSongToPlaylist(song : Song) {
		// Todo:
		this.newPlayList[this.newPlayList.length] = song;
		console.log("Länge: " + this.artists.length)
	}
	
	addAlbumToPlaylist(album : Album) {
		for(var i = 0; i < album.songs.length; i++) {			
			this.addSongToPlaylist(album.songs[i]);
		}
	}
	
	addArtistToPlaylist(artist : Artist){
		console.log("Add artist"  +artist.albums.length)
		for(var i = 0; i < artist.albums.length; i++) {
			console.log("Artist: " + artist.name + " , Album: " + artist.albums[i].title)
			this.addAlbumToPlaylist(artist.albums[i]);
		}
	}
};


export interface Artist {
	name: string;
	albums: Album[];
}

export interface Album {
	title: string;
	songs: Song[];
}

export interface Song {
	title: string;
	length: string; //TODO
}
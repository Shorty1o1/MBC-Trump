import {Component} from '@angular/core';
import {Http} from '@angular/http';

@Component({
    selector: 'app-chooser',
    templateUrl: 'app/chooser/chooser.html',
    styleUrls: ['app/chooser/panelStyle.css']
})
export class ChooserComponent {
    welcome : string;
    
	private selectedArtist : Artist;
	private selectedAlbum : Album;
	private selectedSong : Song;

	
    constructor(private http:Http){
        this.welcome = "Hier kann man bald Songs auswählen" 	
		
		this.http.get('app/chooser/artists.json').subscribe(res => this.artists = res.json() as Artist[]); 
    };
  
    setArtist(artist : Artist) {        
        console.log("SetArtist: " + artist.name);
        this.selectedArtist = artist;
    }			
   
	setAlbum(album : Album) {
		console.log("SetAlbum: " + album.title)
		this.selectedAlbum = album;
	}	
 
    setSong(song : Song) {
		console.log("SetSong: " + song.title)
		this.selectedSong = song;
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
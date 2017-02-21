import {Component} from '@angular/core';
import {Http} from '@angular/http';
var selectedArtist;
var selectedAlbum;

@Component({
    selector: 'app-about',
    templateUrl: 'app/chooser/chooser.html'   
    styleUrls: ['app/chooser/panelStyle.css']
})
export class ChooserComponent {
    welcome : string;
    list;
    
    
    constructor(private http:Http){
        this.welcome = "Hier kann man bald Songs auswählen"
        this.http.get('app/chooser/artists.json').subscribe(res => this.list = res.json());        
    };
  
    setArtist(artist) {        
        console.log("SetArtist: " + artist);
        selectedArtist = artist;
    }
			
    getArtist() : string {        
        console.log("GetArtist: " + selectedArtist);
        return selectedArtist;
    }
	
	setAlbum(album) {
		console.log("SetAlbum: " + album)
		selectedAlbum = album;
	}	
    
	getAlbum() : string {
		console.log("Ge3tAlbum: " + selectedAlbum);
        return selectedAlbum;
	}

    generateArray(obj){
		console.log("GenerateArray: " + obj);
		return Object.keys(obj).map((key)=>{ return obj[key]});
    }
};
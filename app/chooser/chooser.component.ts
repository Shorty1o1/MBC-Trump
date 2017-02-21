import {Component} from '@angular/core';
import {Http} from '@angular/http';
var  selectedArtist;

@Component({
    selector: 'app-about',
    templateUrl: 'app/chooser/chooser.html'   
    styleUrls: ['app/chooser/panelStyle.css']
})
export class ChooserComponent {
    welcome : string;
    list;
    
    albums;
    constructor(private http:Http){
        this.welcome = "Hier kann man bald Songs auswählen"
        this.http.get('app/chooser/artists.json').subscribe(res => this.list = res.json());        
    };
  
    setArtist(artist) {        
        console.log("Artist selected: " + artist);
        selectedArtist = artist;
    }
    
    getArtist(): string {        
        console.log("Get: " + selectedArtist);
        return selectedArtist;
    }

    generateArray(obj){
       return Object.keys(obj).map((key)=>{ return obj[key]});
    }
};
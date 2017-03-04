import {Injectable} from "@angular/core";
import {MasterService} from "../service/masterService";
import {Http} from "@angular/http" // Todo weg


export class PlaylistService {
	private library : Artist [];
    private playlist: Song[];
    private masterService: MasterService;

    constructor(private http:Http, private masterService: MasterService) {
    	this.masterService = masterService;
        this.library = [];
        this.playlist = []
        // Todo: Master (oder masterservice? ) holen
        // Todo: Library anfordern -> nicht mit http-get
        this.http.get('app/chooser/artists.json').subscribe(res => {
			this.library = res.json() as Artist[];
		    for(var artistI = 0; artistI < this.library.length; artistI++){
		    	var curArtist = this.library[artistI];
		    	for(var albumI = 0; albumI < curArtist.albums.length; albumI++){
		    		var curAlbum = curArtist.albums[albumI];
		    		curAlbum.artist = curArtist;
		    		for(var songI = 0; songI < curAlbum.songs.length; songI++){
		    			var curSong = curAlbum.songs[songI];
		    			curSong.album = curAlbum;
		    		}
		    	}
		    }
		}); 		
        // Todo: server nach currentplaylist fragen
    }

    public getLibrary() : Artist[]{
    	return this.library;
    }

  	public addSongToPlaylist(song: Song): void {  		
		this.playlist[this.playlist.length] = song;
    }

    public addAlbumToPlaylist(album: Album): void {
    	for(var i = 0; i < album.songs.length; i++) {			
			this.addSongToPlaylist(album.songs[i]);
		}
    }

    public addArtistToPlaylist(artist: Artist): void {
		for(var i = 0; i < artist.albums.length; i++) {
			this.addAlbumToPlaylist(artist.albums[i]);
		}
	}

    public removeFromPlaylist(song: Song): void {  	
    	// Nach Song suchen
		for(var i = 0; i < this.playlist.length; i++){
			console.log("i: " +i)
			if(this.playlist[i] == song) { // bloss nicht ===
				// TODO: senden an server -> auf feedback warten?

				this.playlist.splice(i, 1);
				break;
			}
		}
    }
}


export interface Artist {
	name: string;
	albums: Album[];
}

export interface Album {
	artist: Artist;
	title: string;
	songs: Song[];
}

export interface Song {
	album: Album;
	title: string;
	length: string; //TODO
}
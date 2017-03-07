import {Injectable} from "@angular/core";
import {MasterService} from "../service/masterService";

@Injectable()
export class PlaylistService {
	private library : Artist[];
	private playlist: Song[];

	constructor(private masterService: MasterService) {
		this.playlist = [];
		this.library = [];
		this.masterService.sendGetLibraryRequest(this.getLibraryCallback);
	}

	private getPlaylistCallback = (res) =>{
		var tempPlaylist = JSON.parse(res.playlist) as Song[] ;
		this.playlist = [];
		// Gucken in der library nach song mit der selben id
		for(var playlistSongI = 0; playlistSongI < tempPlaylist.length; playlistSongI++){
			for(var artistI = 0; artistI < this.library.length; artistI++){
				var curArtist = this.library[artistI] as Artist;
				for(var albumI = 0; albumI < curArtist.albums.length; albumI++){
					var curAlbum = curArtist.albums[albumI] as Album;
					for(var songI = 0; songI < curAlbum.songs.length; songI++){
						var curSong = curAlbum.songs[songI] as Song;
						if(curSong.id === tempPlaylist[playlistSongI].id) {
							this.playlist[playlistSongI] = curSong;
						}
					}				
				}
			}
			if(!this.playlist[playlistSongI]){
				console.log("Error: song of received playlist in unknown to local library");
			}
		}
	}


	private getLibraryCallback = (res) => {        	
		this.library = res.library as Artist[];
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
		// Erst nachdem die library bekannt ist, die playlist holen
		this.masterService.sendGetPlaylistRequest(this.getPlaylistCallback);
	}

	public getLibrary() : Artist[]{
		return this.library;
	}

	public getPlaylist() : Song[]{
		return this.playlist;
	}

	public addSongToPlaylist(song: Song): void {  		
		this.playlist[this.playlist.length] = song;
		this.masterService.sendSetSetPlaylist(this.playlist);
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
			if(this.playlist[i] == song) { // bloss nicht ===				
				this.playlist.splice(i, 1);
				this.masterService.sendSetSetPlaylist(this.playlist);
				break;
			}
		}
	}
}


export class Artist {
	name: string;
	id: number;
	albums: Album[];
}

export class Album {
	artist: Artist;
	title: string;
	id: number;
	songs: Song[];
}

export class Song {
	album: Album;
	title: string;
	id: number;
	path: string;
	length: string; //TODO
}

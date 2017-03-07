
export class Playlist{
	private library = [];
	private playlist = [];
	private index = 0;

	constructor(){
		var fs = require('fs');
		this.library = JSON.parse(fs.readFileSync('./mp3/artists.json', 'utf8'));
		this.playlist = [];
	}

	getSong() {
		return this.playlist[this.index];
	}

	nextSong(){
		this.index++;
		if(this.index === this.playlist.length)
		{
			this.index = 0;
		}
	}

	previousSong(){
		this.index--;
		if(this.index === -1)
		{
			this.index = this.playlist.length - 1;
		}	
	}

	getLibrary(){
		return this.library;
	}

	getPlaylist(){
		return this.playlist;
	}

	setPlaylist(playlist){
		this.playlist = JSON.parse(playlist);
	}
	
}
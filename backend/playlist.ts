
export class Playlist{
	private playlist = [];
	private index = 0;

	constructor(){
		var fs = require('fs');
		var artists = JSON.parse(fs.readFileSync('./mp3/artists.json', 'utf8'));

		for (let artist of artists){
			for(let album of artist.albums){
				for(let song of album.songs){
					this.playlist.push(song);
				}
			}
		}
	}

	getSong(){
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

	
}
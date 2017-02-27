import { Song } from './song';
import { Artist } from './artist';


export class Album{
    private artist: Artist;
    private title: string;
    private songs: Song[];

    getArtist() : Artist{
        return this.artist;
    }

    getTitle() : string{
        return this.title;
    }

    getSongs() : Song[]{
        return this.songs;
    }

    setArtist(artist : Artist){
        this.artist = artist;
    }

    setTitle(title : string){
        this.title = title;
    }

    setSongs(songs : Song[]){
        this.songs = songs;
    }


}
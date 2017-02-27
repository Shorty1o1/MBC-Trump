import {Album} from './album';

export class Song {
    private album : Album;
    private title : string;
    private length : number; // in ms



    getAlbum() : Album{
        return this.album;
    }

    getTitle() : string{
        return this.title;
    }

    getLengt() : number{
        return this.length;
    }

    setAlbum(album : Album){
        this.album = album;
    }

    setTitle(title : string){
        this.title = title;
    }

    setLength(length : number){
        this.length = length;
    }
}
import { Album } from './album';

export class Artist{
    private name: string;
    private albums: Album[];

    getAlbums() : Album[]{
        return this.albums;
    }

    getName() : string{
        return this.name;
    }

    setAlbums(albums :  Album[]){
        this.albums = albums;
    }

    setName(name : string){
        this.name = name;
    }

}
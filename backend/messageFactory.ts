export const SONG_REQUEST = "song_request";
export const RTT = "rtt";
export const PLAYER_DELAY = "player_delay";
export const PAUSE = "pause";
export const PLAY = "play";

export class MessageFactory {
    public static LIBRARY_RESPONSE: string = "library_response";
    public static LIBRARY_REQUEST: string = "library_request";
    public static PLAYLIST_REQUEST: string = "playlist_request";
    public static PLAYLIST_RESPONSE: string = "playlist_response";
    public static SET_PLAYLIST: string = "set_playlist"

    public static IS_PLAYING_REQUEST: string = "is_playing_request";
    public static IS_PLAYING_RESPONSE: string = "is_playing_response";

    getMessage(message) {
        return JSON.parse(message);
    }

    createRTTMessage(messageObj) {
        return JSON.stringify(messageObj);
    }

    createPlayerDelayMessage(song: string) {
        var json = <any>{};
        json.type = PLAYER_DELAY;
        json.source = song;
        return JSON.stringify(json);
    }

    createPauseMessage() {
        var json = <any>{};
        json.type = PAUSE;
        return JSON.stringify(json);
    }

    createPlayMessage(src: string, time: number) {
        var json = <any>{};
        json.type = PLAY;
        json.source = src;
        json.time = time;
        return JSON.stringify(json);
    }

    createPlayingStateMessage(isPlaying: Boolean): string {
        var json: any = {};
        json.type = MessageFactory.IS_PLAYING_RESPONSE;
        json.isPlaying = isPlaying;
        return JSON.stringify(json);
    }

    createLibraryResponseMessage(library): string {
        console.log(library);
        var json: any = {};
        json.type = MessageFactory.LIBRARY_RESPONSE;
        json.library = library;
        return JSON.stringify(json);
    }

    createGetPlaylistResponseMessage(playlist): string{
        console.log(playlist);
        var json: any = {};
        json.type = MessageFactory.PLAYLIST_RESPONSE;
        json.playlist = playlist;
        return JSON.stringify(json);
    }
}
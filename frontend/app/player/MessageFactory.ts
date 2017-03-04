export const SONG_REQUEST = "song_request";
export const RTT = "rtt";
export const PLAYER_DELAY = "player_delay";
export const PAUSE = "pause";
export const PLAY = "play";
export const SKIP = "skip";
export const BACK = "back";



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

    createRTTMessage(): string {
        var json: any = {};
        json.type = RTT;
        json.sentTime = Date.now();
        //OF maybe add some other fields here;
        return JSON.stringify(json);
    }

    createPlayerDelayMessage(): string {
        var json: any = {};
        json.type = PLAYER_DELAY;
        return JSON.stringify(json);
    }

    createSongRequestMessage(): string {
        var json: any = {};
        json.type = SONG_REQUEST;
        return JSON.stringify(json);
    }

    createPlayMessage(): string {
        var json: any = {};
        json.type = PLAY;
        return JSON.stringify(json);
    }

    createPauseMessage(): string {
        var json: any = {};
        json.type = PAUSE;
        return JSON.stringify(json);
    }

    createSkipMessage(): string {
        var json: any = {};
        json.type = SKIP;
        return JSON.stringify(json);
    }

    createBackMessage(): string {
        var json: any = {};
        json.type = BACK;
        return JSON.stringify(json);
    }

    public createIsPlayingRequestMessage(): string {
        var json: any = {};
        json.type = MessageFactory.IS_PLAYING_REQUEST;
        return JSON.stringify(json);
    }

    public createLibraryRequestMessage(): string {
        var json: any = {};
        json.type = MessageFactory.LIBRARY_REQUEST;
        return JSON.stringify(json);
    }

    public createPlaylistRequestMessage(): string {
        var json: any = {};
        json.type = MessageFactory.PLAYLIST_REQUEST;
        return JSON.stringify(json);
    }

    public createSetPlaylistMessage(): string {
        var json: any = {};
        json.type = MessageFactory.SET_PLAYLIST;
        return JSON.stringify(json);
    }
}

export class MessageFactory {
    public static IS_PLAYING_REQUEST: string = "is_playing_request";
    public static IS_PLAYING_RESPONSE: string = "is_playing_response";
    public static SONG_REQUEST: string = "song_request";
    public static RTT: string = "rtt";
    public static PLAYER_DELAY: string = "player_delay";
    public static PAUSE: string = "pause";
    public static PLAY: string = "play";
    public static SKIP: string = "skip";
    public static BACK: string = "back";

    public static getMessage(message) {
        return JSON.parse(message);
    }

    public static createRTTMessage(): string {
        var json: any = {};
        json.type = MessageFactory.RTT;
        json.sentTime = Date.now();
        //OF maybe add some other fields here;
        return JSON.stringify(json);
    }

    public static createPlayerDelayMessage(): string {
        var json: any = {};
        json.type = MessageFactory.PLAYER_DELAY;
        return JSON.stringify(json);
    }

    public static createSongRequestMessage(): string {
        var json: any = {};
        json.type = MessageFactory.SONG_REQUEST;
        return JSON.stringify(json);
    }

    public static createPlayMessage(): string {
        var json: any = {};
        json.type = MessageFactory.PLAY;
        return JSON.stringify(json);
    }

    public static createPauseMessage(): string {
        var json: any = {};
        json.type = MessageFactory.PAUSE;
        return JSON.stringify(json);
    }

    public static createSkipMessage(): string {
        var json: any = {};
        json.type = MessageFactory.SKIP;
        return JSON.stringify(json);
    }

    public static createBackMessage(): string {
        var json: any = {};
        json.type = MessageFactory.BACK;
        return JSON.stringify(json);
    }

    public static createIsPlayingRequestMessage(): string {
        var json: any = {};
        json.type = MessageFactory.IS_PLAYING_REQUEST;
        return JSON.stringify(json);
    }
}

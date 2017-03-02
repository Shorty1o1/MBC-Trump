export const SONG_REQUEST = "song_request";
export const RTT = "rtt";
export const PLAYER_DELAY = "player_delay";
export const PAUSE = "pause";
export const PLAY = "play";
export const SKIP = "skip";
export const BACK = "back";

export class MessageFactory {
    getMessage(message) {
        return JSON.parse(message);
    }

    createRTTMessage() {
        var json = <any>{};
        json.type = RTT;
        json.sentTime = Date.now();
        //OF maybe add some other fields here;
        return JSON.stringify(json);
    }

    createPlayerDelayMessage() {
        var json = <any>{};
        json.type = PLAYER_DELAY;
        return JSON.stringify(json);
    }

    createSongRequestMessage() {
        var json = <any>{};
        json.type = SONG_REQUEST;
        return JSON.stringify(json);
    }

    createPlayMessage() {
        var json = <any>{};
        json.type = PLAY;
        return JSON.stringify(json);
    }

    createPauseMessage() {
        var json = <any>{};
        json.type = PAUSE;
        return JSON.stringify(json);
    }

    createSkipMessage() {
        var json = <any>{};
        json.type = SKIP;
        return JSON.stringify(json);
    }

    createBackMessage() {
        var json = <any>{};
        json.type = BACK;
        return JSON.stringify(json);
    }
}

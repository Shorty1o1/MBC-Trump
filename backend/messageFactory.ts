export const SONG_REQUEST = "song_request";
export const RTT = "rtt";
export const PLAYER_DELAY = "player_delay";
export const PAUSE = "pause";
export const PLAY = "play";

export class MessageFactory {
    getMessage(message) {
        return JSON.parse(message);
    }

    createRTTMessage(messageObj) {
        return JSON.stringify(messageObj);
    }

    createPlayerDelayMessage(song : string) {
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

    createPlayMessage(src : string, time : number) {
        var json = <any>{};
        json.type = PLAY;
        json.source = src;
        json.time = time;
        return JSON.stringify(json);
    }
}
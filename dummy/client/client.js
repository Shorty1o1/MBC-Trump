var Client = function() {
    const INIT = "init";
    const SYNC = "sync";
    var server = window.location.hostname + ":" + window.location.port;
    var wsocket = new WSocket(server);
    var player = new Player();
    var messageFactory = new MessageFactory();
    var platform = new Platform();
    var source = null;
    var currentTime = 0;
    var self = this; // prevent scoping problems

    function init() {
        log("Client", "init Client");
        wsocket.addReceiveCallback(function(message) {
            mapMessages(message);
        });
        log("Client", "callback for receiving messages added");

        wsocket.addConnectionOpenCallback(function(event) {
            log("Client", "Connection to server established");
            var initMessage = messageFactory.createInitMessage();
            log("Client", "sending init to " + server);
            wsocket.send(initMessage);
            log("Client", "init message sent: " + initMessage);
        });
    }

    init();

    this.prepareMobile = function() {
        player.createPlayButton();
        player.addCallbackForPlayback(function() {
            startPlayback();
        });
        log("Client", "play button created");
    }

    this.startPlayback = function() {
        if (source) {
            player.createAudioElem();
            log("Client", "Audio element created");
            player.setSource(source);
            log("Client", "source set");
            player.setTime(currentTime);
            log("Client", "time set");
            player.start();
            log("Client", "playback is started");
        } else {
            log("Client", "no source is set");
        }
    }

    function mapMessages(message) {
        if (message.data) {
            log("Client", "Got message " + message.data);
            try {
                var messageObj = messageFactory.getMessage(message.data);
                switch (messageObj.type) {
                    case INIT:
                        log("Client", "INIT Message");
                        source = messageObj.source;
                        currentTime = messageObj.time;
                        self.startPlayback();
                        var syncMessage = messageFactory.createSyncMessage();
                        wsocket.send(syncMessage);
                        break;
                    case SYNC:
                        log("Client", "SYCN Message");
                        regulatePlayer(messageObj);
                        var syncMessage = messageFactory.createSyncMessage();
                        wsocket.send(syncMessage);
                        break;
                    default:
                        log("Client", "Message type not supported");
                }
            } catch (err) {
                log("Client", err);
            }
        } else {
            log("Client", "No data in this message available");
        }
    }

    function regulatePlayer(message) {
        //OF TODO skip, set source etc..

        //OF refactor this...
        var audioTime = currentTime;
        var time = message.time;
        log("Client", "server time: " + time);
        log("Client", "client time: " + audioTime);
        var diff = time - audioTime;
        log("Client", "diff: " + diff);
        var ms = diff * 1000;
        log("Client", "ms: " + ms);
        if (ms > 80 && !platform.isAndroid()) {
            currentTime = time;
            player.setTime(currentTime);
            log("Client", "corrected time");
        }

        if (platform.isAndroid() && ms > 100) {
            currentTime = time + (24 / 1000);
            player.setTime(currentTime);

            //OF this was for logging
            // var logText = document.getElementById("myText");
            // logText.innerHTML += ms + "\n";
        }
    }
}

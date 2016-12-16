var Client = function() {
    const INIT = "init";
    const SYNC = "sync";
    const PLAY = "play";
    var server = window.location.hostname + ":" + window.location.port;
    var wsocket = new WSocket(server);
    var player = new Player();
    var messageFactory = new MessageFactory();
    var platform = new Platform();
    var source = null;
    var self = this; // prevent scoping problems

    function initWSocket() {
        log("Client", "init Client");
        wsocket.addReceiveCallback(function(message) {
            handleMessages(message);
        });
        log("Client", "callback for receiving messages added");

        wsocket.addConnectionOpenCallback(function(event) {
            log("Client", "Connection to server established");
            sendInit();
            log("Client", "init message sent");
        });
    }

    this.initClient = function() {
        initWSocket();
    }

    function initAudio(src, time) {
        player.createAudioElem();
        log("Client", "Audio element created");

        player.createPlayButton();
        log("Client", "Play button created");

        player.createPauseButton();
        log("Client", "Pause button created");

        player.setSource(src);
        log("Client", "source is set");

        player.setTime(time);
        log("Client", "time is set");

        player.addCallbackForPlayback(function() {
            self.startPlayback();
        });

        player.addCallbackForPause(function() {
            self.pause();
        });

        log("Client", "play button created");

    }

    this.startPlayback = function() {
        player.start();
        sendSync();
        log("Client", "playback is started");
    }

    this.pause = function() {
        player.pause();
        log("Client", "music is paused");
    }

    function handleMessages(message) {
        if (message.data) {
            log("Client", "Got message " + message.data);
            try {
                var messageObj = messageFactory.getMessage(message.data);
                switch (messageObj.type) {
                    case INIT:
                        handleInitMessage(messageObj);
                        break;
                    case SYNC:
                        handleSyncMessage(messageObj);
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

    function handleInitMessage(messageObj) {
        log("Client", "INIT Message");
        initAudio(messageObj.source, messageObj.time);
    }

    function handleSyncMessage(messageObj) {
        log("Client", "SYCN Message");
        if (player.getState() === PLAY) {
            syncPlayer(messageObj);
            sendSync();
        }
    }

    function sendSync() {
        var syncMessage = messageFactory.createSyncMessage();
        wsocket.send(syncMessage);
    }

    function sendInit() {
        var initMessage = messageFactory.createInitMessage();
        wsocket.send(initMessage);
    }

    function logAndroid(message) {
        document.body.innerHTML += message + "\n";
    }

    function syncPlayer(messageObj) {
        //OF refactor this...
        var clientTime = player.getCurrentTime();
        var serverTime = messageObj.time;

        log(clientTime + " - Client");
        log(serverTime + " - Server");

        var diff = serverTime - clientTime;

        var ms = diff * 1000;

        if (ms > 80) {
            player.setTime(serverTime);
        }


    }
}

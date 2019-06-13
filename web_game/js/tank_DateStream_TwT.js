'use strict';
var domain = document.domain;
var wsUri = "ws://" + domain + ":12346";
var socket;

function ConnectToServer() {
    socket = new ReconnectingWebSocket(wsUri);
    socket.onclose = function () {
        console.error("web channel closed");
    };
    socket.onopen = function (error) {
        console.error("web channel open: " + error);
    };
    socket.onerror = function (error) {
        console.error("web channel error: " + error);
        // setConnectError(error);
    };
    socket.onopen = function () {
        console.log("web channel open");
        window.channel = new QWebChannel(socket, function (channel) {
            channel.objects.TankGameServer.ShowUserMessage.connect(function (message) {
                ReceiveByServer(message);
            });
        });
    }
}

function SendMessageToServer(message) {
    try {
        channel.objects.TankGameServer.SendUserMessage(message);
    } catch (e) {
        // errorInfo(e);
    }
}
'use strict';
var domain = document.domain;
var wsUri = "ws://" + domain + ":12345";
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
        setConnectError(error);
    };
    socket.onopen = function () {
        console.log("web channel open");
        connectSuccess();
        window.channel = new QWebChannel(socket, function (channel) {
            channel.objects.ChatServer.ForwardUserMessageToBrowser.connect(function (message) {
                //console.log(message);
                var json = JSON.parse(message);
                AddUserMessageFromServer('../UserFavicon/' + json.UserFaviconID + '.svg', json.UserName, json.MessageContent);
            });
        });
    }
}

function UserSendMessageToServer(message) {
    try {
        channel.objects.ChatUser.UserSendMessage(message, function (value) { });
    } catch (e) {
        errorInfo(e);
    }
}
/*
function UpladFile() {
    var file = document.getElementById("filess").files[0];
    var reader = new FileReader();
    channel.objects.chatserver1.filename(file.name);
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
        var fileString = evt.target.result;
        var a1 = document.getElementById("aa")
        a1.innerHTML = fileString;
        setTimeout(function () {
            channel.objects.chatserver1.fileByte(fileString);
        }, 1000);

    }
}
function DownFile() {
    var input = document.getElementById("input1");
    var text = input.value;
    var a = document.getElementById("down");
    a.href = "/file/" + text;
    a.download = text;
    var output = document.getElementById("output");
    output.innerHTML = output.innerHTML +"set file ok!!!" + "\n";
}*/
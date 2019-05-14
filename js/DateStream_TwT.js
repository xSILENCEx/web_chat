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
            channel.objects.ChatUser.ShowUserMessage.connect(function (self, type, message) {
                var jsonArray = eval(message)
                ReceiveByServer(self, type, '../UserFavicon/' + jsonArray[0].UserID + '.svg', jsonArray[0].UserName, jsonArray[1].MessageContent);
            });
            channel.objects.ChatUser.ShowUserList.connect(function (userList) {
                console.log(userList);
                logInfo(userList);
            });
        });
    }
}
//������Ϣ:type��ʾ��Ϣ����,1Ϊ�ı���Ϣ.
function SendMessageToServer(type, message) {
    try {


        channel.objects.ChatUser.SendUserMessage(type, message, function (value) {});
    } catch (e) {
        errorInfo(e);
    }
}

function UserRegister(name, password) {
    try {
        channel.objects.ChatUser.UserRegister(name, password, function (value) {});
    } catch (e) {
        errorInfo(e);
    }
}

function UserLogin(name, password) {
    try {
        channel.objects.ChatUser.UserLogin(name, password, function (value) {});
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
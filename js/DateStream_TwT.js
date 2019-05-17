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
            channel.objects.ChatUser.ShowUserMessage.connect(function (self,message) {
                //console.log(self);
                console.log(message);
                var jsonArray = JSON.parse(message);
                switch (jsonArray[1].MessageType) {
                    case 1:
                        ReceiveByServer(self, '../UserFavicon/' + jsonArray[0].UserID + '.svg', jsonArray[0].UserName, jsonArray[1].MessageContent);
                        break;
                    case 2:
                        ReceiveByServer(self, '../UserFavicon/' + jsonArray[0].UserID + '.svg', jsonArray[0].UserName, '<img src="../File/' + jsonArray[1].MessageContent + '"/>');
                        break;
                    case 3:
                        ReceiveByServer(self, '../UserFavicon/' + jsonArray[0].UserID + '.svg', jsonArray[0].UserName, '<a href="../File/' + jsonArray[1].MessageContent + '">' + jsonArray[1].MessageContent + '</a>');
                        break;
                }
            });
            channel.objects.ChatUser.ShowServerTips.connect(function (type, tipscontent) {
                openTips(type, tipscontent);
            });
            channel.objects.ChatUser.ShowUserInfo.connect(function (userinfo) {
                console.log(userinfo);
            });
            channel.objects.ChatUser.ShowUserList.connect(function (userList) {
                logInfo(userList);
            });
        });
    }
}

function SendMessageToServer(type, message) {
    try {
        //console.log(message)
        channel.objects.ChatUser.SendUserMessage(type, message, function (value) { });
    } catch (e) {
        errorInfo(e);
    }
}

function UserRegister(name, password) {
    try {
        channel.objects.ChatUser.UserRegister(name, password, function (value) { });
    } catch (e) {
        errorInfo(e);
    }
}

function UserLogin(name, password) {
    try {
        channel.objects.ChatUser.UserLogin(name, password, function (value) { });
    } catch (e) {
        errorInfo(e);
    }
}
function ServerTips(type) {
  
}
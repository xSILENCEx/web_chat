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
            channel.objects.ChatUser.ShowUserMessage.connect(function (self, message) {
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
            channel.objects.ChatUser.ShowServerTips.connect(function (type, tipsContent) {
                if (tipsContent == "注册成功!") {
                    regInfo(tipsContent);
                }
                openTips(type, tipsContent);
            });
            channel.objects.ChatUser.ShowUserInfo.connect(function (userInfo) {
                logInfo(userInfo);
            });
            channel.objects.ChatUser.ShowUserList.connect(function (userList) {
                refreshUserList(userList);
            });

            if (checkCookie("username") != "" && checkCookie("password") != "") {
                UserLogin(getCookie("username"), getCookie("password"));
                isLogin = true;
            }
        });
    }
}

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
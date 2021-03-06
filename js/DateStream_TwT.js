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
            channel.objects.ChatUser.ShowUserMessage.connect(function (self, message, toID) {
                var jsonArray = JSON.parse(message);
                var t = jsonArray[1].MessageType;
                switch (t) {
                    case 1:
                        ReceiveByServer(t, self, '../UserFavicon/' + jsonArray[0].UserFavicon + "/" + Math.random(), jsonArray[0].UserName, jsonArray[1].MessageContent, toID);
                        break;
                    case 2:
                        ReceiveByServer(t, self, '../UserFavicon/' + jsonArray[0].UserFavicon + "/" + Math.random(), jsonArray[0].UserName, '<img width=100% height=auto src="../File/' + jsonArray[1].MessageContent + '"/>', toID);
                        break;
                    case 3:
                        ReceiveByServer(t, self, '../UserFavicon/' + jsonArray[0].UserFavicon + "/" + Math.random(), jsonArray[0].UserName, createFileBox(jsonArray[1].MessageContent, jsonArray[1].MessageTime), toID);
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

function SendMessageToServer(type, message, toId = 0) {
    try {
        channel.objects.ChatUser.SendUserMessage(type, message, toId, function (value) {});
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

function UserSignOut() {
    console.log("用户注销");
    try {
        channel.objects.ChatUser.UserLogout(function (value) {});
    } catch (e) {
        errorInfo(e);
    }
}

function changeHead(fileString) {
    try {
        channel.objects.ChatUser.UserChangeFavicon(fileString, function (value) {
            refreshHead('../UserFavicon/' + value + "/" + Math.random());
        });
    } catch (e) {
        errorInfo(e);
    }
}

function changeUserInfo(userName, userSign) {
    console.log("用户修改信息");
    try {
        channel.objects.ChatUser.UserChangeInfo(userName, userSign, function (value) {});
    } catch (e) {
        errorInfo(e);
    }
}

function changePsw(oldPsw, newPsw) {
    console.log("用户修改密码");
    console.log(oldPsw);
    console.log(newPsw);
    try {
        channel.objects.ChatUser.UserChangePassword(oldPsw, newPsw, function (value) {});
    } catch (e) {
        errorInfo(e);
    }

}

function createFileBox(url, time) {

    let b = '<a target="_blank" class="new-file" href="../File/' + url + '"><img src="../img/fileICO.png" class="file-ico"><div class="file-name">' + url + '</div><div class="file-time">发送时间: ' + time + '</div></a>';

    return b;
}
//////加载完成后的动作
onload = function () {

    ////////连接到服务器
    ConnectToServer();

    //////屏幕大小是否合适并作相应反馈
    softWindow();

    /////自动发送系统提示信息
    leftSend("../img/system.svg", "系统提示", "欢迎使用简聊Web！试试左滑右滑~<br>Ctrl+Enter发送消息，点击logo打开左边栏(大屏幕忽略此条)。");

}

/////////接收来自服务器的消息
function ReceiveByServer(self, type, head, name, msg) {
    if (type == 1) {
        if (self) {
            rightSend(head, name, msg);
        } else {
            leftSend(head, name, msg);
        }
    }
}

/////弹出提示信息，支持富文本
function openTips(type, content) {
    var tips = document.getElementById("tips");
    tips.style.transform = "scale(1.0)";
    tips.style.opacity = "1.0";
    setTimeout(function () {
        tips.style.backgroundColor = "rgba(0,0,0,0.5)";
    }, 500);
    putInfo(type, content);
}

/////刷新用户列表
function refreshUserList() {
    console.log("刷新用户列表");
}

/////////登录成功后调用此方法
function logInfo(info) { ///////传入一个json字符串数组，包含所有用户的所有信息
    console.log("返回信息:" + info);
    closeRegLogBox();
    isLogBoxOpen = false;
}

////文件发送
document.getElementById("file-box").onclick = function () {
    console.log("文件发送暂未开放");
    openTips(1, "文件发送暂未开放");
}

/////图片选择与发送
document.getElementById("pic-box").onclick = function () {
    console.log("图片发送暂未开放");
    openTips(1, "图片发送暂未开放");
}

/////选择头像时调用此方法
function choosePic() {
    console.log("选择头像");
}

//点击登录注册按钮
document.getElementById("logBtn").addEventListener("click", function (e) {
    if (this.value == "确认登录") {
        console.log("用户名 : " + getUserName() + "\n" + "密码 : " + getPsw());
        UserLogin(getUserName(), getPsw());
    } else {
        console.log("用户名 : " + getUserName() + "\n" + "密码 : " + getPsw());
        if (checkPsw()) {
            UserRegister(getUserName(), getPsw());
        } else {
            console.log("密码不一致");
        }
    }
    e.stopPropagation();
});

/////获取服务器端口信息
document.getElementById("net-submit").addEventListener("click", function () {
    console.log(getServerInfo());
});
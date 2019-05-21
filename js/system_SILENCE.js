//////加载完成后的动作
onload = function () {

    ////////连接到服务器
    ConnectToServer();

    //////屏幕大小是否合适并作相应反馈
    softWindow();

    /////自动发送系统提示信息
    leftSend("../img/system.svg", "系统提示", "欢迎使用简聊Web！试试左滑右滑~<br>Ctrl+Enter发送消息，点击logo打开左边栏(大屏幕忽略此条)。");

}

function setCookie(cname, cValue, exDays) { //设置cookie
    var d = new Date();
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cValue + "; " + expires;
}

function getCookie(cname) { //获取cookie
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie(value) { //检查cookie
    var v = getCookie(value);
    if (v != "") {
        return true;
    } else {
        return false;
    }
}

/////////接收来自服务器的消息
function ReceiveByServer(self, head, name, msg) {
    if (self) {
        rightSend(head, name, msg);
    } else {
        leftSend(head, name, msg);
    }
}

/////弹出提示信息，支持富文本
function openTips(type, content) { //type:1提示，2警告，3错误
    var tips = document.getElementById("tips");
    tips.style.transform = "scale(1.0)";
    tips.style.opacity = "1.0";
    setTimeout(function () {
        tips.style.backgroundColor = "rgba(0,0,0,0.5)";
    }, 500);
    putInfo(type, content);
}

/////刷新用户列表
function refreshUserList(info) {
    var user = JSON.parse(info);
    var userCount = user[0].loginUserSize;
    var list = document.getElementById("userList");
    list.innerHTML = "<p class=\"menu-title\" style=\"margin-bottom: 0px;font-size: 90%\">在线用户列表</p>";
    for (var i = 1; i <= userCount; i++) {
        var sign = user[i].UserProfile == "" ? "这个人什么都没留下" : user[i].UserProfile;
        addUserItem(list, user[i].UserName, sign, "/img/def-boy.svg");
    }
}

/////////登录成功后调用此方法
function logInfo(info) { ///////传入一个json字符串数组，包含用户的所有信息
    changeMyInfo(JSON.parse(info));
    isLogin = true;

    closeRegLogBox();
    isLogBoxOpen = false;

    var h = document.getElementById("myHead");
    h.removeEventListener("click", openRegLogBox);
    h.addEventListener("click", function (e) {
        openUser();
    });

    if (getUserName() || getPsw()) {
        setCookie("username", getUserName(), 1 / 24 / 60);
        setCookie("password", getPsw(), 1 / 24 / 60);
    }


    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("checkPsw").value = "";
}

/////////注册成功后调用此方法
function regInfo(info) { ///////传入一个json字符串数组，包含用户的所有信息
    console.log("返回信息:" + info);
    document.getElementById("checkPsw").value = "";
    changeToLog();
}

/////////注销后调用此方法
function unSign() {
    isLogin = false;
    setCookie("username", "", 100);
    setCookie("password", "", 100);
}

////文件发送
document.getElementById("file-box").onclick = function () {
    document.getElementById("files2").click();
}
document.getElementById("files2").onchange = function () {

    var file = document.getElementById("files2").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
        setTimeout(function () {
            var jsonObject = {}
            jsonObject.filename = file.name;
            jsonObject.file = evt.target.result;
            SendMessageToServer(3, JSON.stringify(jsonObject))
        }, 1000);
    }
    document.getElementById("files2").value = "";
}

/////图片选择与发送
document.getElementById("pic-box").onclick = function () {
    document.getElementById("files1").click();
}
document.getElementById("files1").onchange = function () {
    var file = document.getElementById("files1").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
        setTimeout(function () {
            var jsonObject = {}
            jsonObject.filename = file.name;
            jsonObject.file = evt.target.result;
            SendMessageToServer(2, JSON.stringify(jsonObject))
        }, 1000);

    }
    document.getElementById("files1").value = "";
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
            openTips(3, "密码不一致");
        }
    }
    e.stopPropagation();
});

/////获取服务器端口信息
document.getElementById("net-submit").addEventListener("click", function () {
    console.log(getServerInfo());
});
//////加载完成后的动作
onload = function () {

    ////////连接到服务器
    ConnectToServer();

    //////屏幕大小是否合适并作相应反馈
    softWindow();

    /////自动发送系统提示信息
    leftSend("../img/system.svg", "系统提示", "欢迎使用简聊Web！试试左滑右滑~<br>Ctrl+Enter发送消息，点击logo打开左边栏(大屏幕忽略此条)。");

}

function setEditState(state) {
    let editBox = document.getElementById("edit");
    if (state) {
        editBox.removeAttribute("disabled");
        editBox.setAttribute("placeholder", "在这里输入消息");
    } else {
        editBox.setAttribute("disabled", "disabled");
        editBox.setAttribute("placeholder", "登陆后才能发送消息");
    }
}

function setCookie(cName, cValue, exDays) { //设置cookie
    let d = new Date();
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cName + "=" + cValue + "; " + expires;
}

function getCookie(cName) { //获取cookie
    let name = cName + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie(value) { //检查cookie
    let v = getCookie(value);
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
    let tips = document.getElementById("tips");
    tips.style.transform = "scale(1.0)";
    tips.style.opacity = "1.0";
    setTimeout(function () {
        tips.style.backgroundColor = "rgba(0,0,0,0.5)";
    }, 500);
    putInfo(type, content);
}

/////刷新用户列表
function refreshUserList(info) {
    let user = JSON.parse(info);
    let userCount = user[0].loginUserSize;
    let list = document.getElementById("userList");
    list.innerHTML = "<p class=\"menu-title2\" style=\"margin: 0;font-size: 90%\">在线用户</p>";
    addUserItem(list, user[0].VisitorName, "游客数量:" + user[0].VisitorSize, "/img/def-boy.svg", user[0]);
    for (let i = 1; i <= userCount; i++) {
        let sign = user[i].UserProfile == "" ? "这个人什么都没留下" : user[i].UserProfile;
        addUserItem(list, user[i].UserName, sign, "/img/def-boy.svg", user[i]);
    }
}

/////////登录成功后调用此方法
function logInfo(info) { ///////传入一个json字符串数组，包含用户的所有信息
    let json = JSON.parse(info);
    changeMyInfo(json);
    isLogin = true;
    setEditState(true);
    closeRegLogBox();
    isLogBoxOpen = false;

    if (getUserName() && getPsw()) {
        setCookie("username", getUserName(), 10 / 24 / 60);
        setCookie("password", getPsw(), 10 / 24 / 60);
        setCookie("userID", json.UserID, 10 / 24 / 60);
        setCookie("userHeadUrl", '../UserFavicon/' + json.UserFavicon, 10 / 24 / 60);
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
function signOut() {
    let info = "{\"UserID\": -1,\"UserName\": \"游客\",\"UserProfile\": \"\"}"
    changeMyInfo(JSON.parse(info));

    setCookie("username", "", 100);
    setCookie("password", "", 100);
    setCookie("userID", "", 100);
    setCookie("userHeadUrl", "", 100);

    closeRight();
    isRightOpen = false;

    isLogin = false;
}

////文件发送
document.getElementById("file-box").onclick = function () {
    document.getElementById("files2").click();
}
document.getElementById("files2").onchange = function () {

    let file = document.getElementById("files2").files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
        setTimeout(function () {
            let jsonObject = {}
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
    let file = document.getElementById("files1").files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (evt) {
        setTimeout(function () {
            let jsonObject = {}
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
        UserLogin(getUserName(), getPsw());
    } else {
        if (checkPsw()) {
            UserRegister(getUserName(), getPsw());
        } else {
            openTips(3, "密码不一致");
        }
    }
    e.stopPropagation();
});

/////获取服务器端口信息
document.getElementById("newPswSet").addEventListener("click", function () {
    console.log(getNewPswInfo());
});
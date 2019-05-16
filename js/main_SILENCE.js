///////清空输入框
function clearEdit() {
    var edit = document.getElementById("edit");
    edit.value = "";
    edit.focus();
}

///////获取输入框内容
function getEdit() {
    return document.getElementById("edit").value;
}

//////显示左边的消息
function leftSend(head, name, msg) {
    var newMsg = document.createElement("div");
    newMsg.setAttribute("class", "msg-item");

    var h = document.createElement("img");
    h.setAttribute("class", "head-img");
    h.setAttribute("src", head);

    var lName = document.createElement("div");
    lName.setAttribute("class", "user-name");
    lName.innerHTML = name;

    var lMsg = document.createElement("div");
    lMsg.setAttribute("class", "msg-box dot-c");
    lMsg.innerHTML = msg;

    newMsg.appendChild(h);
    newMsg.appendChild(lName);
    newMsg.appendChild(lMsg);

    var chatBox = document.getElementById("chatBox");
    chatBox.appendChild(newMsg);
    scrollToBottom(newMsg);
}

////////显示右边的消息
function rightSend(head, name, msg) {
    var newMsg = document.createElement("div");
    newMsg.setAttribute("class", "msg-item");

    var h = document.createElement("img");
    h.setAttribute("class", "head-img2");
    h.setAttribute("src", head);

    var lName = document.createElement("div");
    lName.setAttribute("class", "user-name2");
    lName.innerHTML = name;

    var lMsg = document.createElement("div");
    lMsg.setAttribute("class", "msg-box2 theme");
    lMsg.innerHTML = msg;

    newMsg.appendChild(h);
    newMsg.appendChild(lName);
    newMsg.appendChild(lMsg);

    var chatBox = document.getElementById("chatBox");
    chatBox.appendChild(newMsg);
    scrollToBottom(newMsg);
}

//////////当前用户发送消息的动作
function meSend(msg) {
    ///清空键值
    event.keyCode = 0;
    event.returnValue = false;
    if (msg.length != 0) {
        ///向服务器发送消息
        SendMessageToServer(1, getEdit());
        clearEdit();
    } else {
        console.log("内容为空");
    }
}

/////////接收来自服务器的消息，复制原rightSend(head, name)函数
function ReceiveByServer(self, type, head, name, msg) {
    if (type == 1) {
        if (self) {
            rightSend(head, name, msg);
        } else {
            leftSend(head, name, msg);
        }
    }
}

///////点击发送按钮
document.getElementById("send").onmousedown = function () {
    meSend(getEdit());
}

//////点击侧边栏之外的地方关闭侧边栏
document.getElementById("whole").addEventListener("click", function () {
    if (isSmall()) {
        if (isLeftOpen) {
            closeLeft();
            isLeftOpen = false;
        }
        if (isRightOpen) {
            closeRight();
            isRightOpen = false;
        }
    }
});
//////Ctrl+Enter键发送
document.onkeydown = function (e) {
    var isEditing = document.getElementById("edit");
    if ((13 == e.keyCode && e.ctrlKey) && isEditing == document.activeElement) {
        meSend(getEdit());
    }
}
///////手势判断
var startPoint = null;
document.addEventListener("touchstart", function (e) {
    var e = e || window.event;
    startPoint = e.touches[0];
});
document.addEventListener("touchmove", function (e) {
    var e = e || window.event;
    //e.changedTouches能找到离开手机的手指，返回的是一个数组
    var endPoint = e.changedTouches[0];
    //计算终点与起点的差值
    var x = endPoint.clientX - startPoint.clientX;
    var y = endPoint.clientY - startPoint.clientY;

    var d = 80; //滑动距离的参考值
    if (Math.abs(x) > d && (!isLogBoxOpen)) {
        if (x > 0 && isSmall()) {
            if (isRightOpen) {
                closeRight();
                isRightOpen = false;
            } else {
                openLeft();
                isLeftOpen = true;
            }
            var e = e || window.event;
            startPoint = e.touches[0];
        } else if (isSmall()) {
            if (isLeftOpen) {
                closeLeft();
                isLeftOpen = false;
            } else {
                openRight();
                isRightOpen = true;
            }

            var e = e || window.event;
            startPoint = e.touches[0];
        }
    }
});
//////加载完成后的动作
onload = function () {

    ////////连接到服务器
    ConnectToServer();

    //////屏幕大小是否合适并作相应反馈
    if (isSmall()) {
        smallScreen();
    } else {
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        bigScreen(w);
    }

    /////自动发送系统提示信息
    leftSend("../img/system.svg", "系统提示", "欢迎使用简聊Web！试试左滑右滑~<br>Ctrl+Enter发送消息，点击logo打开左边栏(大屏幕忽略此条)。");

}

//////设置//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var isRightOpen = false; //右边栏(设置)是否打开

////打开右边栏
function openRight() {
    document.getElementById("rightMenu").style.transform = "translateX(0px)";
    document.getElementById("whole").style.transform = "translateX(-200px)";
}

/////关闭右边栏
function closeRight() {
    document.getElementById("rightMenu").style.transform = "translateX(300px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
    closeNetSet();
    closeAbout();
    closeUser();
}

function openUser() {
    document.getElementById("user-setting-menu").style.transform = "translateX(-300px)";
}

function closeUser() {
    document.getElementById("user-setting-menu").style.transform = "translateX(0px)";
}

function openNetSet() {
    document.getElementById("net-menu").style.transform = "translateX(-300px)";
}

function closeNetSet() {
    document.getElementById("net-menu").style.transform = "translateX(0px)";
}

function getServer() {
    return document.getElementById("server-ip").value;
}

function getPort() {
    return document.getElementById("server-port").value;
}

function openAbout() {
    document.getElementById("about-menu").style.transform = "translateX(-300px)";
}

function closeAbout() {
    document.getElementById("about-menu").style.transform = "translateX(0px)";
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

function putInfo(type, content) {
    var tipsBody = document.getElementById("tipsBody");
    var tipsTitle = document.getElementById("tipsTitle");
    var tipsContent = document.getElementById("tipsContent");

    switch (type) {
        case 1:
            tipsTitle.innerHTML = "提示";
            break;
        case 2:
            tipsTitle.innerHTML = "警告";
            break;
        case 3:
            tipsTitle.innerHTML = "错误";
            break;
    }

    tipsContent.innerHTML = content;
    var tipsHeight = tipsBody.clientHeight || tipsBody.offsetHeight;
    tipsBody.style.marginTop = "-" + tipsHeight / 2 + "px";
}

function closeTips() {
    var tips = document.getElementById("tips");
    tips.style.opacity = "0.0";
    tips.style.transform = "scale(1.2)";
    setTimeout(function () {
        tips.style.backgroundColor = "rgba(0,0,0,0.0)";
        tips.style.transform = "scale(0.0)";
    }, 500);
}



var isSetItemOpen = false;

function openCloseSetting() {
    var setItemBox = document.getElementById("setItemBox");

    if (isSetItemOpen) {
        document.getElementById("settingBtn").style.color = "rgba(100, 100, 100, 0.00)";
        document.getElementById("userList").style.transform = "translateY(0px)";
        setItemBox.style.transform = "scale(0.1) translateY(0px)";
        setItemBox.style.right = "25px";
    } else {
        document.getElementById("settingBtn").style.color = "rgba(100, 100, 100, 1.00)";
        document.getElementById("userList").style.transform = "translateY(280px)";
        setItemBox.style.transform = "scale(1.0) translateY(80px)";
        setItemBox.style.right = "20px";
    }
    isSetItemOpen = !isSetItemOpen;
}

/////点击设置打开右侧栏
document.getElementById("setBtn").addEventListener("click", function (event) {
    if (isRightOpen && isSmall()) {
        closeRight();
        isRightOpen = false;
    } else if (isSmall()) {
        if (isLeftOpen) {
            closeLeft();
            isLeftOpen = false;
        }
        openRight();
        isRightOpen = true;
    }
    event.stopPropagation();
});

//////用户设置
document.getElementById("usr-settings").addEventListener("click", function () {
    openUser();
});

document.getElementById("closeUserMenu").addEventListener("click", function () {
    closeUser();
});

////网络设置
document.getElementById("net-settings").addEventListener("click", function (e) {
    openNetSet();
});

document.getElementById("closeNet").addEventListener("click", function (e) {
    closeNetSet();
});

/////获取服务器端口信息
document.getElementById("net-submit").addEventListener("click", function () {
    console.log("服务器IP:" + getServer() + "\n" + "端口:" + getPort());
});

//////关于
document.getElementById("about").addEventListener("click", function (e) {
    openAbout();
});

document.getElementById("closeAbout").addEventListener("click", function (e) {
    closeAbout();
});

document.getElementById("tipsBtn").addEventListener("click", function () {
    closeTips();
});

document.getElementById("settingBtn").addEventListener("click", function () {
    openCloseSetting();
});

///////聊天列表//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var isLeftOpen = false; //左边栏是否打开

//打开左边栏
function openLeft() {
    document.getElementById("leftMenu").style.transform = "translateX(0px)";
    document.getElementById("whole").style.transform = "translateX(200px)";
}

//关闭左边栏
function closeLeft() {
    document.getElementById("leftMenu").style.transform = "translateX(-300px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
}

function refreshUserList() {

}

function addUserItem(name, info, lastMsg) {
    var userItem = document.createElement("div");
    userItem.setAttribute("class", "user-list-item");

    var userHead = document.createElement("img");
    userHea.setAttribute("alt", "#");
    userHead.setAttribute("src", lastMsg);
    userHead.setAttribute("class", "user-list-head");

    var userName = document.createElement("div");
    userName.setAttribute("class", "user-list-name");
    userName.innerHTML = name;

    var userInfo = document.createElement("div");
    userInfo.setAttribute("class", "user-list-info");
    userInfo.innerHTML = info;

    userItem.appendChild(userHead);
    userItem.appendChild(userName);
    userItem.appendChild(userInfo);

    document.getElementById("userList").appendChild(userItem);
}

//////点击logo打开左侧栏
document.getElementById("logo").addEventListener("click", function (event) {
    if (isLeftOpen && isSmall()) {
        closeLeft();
        isLeftOpen = false;
    } else if (isSmall()) {
        if (isRightOpen) {
            closeRight();
            isRightOpen = false;
        }
        openLeft();
        isLeftOpen = true;
    } else {
        window.location.reload;
    }
    event.stopPropagation();
});

//////登录////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var isLogBoxOpen = false;
var regOrLog = false;

document.getElementById("myHead").addEventListener("click", function (e) {
    openRegLogBox();
});

document.getElementById("logBtn").addEventListener("click", function (e) {
    if (this.value == "确认登录") {
        console.log("用户名 : " + getUserName() + "\n" + "密码 : " + getPsw());
        UserLogin(getUserName(), getPsw());
    } else {
        console.log("用户名 : " + getUserName() + "\n" + "密码 : " + getPsw());
        UserRegister(getUserName(), getPsw());
    }
    e.stopPropagation();
});

document.getElementById("regBtn").addEventListener("click", function (e) {
    if (this.value == "注册账号") {
        changeToReg();
    } else {
        changeToLog();
    }
    e.stopPropagation();
});

document.getElementById("closeLogBox").addEventListener("click", function (e) {
    closeRegLogBox();
    e.stopPropagation();
});

document.getElementById("checkPsw").addEventListener("focus", function (e) {
    this.style.transform = "scale(1.1)";
    e.stopPropagation();
});
document.getElementById("checkPsw").addEventListener("blur", function (e) {
    this.style.transform = "scale(1.0)";
    e.stopPropagation();
});
document.getElementById("logHead").addEventListener("click", function (e) {
    console.log("选择头像");
    e.stopPropagation();
});

document.getElementById("lrMain").addEventListener("click", function (e) {
    e.stopPropagation();
});

document.getElementById("logRegBox").addEventListener("click", function (e) {
    closeRegLogBox();
    e.stopPropagation();
});

/////////登录成功后调用此方法
function logInfo(info) { ///////传入一个json字符串，包含所有用户的所有信息
    console.log("返回信息:" + info);
}

/////////注销时调用次方法
function signOut() {
    console.log("注销成功");
}

/////////打开登陆注册框
function openRegLogBox() {
    if (!isLogBoxOpen) {
        var rBox = document.getElementById("logRegBox");
        rBox.style.transform = "scale(1.0)";
        rBox.style.opacity = "1.0";
        setTimeout(function (e) {
            rBox.style.backgroundColor = "rgba(0,0,0,0.50)";
        }, 500);
        isLogBoxOpen = true;
        if (isSmall()) {
            closeRight();
            isRightOpen = false;
        }
    }

}

/////关闭登录注册框
function closeRegLogBox() {
    if (isLogBoxOpen) {
        var rBox = document.getElementById("logRegBox");
        rBox.style.backgroundColor = "rgba(0,0,0,0.00)";
        rBox.style.opacity = "0.0";
        setTimeout(function () {
            rBox.style.transform = "scale(0.0)";
        }, 500);
        isLogBoxOpen = false;
    }

}


//////切换到登录模式
function changeToLog() {
    var l = document.getElementById("logBtn");
    var r = document.getElementById("regBtn");
    document.getElementById("checkPsw").style.transform = "scale(0)";
    l.style.transform = "translateY(-50px)";
    r.style.transform = "translateY(-50px)";
    document.getElementById("logTitle").innerHTML = "登录";
    l.value = "确认登录";
    r.value = "注册账号";
}


/////////切换到注册模式
function changeToReg() {
    var l = document.getElementById("logBtn");
    var r = document.getElementById("regBtn");
    document.getElementById("checkPsw").style.transform = "scale(1)";
    l.style.transform = "translateY(0px)";
    r.style.transform = "translateY(0px)";
    document.getElementById("logTitle").innerHTML = "注册";
    l.value = "确认注册";
    r.value = "用户登录";
}

//////////获取框中用户名
function getUserName() {
    var userName = document.getElementById("username").value;
    if (userName.replace(/\s+/g, "").length != 0) {
        return userName;
    } else {
        return "用户名不规范";
    }
}

////////获取框中密码
function getPsw() {
    var uPattern = /^[\w]{6,16}$/i;
    var passWd = document.getElementById("password").value;
    if (uPattern.test(passWd)) {
        return passWd;
    } else {
        return "密码不规范";
    }
}

//////判断两次密码是否相同
function checkPsw() {
    var p1 = document.getElementById("password").value;
    var p2 = document.getElementById("checkPsw").value;
    if (p1 == p2) {
        return true;
    } else {
        return false;
    }
}

////文件发送///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("file-box").onclick = function () {
    console.log("文件发送暂未开放");
    openTips(1, "文件发送暂未开放");
}

/////图片选择与发送/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("pic-box").onclick = function () {
    console.log("图片发送暂未开放");
    openTips(1, "图片发送暂未开放");
}

function choosePic() {
    console.log("选择头像");
}
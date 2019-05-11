onresize = function () {
    //屏幕大小是否合适
    if (isSmall()) {
        smallScreen();
    } else {
        bigScreen();
    }
}

//发送消息后滚动到底部
function scrollToBottom(obj) {
    obj.scrollIntoView({
        block: "start",
        behavior: "smooth"
    });
}

function isSmall() { //判断屏幕宽度是否大于2000
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 2000) return true;
    else return false;
}

function isHigher() { //判断屏幕高度是否大于1150
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (h > 1150) return true;
    else return false;
}

//屏幕足够宽时调用此方法
function bigScreen() {
    document.getElementById("reg-login").innerHTML = "<div style='font-size:16px'>一个简单的群聊网站<div>";
    openRight();
    openLeft();
    isRightOpen = true;
    isLeftOpen = true;
    document.getElementById("whole").style.transform = "translateX(0px)";
}

//小屏幕调用此方法
function smallScreen() {
    document.getElementById("reg-login").innerHTML = "设置";
    closeRight();
    closeLeft();
    isRightOpen = false;
    isLeftOpen = false;
}

//服务器连接失败的提示信息
function setConnectError(error) {
    var c = document.getElementById("connect");
    c.value = "无法连接到服务器";
    c.title = "无法连接到服务器";
    c.style.backgroundColor = "rgba(255, 120, 120, 1.00)";
}

//服务器断开后点击发送给予反馈
var isToasted = false;

function errorInfo(error) {
    var c = document.getElementById("connect");
    if (!isToasted) {
        c.style.backgroundColor = "rgba(255, 0, 0, 1.00)";
        c.style.transform = "scale(1.1)";
        isToasted = true;
    }
    setTimeout(function () {
        c.style.backgroundColor = "rgba(255, 120, 120, 1.00)";
        c.style.transform = "scale(1.0)";
        isToasted = false;
    }, 100);
}

//服务器连接成功的提示信息
function connectSuccess() {
    var c = document.getElementById("connect");
    c.value = "服务器连接成功";
    c.title = "已连接到服务器";
    c.style.backgroundColor = "rgba(118, 178, 74, 1.00)";
}
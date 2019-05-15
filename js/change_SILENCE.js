onresize = function () {
    ////////////////////////////////////////////////////////////////////////////////////屏幕大小是否合适
    if (isSmall()) {
        smallScreen();
    } else {
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        bigScreen(w);
    }
}

/////////////////////////////////////////////////////////////////////////////////////发送消息后滚动到底部
function scrollToBottom(obj) {
    obj.scrollIntoView({
        block: "start",
        behavior: "smooth"
    });
}

///////////////////////////////////////////////////////////////////////////////////判断屏幕宽度是否大于2000
function isSmall() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 2000) return true;
    else return false;
}

//////////////////////////////////////////////////////////////////////////////////判断屏幕高度是否大于1150
function isHigher() {
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (h > 1150) return true;
    else return false;
}

///////////////////////////////////////////////////////////////////////////////////////屏幕足够宽时调用此方法
function bigScreen(width) {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    document.getElementById("regLogin").innerHTML = "<div style='font-size:16px'>一个简单的群聊网站<div>";
    openRight();
    openLeft();
    isRightOpen = true;
    isLeftOpen = true;
    var d = (width - 2000) / 2;
    document.getElementById("rightMenu").style.transform = "translateX(-" + d + "px) translateY(160px)";
    document.getElementById("leftMenu").style.transform = "translateX(" + d + "px) translateY(160px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
}

//////////////////////////////////////////////////////////////////////////////////////////////////小屏幕调用此方法
function smallScreen() {
    document.getElementById("regLogin").innerHTML = "设置";
    closeRight();
    closeLeft();
    isRightOpen = false;
    isLeftOpen = false;
}

///////////////////////////////////////////////////////////////////////////////////////////////服务器连接失败的提示信息
function setConnectError(error) {
    var c = document.getElementById("connect");
    c.value = "无法连接到服务器";
    c.title = "无法连接到服务器";
    c.style.backgroundColor = "rgba(255, 120, 120, 1.00)";
}

/////////////////////////////////////////////////////////////////////////////////////////////服务器断开后点击发送给予反馈
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

///////////////////////////////////////////////////////////////////////////////////////////////服务器连接成功的提示信息
function connectSuccess() {
    var c = document.getElementById("connect");
    c.value = "服务器连接成功";
    c.title = "已连接到服务器";
    c.style.backgroundColor = "rgba(118, 178, 74, 1.00)";
}

var chatBox = document.getElementById("chatBox");
var isPress = false;
var barStartY = null;
var oldY = null;

document.getElementById("toolBar").addEventListener("mousedown", function (e) {
    startResize(e);
});

document.getElementById("toolBar").addEventListener("touchstart", function (e) {
    startResize(e);
});

document.addEventListener("mousemove", function (e) {
    reSizeEdit(e);
});

document.addEventListener("touchmove", function (e) {
    reSizeEdit(e);
});

document.addEventListener("mouseup", function (e) {
    isPress = false;
});

document.addEventListener("touchend", function (e) {
    isPress = false;
});

function startResize(e) {
    if (!isPress) {
        var e = e || window.event;
        barStartY = e.clientY || e.touches[0].clientY;
        oldY = parseInt(getComputedStyle(chatBox, null).getPropertyValue("bottom"));
        isPress = true;
    }
}

function reSizeEdit(e) {
    if (isPress) {
        var e = e || window.event;
        var limit = parseInt(getComputedStyle(chatBox, null).getPropertyValue("bottom"));
        var editBox = document.getElementById("editBox");
        var distance = oldY - ((e.clientY || e.changedTouches[0].clientY) - barStartY) + "px";

        chatBox.style.bottom = distance;
        editBox.style.height = distance;

        if (limit > 610) {
            chatBox.style.bottom = "600px";
            editBox.style.height = "600px";
            isPress = false;
        } else if (limit < 90) {
            chatBox.style.bottom = "100px";
            editBox.style.height = "100px";
            isPress = false;
        }
    }
}
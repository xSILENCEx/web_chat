//清空输入框
function clearEdit() {
    document.getElementById("edit").value = "";
    document.getElementById("edit").focus();
}

//获取输入框内容
function getEdit() {
    return document.getElementById("edit").value;
}

//发送消息后滚动到底部
function scrollToBottom(obj) {
    obj.scrollIntoView({
        block: "start",
        behavior: "smooth"
    });
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

function smallScreen() {
    document.getElementById("reg-login").innerHTML = "<div id='settings'>设置</div>";
    closeRight();
    closeLeft();
    isRightOpen = false;
    isLeftOpen = false;
}

//显示接收的消息
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

    var chatBox = document.getElementById("chat-box");
    chatBox.appendChild(newMsg);
    scrollToBottom(newMsg);
}
//当前用户发送消息
function rightSend(head, name) {
    //向服务器发送消息
    SendMessageToServer(getEdit());
    clearEdit();
}
//接收来自服务器的消息，复制原rightSend(head, name)函数
function ReceiveByServer(head, name, msg) {
    if (msg.length != 0) {
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

        var chatBox = document.getElementById("chat-box");
        chatBox.appendChild(newMsg);
        scrollToBottom(newMsg);
    }
}

onresize = function () {
    //屏幕大小是否合适
    if (isSmall()) {
        smallScreen();
    } else {
        bigScreen();
    }
}

var isLeftOpen = false; //左边栏是否打开
onload = function () {

    //连接到服务器
    ConnectToServer();

    //屏幕大小是否合适
    if (isSmall()) {
        smallScreen();
    } else {
        bigScreen();
    }

    //屏幕高度是否足以容纳备案信息
    if (!isHigher()) {
        document.getElementById("b-info").style.display = "none";
    }

    //点击发送按钮
    document.getElementById("send").onmousedown = function () {
        meSend();
    }
    //自动发送系统提示信息
    leftSend("../img/system.svg", "系统提示", "欢迎使用简聊Web！试试左滑右滑~<br>Ctrl+Enter发送消息，点击logo打开左边栏(大屏幕忽略此条)。");

    //点击logo打开左侧栏
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

    if (isSmall()) {
        //点击设置打开右侧栏
        document.getElementById("settings").addEventListener("click", function (event) {
            if (isRightOpen) {
                closeRight();
                isRightOpen = false;
            } else {
                if (isLeftOpen) {
                    closeLeft();
                    isLeftOpen = false;
                }
                openRight();
                isRightOpen = true;
            }
            event.stopPropagation();
        });
    }

    //点击侧边栏之外的地方关闭侧边栏
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

    //Ctrl+Enter键发送
    document.onkeydown = function (e) {
        var isEditing = document.getElementById("edit");
        if ((13 == e.keyCode && e.ctrlKey) && isEditing == document.activeElement) {
            meSend();
        }
    }

    //手势判断
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

}

//当前用户发送消息的动作
function meSend() {
    event.keyCode = 0;
    event.returnValue = false;
    rightSend('../img/def-boy.svg', '匿名游客');
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

function openLeft() { //打开左边栏
    document.getElementById("left-menu").style.transform = "translateX(0px)";
    document.getElementById("whole").style.transform = "translateX(200px)";
}

function closeLeft() { //关闭左边栏
    document.getElementById("left-menu").style.transform = "translateX(-300px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
}
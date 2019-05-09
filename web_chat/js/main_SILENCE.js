function clearEdit() {
    document.getElementById("edit").value = "";
    document.getElementById("edit").focus();
}

function getEdit() {
    return document.getElementById("edit").value;
}

function scrollToBottom(obj) {
    obj.scrollIntoView({
        block: "start",
        behavior: "smooth"
    });
}

function leftSend(head, name, msg) {
    var newMsg = document.createElement("div");
    newMsg.setAttribute("class", "msg-item");

    var h = document.createElement("img");
    h.setAttribute("class", "head-img");
    h.setAttribute("src", head);

    var hm = document.createElement("div");
    hm.setAttribute("class", "h-m");

    var lName = document.createElement("p");
    lName.setAttribute("class", "user-name");
    lName.appendChild(document.createTextNode(name));

    var lM = document.createElement("div");
    lM.setAttribute("class", "msg-l");

    var lMsg = document.createElement("p");
    lMsg.setAttribute("class", "msg-box");
    lMsg.innerHTML = msg;

    hm.appendChild(lName);
    hm.appendChild(lM);
    hm.appendChild(lMsg);

    newMsg.appendChild(h);
    newMsg.appendChild(hm);

    var chatBox = document.getElementById("chat-box");
    chatBox.appendChild(newMsg);
    scrollToBottom(lM);
}

function rightSend(head, name) {
    var msg = document.getElementById("edit").value;
    //向服务器发送消息
    UserSendMessageToServer(msg)
    clearEdit();
}
//接收来自服务器的消息，复制原rightSend(head, name)函数
function AddUserMessageFromServer(head, name, message) {
    var msg = message
    if (msg.length != 0) {
        var newMsg = document.createElement("div");
        newMsg.setAttribute("class", "msg-item");

        var h = document.createElement("img");
        h.setAttribute("class", "head-img2");
        h.setAttribute("src", head);

        var hm = document.createElement("div");
        hm.setAttribute("class", "h-m2");

        var lName = document.createElement("p");
        lName.setAttribute("class", "user-name");
        lName.appendChild(document.createTextNode(name));

        var lMsg = document.createElement("p");
        lMsg.setAttribute("class", "msg-box2");
        lMsg.innerHTML = msg;

        var lM = document.createElement("div");
        lM.setAttribute("class", "msg-r");

        hm.appendChild(lName);
        hm.appendChild(lM);
        hm.appendChild(lMsg);

        newMsg.appendChild(h);
        newMsg.appendChild(hm);

        var chatBox = document.getElementById("chat-box");
        chatBox.appendChild(newMsg);
        scrollToBottom(lM);
    }
}
onload = function () {

    //连接到服务器
    ConnectToServer();

    //屏幕大小是否合适
    if (isSmall()) {
        document.getElementById("reg-login").innerHTML = "<div id='settings'>设置</div>";
        document.getElementById("big-left").style.display = "none";
        document.getElementById("big-right").style.display = "none";
    } else {
        document.getElementById("reg-login").innerHTML = "<div style='font-size:16px'>一个简单的群聊网站<div>";
    }
    if (!isHigher()) {
        document.getElementById("b-info").style.display = "none";
    }

    var isLeftOpen = false; //左边栏是否打开
    var isRightOpen = false; //右边栏是否打开
    document.getElementById("send").onmousedown = function () {
        meSend();
    } //发送函数
    leftSend("../img/system.svg", "系统提示", "欢迎使用简聊Web！试试左滑右滑~<br>Ctrl+Enter发送消息，点击logo打开左边栏(大屏幕忽略此条)。"); //发送一条提示信息

    document.getElementById("logo").addEventListener("click", function (event) { //点击logo打开左侧栏
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
        document.getElementById("settings").addEventListener("click", function (event) { //点击设置打开右侧栏
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
    }
    //点击侧边栏之外的地方关闭侧边栏
    document.getElementById("whole").addEventListener("click", function () {
        if (isLeftOpen) {
            closeLeft();
            isLeftOpen = false;
        }
        if (isRightOpen) {
            closeRight();
            isRightOpen = false;
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
        if (Math.abs(x) > d) {
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
        if (Math.abs(y) > d) {
            if (y > 0) {
                console.log("向下滑动");
            } else {
                console.log("向上滑动");
            }
        }
    });
    document.addEventListener("touchend", function (e) { });

    document.getElementById("user-head").addEventListener("click", function () {
        openRegLogBox();
    });
}

function meSend() { //当前用户发送消息的动作
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

function openRight() { //打开右边栏
    document.getElementById("right-menu").style.transform = "translateX(0px)";
    document.getElementById("whole").style.transform = "translateX(-200px)";
}

function closeRight() { //关闭右边栏
    document.getElementById("right-menu").style.transform = "translateX(300px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
}
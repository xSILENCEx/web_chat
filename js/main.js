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

    var h = document.createElement("iframe");
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
    if (msg.length != 0) {
        var newMsg = document.createElement("div");
        newMsg.setAttribute("class", "msg-item");

        var h = document.createElement("iframe");
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
    clearEdit();
}



onload = function () {

    if (isHuge()) {
        document.getElementById("reg-login").innerHTML = "<div id='settings'>设置</div>";
    } else {
        document.getElementById("reg-login").innerHTML = "<a class='a' href='#'>登录</a> / <a class='a' href='#'>注册</a>";
    }

    var isLeftOpen = false; //左边栏是否打开
    var isRightOpen = false; //右边栏是否打开
    document.getElementById("send").onmousedown = function () {
        meSend();
    } //发送函数
    leftSend("/headImages/system.html", "系统提示", "欢迎使用简聊Web！试试左滑右滑~<br>点击logo打开左边栏。"); //发送一条提示信息

    document.getElementById("logo").addEventListener("click", function (event) {
        if (isLeftOpen && isHuge()) {
            closeLeft();
            isLeftOpen = false;
        } else if (isHuge()) {
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
    document.getElementById("settings").addEventListener("click", function (event) {
        if (isRightOpen && isHuge()) {
            closeRight();
            isRightOpen = false;
        } else if (isHuge()) {
            if (isLeftOpen) {
                closeLeft();
                isLeftOpen = false;
            }
            openRight();
            isRightOpen = true;
        }
        event.stopPropagation();
    });
    document.getElementById("whole").addEventListener("click", function () {
        closeLeft();
        isLeftOpen = false;
        closeRight();
        isRightOpen = false;
    });

    //Enter键发送
    document.onkeydown = function () {
        var isEditing = document.getElementById("edit");
        if (event.keyCode == 13 && isEditing == document.activeElement) {
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
            if (x > 0 && isHuge()) {
                if (isRightOpen) {
                    closeRight();
                    isRightOpen = false;
                } else {
                    openLeft();
                    isLeftOpen = true;
                }
                var e = e || window.event;
                startPoint = e.touches[0];
            } else if (isHuge()) {
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
    document.addEventListener("touchend", function (e) {});
}

function meSend() {
    event.keyCode = 0;
    event.returnValue = false;
    rightSend('/headImages/def-boy.html', '匿名游客');
}

function isHuge() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 1400) return true;
    else return false;
}


function openLeft() {
    document.getElementById("left-menu").style.transform = "translateX(0px)";
    document.getElementById("whole").style.transform = "translateX(200px)";
}

function closeLeft() {
    document.getElementById("left-menu").style.transform = "translateX(-300px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
}

function openRight() {
    document.getElementById("right-menu").style.transform = "translateX(0px)";
    document.getElementById("whole").style.transform = "translateX(-200px)";
}

function closeRight() {
    document.getElementById("right-menu").style.transform = "translateX(300px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
}
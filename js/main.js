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

document.getElementById("send").onmousedown = function () {
    meSend();
}

onload = function () {
    leftSend("/headImages/system.html", "系统提示", "欢迎使用简聊Web！");
}

function meSend() {
    event.keyCode = 0;
    event.returnValue = false;
    rightSend('/headImages/def-boy.html', '匿名游客');
}

document.onkeydown = function () {
    var isEditing = document.getElementById("edit");
    if (event.keyCode == 13 && isEditing == document.activeElement) {
        meSend();
    }
}
function setConnectError(error) {
    var c = document.getElementById("connect");
    c.innerHTML = "无法连接到服务器";
    c.title = "无法连接到服务器";
    c.style.backgroundColor = "rgba(255, 120, 120, 1.00)";
}

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

function connectSuccess() {
    var c = document.getElementById("connect");
    c.innerHTML = "服务器连接成功";
    c.title = "已连接到服务器";
    c.style.backgroundColor = "rgba(115, 204, 102, 1.00)";
}
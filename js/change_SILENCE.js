function setConnectError(error) {
    var c = document.getElementById("connect");
    c.innerHTML = "无法连接到服务器";
    c.style.backgroundColor = "rgba(255, 120, 120, 1.00)";
}

function errorInfo(error) {
    alert("无法连接到服务器,错误信息:" + error);
}

function connectSuccess() {
    var c = document.getElementById("connect");
    c.innerHTML = "服务器连接成功";
    c.style.backgroundColor = "rgba(115, 204, 102, 1.00)";
}
var isRightOpen = false; //右边栏是否打开

///////////////////////////////////////////////////////////////////////////////////打开右边栏
function openRight() {
    document.getElementById("right-menu").style.transform = "translateX(0px)";
    document.getElementById("whole").style.transform = "translateX(-200px)";
}

/////////////////////////////////////////////////////////////////////////////////关闭右边栏
function closeRight() {
    document.getElementById("right-menu").style.transform = "translateX(300px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
    closeNetSet();
    closeAbout();
}

//////////////////////////////////////////网络设置/////////////////////////////////////////////////////
document.getElementById("net-settings").addEventListener("click", function (e) {
    openNetSet();
});

document.getElementById("close-net").addEventListener("click", function (e) {
    closeNetSet();
});

function openNetSet() {
    document.getElementById("net-menu").style.transform = "translateX(-300px)";
}

function closeNetSet() {
    document.getElementById("net-menu").style.transform = "translateX(0px)";
}

///////////////////////////////////////////获取服务器端口信息////////////////////////////////////////////////////////
document.getElementById("net-submit").addEventListener("click", function () {
    console.log("服务器IP:" + getServer() + "\n" + "端口:" + getPort());
});

function getServer() {
    return document.getElementById("server-ip").value;
}

function getPort() {
    return document.getElementById("server-port").value;
}

//////////////////////////////////////////关于//////////////////////////////////////////////////////
document.getElementById("about").addEventListener("click", function (e) {
    openAbout();
});

document.getElementById("close-about").addEventListener("click", function (e) {
    closeAbout();
});

function openAbout() {
    document.getElementById("about-menu").style.transform = "translateX(-300px)";
}

function closeAbout() {
    document.getElementById("about-menu").style.transform = "translateX(0px)";
}
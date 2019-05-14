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

////////////////////////////////////////弹出提示信息，支持富文本
function openTips(type, content) {
    var tips = document.getElementById("tips");
    var tipsBody = document.getElementById("tips-body");
    var tipsTitle = document.getElementById("tips-title");
    var tipsContent = document.getElementById("tips-content");

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
    tips.style.transform = "scale(1.0)";
    tips.opacity = "1.0";
    setTimeout(function () {
        tips.style.backgroundColor = "rgba(0,0,0,0.5)";
    }, 500);
}

document.getElementById("tips-btn").addEventListener("click", function () {
    closeTips();
});

function closeTips() {
    var tips = document.getElementById("tips");
    tips.style.opacity = "0.00";
    tips.style.transform = "scale(1.2)";
    setTimeout(function () {
        tips.style.transform = "scale(0)";
    }, 500);
}
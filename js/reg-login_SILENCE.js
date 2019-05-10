var isLogBoxOpen = false;
var regOrLog = false;

document.getElementById("user-head").addEventListener("click", function () {
    openRegLogBox();
});

document.getElementById("log-btn").addEventListener("click", function (e) {
    if (this.value == "确认登录") {
        console.log("用户名 : " + getUserName() + "\n" + "密码 : " + getPsw());
    } else {
        alert('直接注册');
    }
});

document.getElementById("reg-btn").addEventListener("click", function (e) {
    if (this.value == "注册账号") {
        changeToReg();
    } else {
        changeToLog();
    }
});

document.getElementById("close-log-box").addEventListener("click", function (e) {
    closeRegLogBox();
});

document.getElementById("check-psw").addEventListener("focus", function () {
    this.style.transform = "scale(1.1)";
});
document.getElementById("check-psw").addEventListener("blur", function () {
    this.style.transform = "scale(1.0)";
});

function openRegLogBox() {
    if (!isLogBoxOpen) {
        var rBox = document.getElementById("log-reg-box");
        rBox.style.transform = "scale(1.0)";
        rBox.style.opacity = "1.0";
        setTimeout(function () {
            rBox.style.backgroundColor = "rgba(0,0,0,0.50)";
        }, 500);
        isLogBoxOpen = true;
        closeRight();
        isRightOpen = false;
    }

}

function closeRegLogBox() {
    if (isLogBoxOpen) {
        var rBox = document.getElementById("log-reg-box");
        rBox.style.backgroundColor = "rgba(0,0,0,0.00)";
        rBox.style.opacity = "0.0";
        setTimeout(function () {
            rBox.style.transform = "scale(0.0)";
        }, 500);
        isLogBoxOpen = false;
    }

}

function changeToLog() {
    document.getElementById("check-psw").style.transform = "scale(0)";
    document.getElementById("log-btn").style.transform = "translateY(-50px)";
    document.getElementById("reg-btn").style.transform = "translateY(-50px)";
    document.getElementById("log-title").innerHTML = "登录";
    document.getElementById("log-btn").value = "确认登录";
    document.getElementById("reg-btn").value = "注册账号";
}

function changeToReg() {
    document.getElementById("check-psw").style.transform = "scale(1)";
    document.getElementById("log-btn").style.transform = "translateY(0px)";
    document.getElementById("reg-btn").style.transform = "translateY(0px)";
    document.getElementById("log-title").innerHTML = "注册";
    document.getElementById("log-btn").value = "确认注册";
    document.getElementById("reg-btn").value = "用户登录";
}

function getUserName() {
    var userName = document.getElementById("username").value;
    if (userName.replace(/\s+/g, "").length != 0) {
        return userName;
    } else {
        return "用户名不规范";
    }
}

function getPsw() {
    var uPattern = /^[\w]{6,16}$/i;
    var passWd = document.getElementById("password").value;
    if (uPattern.test(passWd)) {
        return passWd;
    } else {
        return "密码不规范";
    }
}

function checkPsw() {
    var p1 = document.getElementById("password").value;
    var p2 = document.getElementById("check-psw").value;
    if (p1 == p2) {
        return true;
    } else {
        return false;
    }
}
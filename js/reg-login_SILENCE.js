var isLogBoxOpen = false;
var regOrLog = false;

document.getElementById("user-head").addEventListener("click", function (e) {
    openRegLogBox();
});

document.getElementById("log-btn").addEventListener("click", function (e) {
    if (this.value == "确认登录") {
        console.log("用户名 : " + getUserName() + "\n" + "密码 : " + getPsw());
        UserLogin(getUserName(), getPsw());
    } else {
        console.log("用户名 : " + getUserName() + "\n" + "密码 : " + getPsw());
        UserRegister(getUserName(), getPsw());
    }
    e.stopPropagation();
});

document.getElementById("reg-btn").addEventListener("click", function (e) {
    if (this.value == "注册账号") {
        changeToReg();
    } else {
        changeToLog();
    }
    e.stopPropagation();
});

document.getElementById("close-log-box").addEventListener("click", function (e) {
    closeRegLogBox();
    e.stopPropagation();
});

document.getElementById("check-psw").addEventListener("focus", function (e) {
    this.style.transform = "scale(1.1)";
    e.stopPropagation();
});
document.getElementById("check-psw").addEventListener("blur", function (e) {
    this.style.transform = "scale(1.0)";
    e.stopPropagation();
});
document.getElementById("log-head").addEventListener("click", function (e) {
    console.log("选择头像");
    e.stopPropagation();
});

document.getElementById("lr-main").addEventListener("click", function (e) {
    e.stopPropagation();
});

document.getElementById("log-reg-box").addEventListener("click", function (e) {
    closeRegLogBox();
    e.stopPropagation();
});

///////////////////////////////////////////////////////////////////////登录成功后调用此方法
function logInfo(info) { /////////////////传入一个json字符串，包含用户的所有信息
    console.log("返回信息:" + info);
}

/////////////////////////////////////////////////////////////注销时调用次方法
function signOut() {
    console.log("注销成功");
}

//////////////////////////////////////////////////////////////////////打开登陆注册框
function openRegLogBox() {
    if (!isLogBoxOpen) {
        var rBox = document.getElementById("log-reg-box");
        rBox.style.transform = "scale(1.0)";
        rBox.style.opacity = "1.0";
        setTimeout(function (e) {
            rBox.style.backgroundColor = "rgba(0,0,0,0.50)";
        }, 500);
        isLogBoxOpen = true;
        if (isSmall()) {
            closeRight();
            isRightOpen = false;
        }
    }

}

/////////////////////////////////////////////////////////////////////////关闭登录注册框
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


/////////////////////////////////////////////////////////////////////////切换到登录模式
function changeToLog() {
    document.getElementById("check-psw").style.transform = "scale(0)";
    document.getElementById("log-btn").style.transform = "translateY(-50px)";
    document.getElementById("reg-btn").style.transform = "translateY(-50px)";
    document.getElementById("log-title").innerHTML = "登录";
    document.getElementById("log-btn").value = "确认登录";
    document.getElementById("reg-btn").value = "注册账号";
}


//////////////////////////////////////////////////////////////////////////////切换到注册模式
function changeToReg() {
    document.getElementById("check-psw").style.transform = "scale(1)";
    document.getElementById("log-btn").style.transform = "translateY(0px)";
    document.getElementById("reg-btn").style.transform = "translateY(0px)";
    document.getElementById("log-title").innerHTML = "注册";
    document.getElementById("log-btn").value = "确认注册";
    document.getElementById("reg-btn").value = "用户登录";
}

//////////////////////////////////////////////////////////////////////////获取框中用户名
function getUserName() {
    var userName = document.getElementById("username").value;
    if (userName.replace(/\s+/g, "").length != 0) {
        return userName;
    } else {
        return "用户名不规范";
    }
}

//////////////////////////////////////////////////////////////////////////获取框中密码
function getPsw() {
    var uPattern = /^[\w]{6,16}$/i;
    var passWd = document.getElementById("password").value;
    if (uPattern.test(passWd)) {
        return passWd;
    } else {
        return "密码不规范";
    }
}

//////////////////////////////////////////////////////////////////////////////判断两次密码是否相同
function checkPsw() {
    var p1 = document.getElementById("password").value;
    var p2 = document.getElementById("check-psw").value;
    if (p1 == p2) {
        return true;
    } else {
        return false;
    }
}
function setCookie(cName, cValue, exDays) { //设置cookie
    var d = new Date();
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cName + "=" + cValue + "; " + expires;
}

function getCookie(cName) { //获取cookie
    var name = cName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie(value) { //检查cookie
    var v = getCookie(value);
    if (v != "") {
        return true;
    } else {
        return false;
    }
}
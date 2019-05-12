var isLeftOpen = false; //左边栏是否打开

//打开左边栏
function openLeft() {
    document.getElementById("left-menu").style.transform = "translateX(0px)";
    document.getElementById("whole").style.transform = "translateX(200px)";
}

//关闭左边栏
function closeLeft() {
    document.getElementById("left-menu").style.transform = "translateX(-300px)";
    document.getElementById("whole").style.transform = "translateX(0px)";
}

function refreshUserList() {

}

function addUserItem(name, info, picUrl) {
    var userItem = document.createElement("div");
    userItem.setAttribute("class", "user-list-item");

    var userHead = document.createElement("img");
    userHea.setAttribute("alt", "#");
    userHead.setAttribute("src", picUrl);
    userHead.setAttribute("class", "user-list-head");

    var userName = document.createElement("div");
    userName.setAttribute("class", "user-list-name");
    userName.innerHTML = name;

    var userInfo = document.createElement("div");
    userInfo.setAttribute("class", "user-list-info");
    userInfo.innerHTML = info;

    userItem.appendChild(userHead);
    userItem.appendChild(userName);
    userItem.appendChild(userInfo);

    document.getElementById("user-list").appendChild(userItem);
}
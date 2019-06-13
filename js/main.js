var maxX = document.getElementById("map").clientWidth - 40 || document.body.offsetWidth - 40;
var maxY = document.getElementById("map").clientHeight - 40 || document.body.offsetHeight - 40;
var tempId = -1;
var isTankCreated = false;
var tankShotLock = false;
var tankMoveLock = true;
var isControlBarOpen = false;

var tanks = [];
var online = [];

class UserTank {
    constructor(id, x, y, direction, speed, blood, name) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.state = 0;
        this.direction = direction;
        this.stepSize = speed;
        this.map = document.getElementById("map");
        this.blood = blood;
        this.name = name;
        this.tank;
        this.tankBox;
        this.bloodInfo;
    }

    create() {
        var tankObj = document.createElement("div");
        tankObj.setAttribute("class", "tank-obj");

        var tankBloodBar = document.createElement("div");
        tankBloodBar.setAttribute("class", "blood-bar");
        var tankBlood = document.createElement("div");
        tankBlood.setAttribute("class", "blood");
        this.bloodInfo = tankBlood;

        tankBloodBar.appendChild(tankBlood);

        var userName = document.createTextNode(this.name + "-" + this.id);
        tankBloodBar.appendChild(userName);

        var tank = document.createElement("div");
        tank.setAttribute("class", "tank");
        tankObj.style.transform = "translateX(" + this.x + "px) translateY(" + this.y + "px)";

        var tankDriver = document.createElement("img");
        tankDriver.setAttribute("class", "tank-driver");
        tankDriver.setAttribute("alt", "#");
        tankDriver.setAttribute("src", "img/SILENCE.png");

        tank.appendChild(tankDriver);
        tank.style.transform = " rotate(" + this.direction + "deg)";

        tankObj.appendChild(tankBloodBar);
        tankObj.appendChild(tank);
        this.map.appendChild(tankObj);

        this.tank = tank;
        this.tankBox = tankObj;
        this.state = 1;

        tips(0, this.name + "-" + this.id + "加入游戏");

        return tank;
    }

    dropBlood(sId) {
        this.blood = this.blood - 20;
        this.bloodInfo.style.transform = "scaleX(" + (this.blood / 80) + ")";
        if (this.blood <= 0) this.destroy(sId);
    }

    destroy(sId) {
        if (this.id == tempId) isTankCreated = false;
        var n = tanks[sId].name;
        tankBoom(this.x, this.y);
        this.tankBox.style.display = "none";
        this.x = 0;
        this.map.removeChild(this.tankBox);
        this.state = 0;
        tanks[this.id] = null;

        if (tempId == this.id) {
            document.getElementById("gameBar").style.display = "block";
        }

        tips(0, n + "-" + sId + ": 摧💥毁" + this.name + "-" + this.id);
    }

    quit() {
        tips(1, this.name + "-" + this.id + "退出游戏");
        this.tankBox.style.display = "none";
        this.x = 0;
        this.map.removeChild(this.tankBox);
        this.state = 0;
        tanks[this.id] = null;

        if (tempId == this.id) {
            document.getElementById("gameBar").style.display = "block";
        }
    }

    move(direction) {
        this.direction = direction;

        this.tankBox.style.transform = "translateX(" + this.x + "px) translateY(" + this.y + "px)";
        this.tank.style.transform = " rotate(" + direction + "deg)";
        switch (direction) {
            case 180:
                this.x = this.x - this.stepSize;
                break;
            case 0:
                this.x = this.x + this.stepSize;
                break;
            case 90:
                this.y = this.y + this.stepSize;
                break;
            case -90:
                this.y = this.y - this.stepSize;
                break;
        }
    }

    shot(bId) {
        var bullet = document.createElement("div");
        bullet.setAttribute("class", "bullet");
        bullet.style.transform = "translateX(" + (this.x + 37) + "px) translateY(" + (this.y + 37) + "px)";

        this.map.appendChild(bullet);

        var newBullet = new Bullet(bId, bullet, this.id, this.x + 37, this.y + 37, this.direction, this.map);

        clearInterval(bullet.timer);
        bullet.timer = setInterval(function () {
            if (newBullet.checkShot() || newBullet.x <= 100 || newBullet.x > maxX + 10 || newBullet.y < 0 || newBullet.y > maxY + 100) {
                clearInterval(bullet.timer);
                destroyBullet(newBullet.id);
            } else {
                newBullet.beginFly();
            }
        }, 30);
    }
}

class Bullet {
    constructor(id, obj, tankId, x, y, direction, map) {
        this.id = id;
        this.obj = obj;
        this.tankId = tankId;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.map = map;
    }

    checkShot() {
        if (isTankCreated && tanks[tempId] != null && this.x >= tanks[tempId].x + 14 && this.x <= tanks[tempId].x + 60 && this.y >= tanks[tempId].y + 14 && this.y <= tanks[tempId].y + 60 && this.tankId != tempId) {

            var jsonObject = {};
            jsonObject.obj = "tank";
            jsonObject.sId = this.tankId;
            jsonObject.dId = tempId;
            jsonObject.cmd = "destroy";
            jsonObject.id = this.id;

            SendMessageToServer(1, JSON.stringify(jsonObject));

            return true;
        }
        return false;
    }

    beginFly() {
        switch (this.direction) {
            case 180:
                this.x = this.x - 16;
                break;
            case 0:
                this.x = this.x + 16;
                break;
            case 90:
                this.y = this.y + 16;
                break;
            case -90:
                this.y = this.y - 16;
                break;
        }
        this.obj.setAttribute("id", this.id);
        this.obj.style.transform = "translateX(" + this.x + "px) translateY(" + this.y + "px)";
    }
}

window.onload = function (e) {
    ConnectToServer();

    var jsonObject = {};
    jsonObject.obj = "tank";
    jsonObject.cmd = "sync";

    setTimeout(function () {
        SendMessageToServer(1, JSON.stringify(jsonObject));
    }, 500);
}

window.onresize = function (e) {
    maxX = document.getElementById("map").clientWidth - 40 || document.body.offsetWidth - 40;
    maxY = document.getElementById("map").clientHeight - 40 || document.body.offsetHeight - 40;
}

window.onkeydown = function (e) {
    if (isTankCreated) {
        var jsonObject = {};
        jsonObject.obj = "tank";
        jsonObject.id = tempId;
        jsonObject.cmd = "move";
        switch (e.keyCode) {
            case 65:
            case 37: /////向左移动
                moveTankCmd(180);
                break;
            case 68:
            case 39:
                /////向右移动
                moveTankCmd(0);
                break;
            case 83:
            case 40:
                /////向下移动
                moveTankCmd(90);
                break;
            case 87:
            case 38:
                /////向上移动
                moveTankCmd(-90);
                break;
            case 32:
            case 13:
                /////坦克射击
                tankShotCmd();
                break;
            default:
                break;
        }
    }
}

window.onbeforeunload = function (e) {
    if (isTankCreated && tanks[tempId]) {
        var jsonObject = {};
        jsonObject.obj = "tank";
        jsonObject.cmd = "quit";
        jsonObject.id = tempId;
        jsonObject.name = tanks[tempId].name;
        SendMessageToServer(1, JSON.stringify(jsonObject));
        isTankCreated = false;
    }
}

window.onunload = function (e) {
    if (isTankCreated && tanks[tempId]) {
        var jsonObject = {};
        jsonObject.obj = "tank";
        jsonObject.cmd = "quit";
        jsonObject.id = tempId;
        jsonObject.name = tanks[tempId].name;
        SendMessageToServer(1, JSON.stringify(jsonObject));
        isTankCreated = false;
    }
}

/////////////////////元素监听
document.body.addEventListener("touchstart", function () {
    if (!isControlBarOpen && isTankCreated) {
        document.getElementById("shotBtn").style.opacity = "1.00";
        document.getElementById("moveBtn").style.opacity = "1.00";
        isControlBarOpen = true;
    }

});

document.getElementById("create").addEventListener("click", function () {
    var myId = document.getElementById("idInfo").value;
    var tankName = document.getElementById("tankName").value;
    if (myId == "") {
        tips(1, "id不能为空");

    } else if (tanks[myId]) {
        tips(1, "此id已被占用");
    } else if (!isNum(myId)) {
        tips(1, "id不规范");
    } else {
        var jsonObject = {};
        var jsonObject2 = {};
        jsonObject.obj = "tank";
        jsonObject.id = myId;
        jsonObject.cmd = "create";
        jsonObject2.x = 0;
        jsonObject2.y = randomNum(0, maxY - 60);
        jsonObject2.dir = 0;
        jsonObject2.speed = 10;
        jsonObject2.blood = 80;

        tankName == "" ? jsonObject2.name = "坦克" : jsonObject2.name = tankName;

        jsonObject.info = jsonObject2;
        SendMessageToServer(1, JSON.stringify(jsonObject));
        isTankCreated = true;
        tankShotLock = true;
        document.getElementById("gameBar").style.display = "none";
        ctrlMenu(1);
    }
});

document.getElementById("shotBtn").addEventListener("touchstart", function (e) {
    tankShotCmd();
    this.style.backgroundColor = "rgba(200, 100, 100, 0.80)";
    e.stopPropagation();
});

document.getElementById("shotBtn").addEventListener("touchmove", function (e) {
    tankShotCmd();
    e.stopPropagation();
});

document.getElementById("shotBtn").addEventListener("touchend", function (e) {
    this.style.backgroundColor = "rgba(200, 100, 100, 0.50)";
});

document.getElementById("menuBtn").addEventListener("click", function (e) {
    ctrlMenu(0);
    e.stopPropagation();
});

document.getElementById("whole").addEventListener("click", function (e) {
    ctrlMenu(1);
    e.stopPropagation();
});

document.getElementById("quitGame").addEventListener("click", function (e) {
    if (isTankCreated && tanks[tempId]) {
        var jsonObject = {};
        jsonObject.obj = "tank";
        jsonObject.cmd = "quit";
        jsonObject.id = tempId;
        jsonObject.name = tanks[tempId].name;
        SendMessageToServer(1, JSON.stringify(jsonObject));
        isTankCreated = false;
    }
});

var startPoint = null;
var moveBar = document.getElementById("moveBtn");
moveBar.addEventListener("touchstart", function (e) {
    this.style.backgroundColor = "rgba(50, 100, 200, 0.80)";
    var e = e || window.event;
    startPoint = e.touches[0];
});

moveBar.addEventListener("touchmove", function (e) {
    var e = e || window.event;
    var endPoint = e.changedTouches[0];
    var dX = endPoint.clientX - startPoint.clientX;
    var dY = endPoint.clientY - startPoint.clientY;

    if (Math.abs(dY) < 50 && dX > 20) {
        moveTankCmd(0);
    } else if (Math.abs(dY) < 50 && dX < -20) {
        moveTankCmd(180);
    } else if (Math.abs(dX) < 50 && dY > 20) {
        moveTankCmd(90);
    } else if (Math.abs(dX) < 50 && dY < -20) {
        moveTankCmd(-90);
    }
});

moveBar.addEventListener("touchend", function (e) {
    this.style.backgroundColor = "rgba(50, 100, 200, 0.50)";
});


//////////////////////功能类方法
function ReceiveByServer(self, head, name, msg) {
    var m = JSON.parse(msg);
    if (m.obj == "tank") {
        switch (m.cmd) {
            case "create":
                createNewTank(m.id, JSON.stringify(m.info));
                break;
            case "destroy":
                tanks[m.dId].dropBlood(m.sId);
                destroyBullet(m.id);
                break;
            case "move":
                tanks[m.id].move(m.dir);
                break;
            case "shot":
                tanks[m.id].shot(m.bId);
                break;
            case "sync":
                if (tanks.length != 0 && isTankCreated) {
                    var jsonObject = {};
                    var jsonObject2 = {};
                    jsonObject.obj = "tank";
                    jsonObject.id = tempId;
                    jsonObject.cmd = "create";
                    jsonObject2.x = tanks[tempId].x;
                    jsonObject2.y = tanks[tempId].y;
                    jsonObject2.dir = tanks[tempId].direction;
                    jsonObject2.speed = 10;
                    jsonObject2.blood = tanks[tempId].blood;

                    jsonObject2.name = tanks[tempId].name;

                    jsonObject.info = jsonObject2;
                    SendMessageToServer(1, JSON.stringify(jsonObject));
                }
                break;
            case "quit":
                tanks[m.id].quit();
                break;
            default:
                break;
        }
    }

}

function createNewTank(id, tempInfo) {
    if (!tanks[id]) {
        tempId = document.getElementById("idInfo").value;
        var info = JSON.parse(tempInfo);
        var newTank = new UserTank(id, info.x, info.y, info.dir, info.speed, info.blood, info.name);
        tanks[id] = newTank;
        tanks[id].create();
    }
}

function moveTankCmd(direction) {
    if (isTankCreated && tankMoveLock) {
        tankMoveLock = false;
        setTimeout(function () {
            tankMoveLock = true;
        }, 20);
        var jsonObject = {};
        jsonObject.obj = "tank";
        jsonObject.id = tempId;
        jsonObject.cmd = "move";
        jsonObject.dir = direction;
        switch (direction) {
            case 180:
                if (tanks[tempId].x > 60) {
                    SendMessageToServer(1, JSON.stringify(jsonObject));
                }
                break;
            case 0:
                if (tanks[tempId].x < maxX - 20) {
                    SendMessageToServer(1, JSON.stringify(jsonObject));
                }
                break;
            case 90:
                if (tanks[tempId].y < maxY - 20) {
                    SendMessageToServer(1, JSON.stringify(jsonObject));
                }
                break;
            case -90:
                if (tanks[tempId].y > -10) {
                    SendMessageToServer(1, JSON.stringify(jsonObject));
                }
                break;
        }
    }
}

function tankShotCmd() {
    if (tankShotLock) {
        if (tanks[tempId].x > 60) {
            var shotBtn = document.getElementById("shotBtn");
            var myDate = new Date();
            tankShotLock = false;
            var jsonObject = {};
            jsonObject.obj = "tank";
            jsonObject.id = tempId;
            jsonObject.cmd = "shot";
            jsonObject.bId = "bullet" + tempId + myDate.toJSON().toString();

            SendMessageToServer(1, JSON.stringify(jsonObject));

            var timeFlag = 5;
            var t = setInterval(function () {
                shotBtn.innerHTML = "SHOT(" + timeFlag + ")";
                timeFlag--;
                if (timeFlag <= 0) {
                    clearInterval(t);
                    tankShotLock = true;
                    shotBtn.innerHTML = "SHOT";
                }
            }, 100);
        }
    }
}

function destroyBullet(id) {
    if (document.getElementById(id)) {
        document.getElementById("map").removeChild(document.getElementById(id));
    }
}

function tankBoom(x, y) {
    var boomBox = document.createElement("div");
    boomBox.setAttribute("class", "boom-box");
    boomBox.style.transform = "translateX(" + (x - 80) + "px) translateY(" + (y - 80) + "px) scale(0.2)";
    var m = document.getElementById("map");

    m.appendChild(boomBox);

    setTimeout(function () {
        boomBox.style.transform = "translateX(" + (x - 80) + "px) translateY(" + (y - 80) + "px) scale(1.2)";
        boomBox.style.backgroundColor = "rgba(58, 129, 234, 0.00)";
    }, 30);

    setTimeout(function () {
        m.removeChild(boomBox);
    }, 1000);

}

function ctrlMenu(state) {
    if (state == 0) {
        document.getElementById("menu").style.transform = "translateX(-300px)";
        document.getElementById("menuBtn").style.transform = "rotate(-135deg)";
    } else {
        document.getElementById("menu").style.transform = "translateX(0px)";
        document.getElementById("menuBtn").style.transform = "rotate(0deg)";
    }
}

////////////////////////////////辅助类方法
function randomNum(minNum, maxNum) { //生成一定范围的随机数
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

var tipsCount = 0;

function tips(type, content) {
    var tipsBody = document.createElement("div");
    tipsBody.setAttribute("class", "tips");
    tipsBody.style.top = (tipsCount * 28) + "px";
    tipsBody.innerHTML = content;
    if (type == 1) {
        tipsBody.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
    }
    document.getElementById("tipsBox").appendChild(tipsBody);
    tipsCount++;
    setTimeout(function () {
        tipsCount--;
        var firstTip = document.getElementsByClassName("tips")[0];
        document.getElementById("tipsBox").removeChild(firstTip);
    }, 1800);
}

function isNum(str) { //判断id格式的正则表达式
    return /^[1-9]\d{0,5}$/.test(str);
}
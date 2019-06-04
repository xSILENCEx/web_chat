var maxX = document.getElementById("map").clientWidth - 40 || document.body.offsetWidth - 40;
var maxY = document.getElementById("map").clientHeight - 40 || document.body.offsetHeight - 40;
var isGamePageOpen = false;

class UserTank {
    constructor(id, x, y, direction, speed, blood) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.stepSize = speed;
        this.shotCount = 0;
        this.map = document.getElementById("map");
        this.lock = true;
        this.blood = blood;

    }

    create() {
        var tankBox = document.createElement("div");
        tankBox.setAttribute("class", "tank");
        tankBox.setAttribute("id", "tank" + this.id);
        tankBox.style.transform = "translateX(" + this.x + "px) translateY(" + this.y + "px) rotate(" + this.direction + "deg)";

        var tankDriver = document.createElement("img");
        tankDriver.setAttribute("class", "tankDriver");
        tankDriver.setAttribute("alt", "#");
        tankDriver.setAttribute("src", "img/SILENCE.png");

        tankBox.appendChild(tankDriver);
        this.map.appendChild(tankBox);

        console.log("tank is create !");
    }

    destroy() {
        console.log("tank is destroyed !");
    }

    move(direction) {
        this.direction = direction;

        if (this.x >= maxX) {
            this.x = maxX - 2;
        } else if (this.x <= 0) {
            this.x = 2;
        } else if (this.y <= 0) {
            this.y = 0;
        } else if (this.y >= maxY) {
            this.y = maxY - 2;
        }

        var t = document.getElementById("tank" + this.id);
        t.style.transform = "translateX(" + this.x + "px) translateY(" + this.y + "px) rotate(" + direction + "deg)";
        switch (direction) {
            case -90:
                this.x = this.x - this.stepSize;
                break;
            case 90:
                this.x = this.x + this.stepSize;
                break;
            case 180:
                this.y = this.y + this.stepSize;
                break;
            case 0:
                this.y = this.y - this.stepSize;
                break;
        }
    }

    lockBullet() {
        this.lock = false;
    }

    unlockBullet() {
        this.lock = true;
    }

    shot() {
        console.log("shot:" + this.lock);
        if (this.lock) {
            var bullet = document.createElement("div");
            bullet.setAttribute("class", "bullet");
            bullet.setAttribute("id", "bullet" + this.id + "-" + this.shotCount);
            bullet.style.transform = "translateX(" + (this.x + 19) + "px) translateY(" + (this.y + 19) + "px)";

            this.map.appendChild(bullet);

            var newBullet = new Bullet(bullet, this.x + 19, this.y + 19, this.direction, this.map);

            clearInterval(bullet.timer);
            bullet.timer = setInterval(function () {
                newBullet.beginFly();
            }, 70);

            setTimeout(function () {
                clearInterval(bullet.timer);
                newBullet.destroy();
            }, 3000);

            this.shotCount++;
            console.log("shot:" + this.lock);
        }
    }
}

class Bullet {
    constructor(objId, x, y, direction, map) {
        this.objId = objId;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.map = map;
    }

    beginFly() {
        switch (this.direction) {
            case 180:
                this.x = this.x - 38;
                break;
            case 0:
                this.x = this.x + 38;
                break;
            case 90:
                this.y = this.y + 38;
                break;
            case -90:
                this.y = this.y - 38;
                break;
        }
        this.objId.style.transform = "translateX(" + this.x + "px) translateY(" + this.y + "px)";
    }

    destroy() {
        this.map.removeChild(this.objId);
    }
}

window.onresize = function (e) {
    maxX = document.getElementById("map").clientWidth - 40 || document.body.offsetWidth - 40;
    maxY = document.getElementById("map").clientHeight - 40 || document.body.offsetHeight - 40;
}

// window.onkeydown = function (e) {
//     switch (e.keyCode) {
//         case 65:
//         case 37: /////向左移动
//             // myTank.move(180);
//             console.log("向左移动");
//             SendMessageToServer(1, "{\"obj\":\"tank\",\"cmd\":\"move\",\"id\":0,\"dir\":-90}");
//             break;
//         case 68:
//         case 39:
//             /////向右移动
//             // myTank.move(0);
//             console.log("向右移动");
//             SendMessageToServer(1, "{\"obj\":\"tank\",\"cmd\":\"move\",\"id\":0,\"dir\":90}");
//             break;
//         case 83:
//         case 40:
//             /////向下移动
//             // myTank.move(90);
//             console.log("向下移动");
//             SendMessageToServer(1, "{\"obj\":\"tank\",\"cmd\":\"move\",\"id\":0,\"dir\":180}");
//             break;
//         case 87:
//         case 38:
//             /////向上移动
//             // myTank.move(-90);
//             console.log("向上移动");
//             SendMessageToServer(1, "{\"obj\":\"tank\",\"cmd\":\"move\",\"id\":0,\"dir\":0}");
//             break;
//         default:
//             // myTank.shot();
//             console.log("射击");
//             break;
//     }
// }

function createNewTank(info) {
    var newTank = new UserTank(info.id, info.x, info.y, info.dir, info.speed, info.blood);
    return newTank;
}

// document.getElementById("create").addEventListener("click", function () {
//     SendMessageToServer(1, "{\"obj\":\"tank\",\"cmd\":\"create\",\"id\":0,\"x\":0,\"y\":0,\"dir\":0,\"speed\":30,\"blood\":1000}");
// });

document.getElementById("addTank").addEventListener("click", function () {
    openTankPage();
    closeRight();
});

function openTankPage() {
    document.getElementById("gamePage").style.transform = "translateY(0%)";
    isGamePageOpen = true;
}

function closeTankPage() {
    document.getElementById("gamePage").style.transform = "translateY(100%)";
    isGamePageOpen = true;
}

function joinGame() {}

function quitGame() {}

function tankShot(bulletInfo) {}
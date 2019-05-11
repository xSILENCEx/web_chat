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
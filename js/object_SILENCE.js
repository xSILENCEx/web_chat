class MessageItem {
    constructor(name, content, headUrl, dir, fromId, toId) {
        this.name = name;
        this.content = content;
        this.headUrl = headUrl;
        this.dir = dir;
        this.fromId = fromId;
        this.toId = toId;
        this.id = fromId > toId ? toId + "_to_" + fromId : fromId + "_to_" + toId;
    }

    addToWin() {
        if (document.getElementById(this.id)) {

            let newMsg = document.createElement("div");
            newMsg.setAttribute("class", "msg-item");

            let h = document.createElement("img");
            h.setAttribute("src", this.headUrl);

            let name = document.createElement("div");
            name.innerHTML = this.name;

            let msg = document.createElement("div");
            msg.innerHTML = this.content;

            if (this.dir == 0) {

                h.setAttribute("class", "head-img");
                name.setAttribute("class", "user-name");
                msg.setAttribute("class", "msg-box dot-c");

            } else {

                h.setAttribute("class", "head-img2");
                name.setAttribute("class", "user-name2");
                msg.setAttribute("class", "msg-box2 theme");

            }

            newMsg.appendChild(h);
            newMsg.appendChild(name);
            newMsg.appendChild(msg);

            document.getElementById(this.id).appendChild(newMsg);
            scrollToBottom(newMsg);

        } else {

            let chatItem = new ChatItem(this.id, this.headUrl, this.name, this.content);
            chatItem.create();
            this.addToWin();

        }

    }
}

class ChatWindow {
    constructor(windowId) {
        this.id = windowId;
        this.obj;
        this.isDisplay = true;
    }

    create() {
        let newWindow = document.createElement("div");
        newWindow.setAttribute("class", "chat-window");
        newWindow.setAttribute("id", this.id);
        document.getElementById("chatBox").appendChild(newWindow);
        this.obj = newWindow;
        this.obj.style.transform = "translateX(-100%) scale(0.5)";
    }

    open() {
        if (nowWindow) {
            nowWindow.close();
        }
        this.obj.style.opacity = "1.00";
        this.obj.style.transform = "translateX(0) scale(1.0)";
        this.isDisplay = true;

        if (isSmall()) {
            closeLeft();
            isLeftOpen = false;
        }

    }

    close() {
        let tempObj = this.obj;
        tempObj.style.transform = "translateX(80%) scale(0.8)";
        tempObj.style.opacity = "0.00";

        setTimeout(function () {
            tempObj.style.transform = "translateX(-100%) scale(0.8)";
        }, 500);

        this.isDisplay = false;
    }

    getState() {
        return this.isDisplay;
    }

}

let nowWindow;
class ChatItem {

    constructor(chatWinId, headUrl, name, lastMsg) {
        this.chatWinId = chatWinId;
        this.headUrl = headUrl;
        this.name = name;
        this.lastMsg = lastMsg;
        this.obj;
        this.windowObj;
    }

    create() {
        let newItem = document.createElement("div");
        newItem.setAttribute("class", "chat-list-item");

        let itemHead = document.createElement("img");
        itemHead.setAttribute("class", "chat-list-head");
        itemHead.setAttribute("src", this.headUrl);

        let itemName = document.createElement("div");
        itemName.setAttribute("class", "chat-list-name");
        itemName.innerHTML = this.name;

        let itemMsg = document.createElement("div");
        itemMsg.setAttribute("class", "chat-list-info");
        itemMsg.innerHTML = this.lastMsg;

        newItem.appendChild(itemHead);
        newItem.appendChild(itemName);
        newItem.appendChild(itemMsg);

        document.getElementById("chatList").appendChild(newItem);
        this.obj = newItem;

        let w = new ChatWindow(this.chatWinId);
        w.create();
        w.open();
        nowWindow = w;

        this.obj.addEventListener("click", function () {

            if (!w.getState()) {
                w.open();
                nowWindow = w;
            }
        });
    }

    changeInfo() {}
}
#include "WebSocketService.h"

WebSocketService::WebSocketService(QObject* parent)
	: QObject(parent)
{
	webSocketServer = new QWebSocketServer("", QWebSocketServer::NonSecureMode, this);
	ConnectSlots();
	StartWebSocketServer();
}
WebSocketService::~WebSocketService()
{
}
void WebSocketService::ConnectSlots()
{
	QObject::connect(webSocketServer, &QWebSocketServer::newConnection, this, &WebSocketService::CreatChannel);
	QObject::connect(this, &WebSocketService::UserChange, [=] {
		chatServer.UpdateUserlist(UserListConversionJson());
		});
}
bool WebSocketService::StartWebSocketServer()
{
	Config config;
	if (!webSocketServer->listen(QHostAddress(config.Settings->value("WebSocketServer/Address").toString()), config.Settings->value("WebSocketServer/Port").toInt())) {
		qWarning() << tr("QWebSocketServer not run.");
		return false;
	}
	else
	{
		qInfo() << tr("QWebSocketServer Running on ws://%1:%2/").arg(webSocketServer->serverAddress().toString()).arg(webSocketServer->serverPort());
		return true;
	}
}
void WebSocketService::CreatChannel()
{
	QWebSocket* webSocket = webSocketServer->nextPendingConnection();
	qInfo() << tr("QWebSocketServer Creat New Connect. From ipv4: %1:%2").arg(webSocket->peerAddress().toString()).arg(webSocket->peerPort());
	WebSocketTransport* webSocketTransport = new WebSocketTransport(webSocket);
	QWebChannel* webChannel = new QWebChannel(webSocketTransport);
	ChatUser* chatUser = new ChatUser(webChannel);
	visitorUserList.append(chatUser);

	QObject::connect(chatUser, &ChatUser::UserMessageToServer, &chatServer, &ChatServer::ReceiveUserMessage);
	QObject::connect(chatUser, &ChatUser::VisitorConversionUser, this, &WebSocketService::AddUser);
	QObject::connect(chatUser, &ChatUser::destroyed, this, &WebSocketService::DeleatUser);


	webChannel->connectTo(webSocketTransport);
	webChannel->registerObject(QStringLiteral("testDataChannel"), &testDataChannel);
	webChannel->registerObject(QStringLiteral("ChatServer"), &chatServer);
	webChannel->registerObject(QStringLiteral("ChatUser"), chatUser);
	QTimer::singleShot(500, [=] {
		emit UserChange();
		});
	
}
void WebSocketService::ArrangeUserList(QList<ChatUser*>& UserList)
{
	qSort(UserList.begin(), loginUserList.end(), [](ChatUser * chatUserA, ChatUser * chatUserB) {
		return chatUserA->user.ID < chatUserB->user.ID;
		});
}
void WebSocketService::AddUser(ChatUser* chatUser)
{
	loginUserList.removeAt(loginUserList.indexOf(chatUser));
	visitorUserList.removeAt(visitorUserList.indexOf(chatUser));
	loginUserList.append(chatUser);
	ArrangeUserList(loginUserList);
	emit UserChange();
}
void WebSocketService::DeleatUser(QObject* obj)
{
	ChatUser* chatUser = (ChatUser*)obj;
	loginUserList.removeAt(loginUserList.indexOf(chatUser));
	visitorUserList.removeAt(visitorUserList.indexOf(chatUser));
	ArrangeUserList(loginUserList);
	emit UserChange();
}
QJsonArray WebSocketService::UserListConversionJson()
{
	ChatUser chatUser;
	QJsonObject json;
	json.insert("VisitorSize", visitorUserList.size());
	json.insert("loginUserSize", loginUserList.size());
	json.insert("VisitorID", chatUser.user.ID);
	json.insert("VisitorName", chatUser.user.Name);
	QJsonArray jsonArray;
	jsonArray.insert(0, json);
	for (int i = 0; i < loginUserList.size(); i++)
	{
		jsonArray.insert(i + 1, loginUserList[i]->user.ConversionJson());
	}
	return jsonArray;
}
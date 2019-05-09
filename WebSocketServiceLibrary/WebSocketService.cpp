#include "WebSocketService.h"


WebSocketService::WebSocketService(QObject* parent)
	: QObject(parent)
{
	webSocketServer = new QWebSocketServer("", QWebSocketServer::NonSecureMode,this);
	ConnectSlots();
	StartWebSocketServer();
}
WebSocketService::~WebSocketService()
{
}
void WebSocketService::ConnectSlots()
{
	QObject::connect(webSocketServer, &QWebSocketServer::newConnection, this, &WebSocketService::CreatChannel);
}
bool WebSocketService::StartWebSocketServer()
{
	
	if (!webSocketServer->listen(QHostAddress::AnyIPv4, 12345)) {
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
	qInfo() << tr("QWebSocketServer Creat New Connect. From ipv4: %1:%2").arg(webSocket->localAddress().toString()).arg(webSocket->localPort());
	WebSocketTransport* webSocketTransport = new WebSocketTransport(webSocket);
	QWebChannel* webChannel = new QWebChannel(webSocketTransport);
	ChatUser* chatUser=new ChatUser(webChannel);
	chatUserList.append(chatUser);

	QObject::connect(chatUser, &ChatUser::UserMessageToServer, &chatServer, &ChatServer::ReceiveUserMessage);


	webChannel->connectTo(webSocketTransport);
	webChannel->registerObject(QStringLiteral("testDataChannel"), &testDataChannel);
	webChannel->registerObject(QStringLiteral("ChatServer"), &chatServer);
	webChannel->registerObject(QStringLiteral("ChatUser"), chatUser);

}
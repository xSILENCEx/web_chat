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
	
	if (!webSocketServer->listen(QHostAddress::Any, 12345)) {
		qWarning() << tr("QWebSocketServer not run.");
		return false;
	}
	else
	{
		qInfo() << tr("QWebSocketServer Running on ws://%1:%2/").arg("0.0.0.0").arg(webSocketServer->serverPort());
		return true;
	}
}
void WebSocketService::CreatChannel()
{
	qDebug() << tr("Connect +1");

	QWebSocket* webSocket = webSocketServer->nextPendingConnection();
	WebSocketTransport* webSocketTransport = new WebSocketTransport(webSocket);
	QWebChannel* channel1 = new QWebChannel(webSocketTransport);
	channel1->connectTo(webSocketTransport);
	channel1->registerObject(QStringLiteral("testDataChannel"), &testDataChannel);
}
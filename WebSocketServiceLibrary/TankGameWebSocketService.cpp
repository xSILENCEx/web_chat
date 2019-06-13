#include "TankGameWebSocketService.h"

TankGameWebSocketService::TankGameWebSocketService(QObject *parent)
	: QObject(parent)
{
	webSocketServer = new QWebSocketServer("", QWebSocketServer::NonSecureMode, this);
	webChannel.registerObject(QStringLiteral("TankGameServer"), &tankGameServer);
	ConnectSlots();
	StartWebSocketServer();
}

TankGameWebSocketService::~TankGameWebSocketService()
{
}
bool TankGameWebSocketService::StartWebSocketServer()
{
	Config config;
	if (!webSocketServer->listen(QHostAddress(config.Settings->value("TankGameWebSocketServer/Address").toString()), config.Settings->value("TankGameWebSocketServer/Port").toInt())) {
		qWarning() << tr("TankGame QWebSocketServer not run.");
		return false;
	}
	else
	{
		qInfo() << tr("TankGame QWebSocketServer Running on ws://%1:%2/").arg(webSocketServer->serverAddress().toString()).arg(webSocketServer->serverPort());
		return true;
	}
}
void TankGameWebSocketService::ConnectSlots()
{
	QObject::connect(webSocketServer, &QWebSocketServer::newConnection, this, &TankGameWebSocketService::CreatChannel);
}
void TankGameWebSocketService::CreatChannel()
{
	QWebSocket* webSocket = webSocketServer->nextPendingConnection();
	qInfo() << tr("TankGame QWebSocketServer Creat New Connect. From ipv4: %1:%2").arg(webSocket->peerAddress().toString()).arg(webSocket->peerPort());
	WebSocketTransport* webSocketTransport = new WebSocketTransport(webSocket);
	webChannel.connectTo(webSocketTransport);	
}

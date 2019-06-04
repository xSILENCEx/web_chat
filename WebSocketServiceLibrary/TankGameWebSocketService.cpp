#include "TankGameWebSocketService.h"

TankGameWebSocketService::TankGameWebSocketService(QObject *parent)
	: QObject(parent)
{
	webSocketServer = new QWebSocketServer("", QWebSocketServer::NonSecureMode, this);
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
	QWebChannel* webChannel = new QWebChannel(webSocketTransport);
	TankGameUser* tankGameUser = new TankGameUser(webChannel);
	tankGameUser->db = db;
	//visitorUserList.append(tankGameUser);

	QObject::connect(tankGameUser, &TankGameUser::UserMessageToServer, &tankGameServer, &TankGameServer::ReceiveUserMessage);
	QObject::connect(&tankGameServer, &TankGameServer::ForwardUserMessage, tankGameUser, &TankGameUser::ReceiveUserMessage);

	QObject::connect(&tankGameServer, &TankGameServer::ForwardUserlist, tankGameUser, &TankGameUser::ReceiveUserlist);
	//QObject::connect(tankGameUser, &TankGameUser::VisitorConversionUser, this, &TankGameWebSocketService::AddUser);
	//QObject::connect(tankGameUser, &TankGameUser::UserConversionVisitor, this, &TankGameWebSocketService::LessUser);
	//QObject::connect(tankGameUser, &TankGameUser::destroyed, this, &TankGameWebSocketService::DeleatUser);


	webChannel->connectTo(webSocketTransport);
	webChannel->registerObject(QStringLiteral("TankGameUser"), tankGameUser);

	/*QTimer::singleShot(500, [=] {
		emit tankGameServer.ForwardUserlist(UserListConversionJson());
		});*/

}
QString TankGameWebSocketService::UserListConversionJson()
{
	TankGameUser tankGameUser;
	QJsonObject json;
	json.insert("VisitorSize", visitorUserList.size());
	json.insert("GameUserSize", gameUserList.size());
	json.insert("VisitorID", tankGameUser.user.ID);
	json.insert("VisitorName", tankGameUser.user.Name);
	QJsonArray jsonArray;
	jsonArray.insert(0, json);
	for (int i = 0; i < gameUserList.size(); i++)
	{
		jsonArray.insert(i + 1, gameUserList[i]->ConversionJson());
	}
	return QJsonDocument(jsonArray).toJson();
}
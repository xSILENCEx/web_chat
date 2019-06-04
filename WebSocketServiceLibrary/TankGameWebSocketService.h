#pragma once

#include <QObject>
#include <QList>
#include <QWebChannel>
#include <QWebSocketServer>
#include <QWebSocket>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
#include <QTimer>
#include "Library/websockettransport.h"

#include "../OtherLibrary/Config.h"
#include "../UserManagementLibrary/DataBase.h"
#include "TankGameServer.h"
#include "TankGameUser.h"
class TankGameWebSocketService : public QObject
{
	Q_OBJECT

public:
	TankGameWebSocketService(QObject* parent = nullptr);
	~TankGameWebSocketService();
	DataBase* db;
public slots:
	void CreatChannel();

private:
	QWebSocketServer* webSocketServer;
	TankGameServer tankGameServer;
	QList<TankGameUser*> gameUserList;
	QList<TankGameUser*> visitorUserList;

	bool StartWebSocketServer();
	void ConnectSlots();
	QString UserListConversionJson();

};

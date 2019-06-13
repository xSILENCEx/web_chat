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
class TankGameWebSocketService : public QObject
{
	Q_OBJECT

public:
	TankGameWebSocketService(QObject* parent = nullptr);
	~TankGameWebSocketService();
public slots:
	void CreatChannel();

private:
	QWebSocketServer* webSocketServer;
	QWebChannel webChannel;
	TankGameServer tankGameServer;

	bool StartWebSocketServer();
	void ConnectSlots();
};

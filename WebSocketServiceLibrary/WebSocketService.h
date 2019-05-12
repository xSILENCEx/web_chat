#pragma once

#include "websocketservicelibrary_global.h"
#include <QObject>
#include <QList>
#include <QWebChannel>
#include <QWebSocketServer>
#include <QWebSocket>
#include <QJsonObject>
#include <QJsonArray>
#include <QList>
#include <QEventLoop>
#include <QTimer>
#include "Library/websockettransport.h"

#include "../OtherLibrary/Config.h"

#include "TestDataChannel.h"
#include "ChatServer.h"
#include "ChatUser.h"


class WEBSOCKETSERVICELIBRARY_EXPORT WebSocketService :public QObject
{
	Q_OBJECT

public:
	WebSocketService(QObject* parent = nullptr);
	~WebSocketService();
	bool StartWebSocketServer();
	int ss = 0;
	TestDataChannel testDataChannel;

	QJsonArray UserListConversionJson();
public slots:
	void CreatChannel();
	void AddUser(ChatUser*);
	void DeleatUser(QObject*);
signals:
	void UserChange();
private:
	QWebSocketServer* webSocketServer;
	ChatServer chatServer;
	QList<ChatUser*> loginUserList;
	QList<ChatUser*> visitorUserList;

	void ConnectSlots();
	void ArrangeUserList(QList<ChatUser*>&);
};
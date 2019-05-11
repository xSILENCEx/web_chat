#pragma once

#include "websocketservicelibrary_global.h"
#include <QObject>
#include <QList>
#include <QWebChannel>
#include <QWebSocketServer>
#include <QWebSocket>
#include <QList>
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

	TestDataChannel testDataChannel;
public slots:
	void CreatChannel();

private:
	QWebSocketServer* webSocketServer;
	void ConnectSlots();

	ChatServer chatServer;
	QList<ChatUser*> chatUserList;

};

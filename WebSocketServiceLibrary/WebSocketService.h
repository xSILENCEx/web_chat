#pragma once

#include "websocketservicelibrary_global.h"
#include <QObject>
#include <QList>
#include <QWebChannel>
#include <QWebSocketServer>
#include <QWebSocket>
#include "Library/websockettransport.h"


#include "TestDataChannel.h"
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
	
};

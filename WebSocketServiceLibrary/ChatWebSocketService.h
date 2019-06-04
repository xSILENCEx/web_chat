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
#include "ChatServer.h"
#include "ChatUser.h"


class  ChatWebSocketService :public QObject
{
	Q_OBJECT

public:
	ChatWebSocketService(QObject* parent = nullptr);
	~ChatWebSocketService();
	bool StartWebSocketServer();


	DataBase *db;
public slots:
	void CreatChannel();
	void AddUser(ChatUser*);
	void LessUser(ChatUser*);
	void DeleatUser(QObject*);
signals:

private:
	QWebSocketServer* webSocketServer;
	ChatServer chatServer;	
	QList<ChatUser*> loginUserList;
	QList<ChatUser*> visitorUserList;

	void ConnectSlots();
	void ArrangeUserList(QList<ChatUser*>&);
	QString UserListConversionJson();
};


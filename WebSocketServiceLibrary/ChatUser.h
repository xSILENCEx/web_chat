#pragma once

#include <QObject>
#include <QString>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
#include <QWebSocket>
#include <QFile>
#include <QDebug>
#include "../UserManagementLibrary/User.h"
#include "../UserManagementLibrary/Message.h"
#include "../UserManagementLibrary/DataBase.h"
class ChatUser : public QObject
{
	Q_OBJECT

public:
	ChatUser(QObject* parent = nullptr);
	~ChatUser();
	DataBase* db;
	User user;
public slots:
	bool UserRegister(QString, QString);
	bool UserLogin(QString, QString);
	bool SendUserMessage(int, QString);
	void ReceiveUserMessage(const ChatUser*, const int&, const QString&);
	void ReceiveUserlist(const QString&);
signals:
	void VisitorConversionUser(ChatUser*);
	void UserMessageToServer(const ChatUser*, const int&, const QString&);
	void ShowUserMessage(bool, const int&, const QString&);
	void ShowUserList(const QString&);
};

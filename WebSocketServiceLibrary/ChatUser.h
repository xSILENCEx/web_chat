#pragma once

#include <QObject>
#include <QJsonObject>
#include <QJsonArray>
#include <QDebug>
#include "../UserManagementLibrary/User.h"
#include "../UserManagementLibrary/Message.h"
class ChatUser : public QObject
{
	Q_OBJECT

public:
	ChatUser(QObject* parent = nullptr);
	~ChatUser();

	User user;
	QJsonObject ConversionJson();
public slots:
	bool UserSendMessage(QString);
	bool UserLogin(QString, QString);
signals:
	void UserMessageToServer(QJsonArray);
	void VisitorConversionUser(ChatUser*);
};

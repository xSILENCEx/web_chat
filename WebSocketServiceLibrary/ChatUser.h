#pragma once

#include <QObject>
#include <QJsonObject>
#include "../UserManagementLibrary/User.h"
#include "../UserManagementLibrary/Message.h"
class ChatUser : public QObject
{
	Q_OBJECT

public:
	ChatUser(QObject* parent = nullptr);
	~ChatUser();
	
	User user;

public slots:
	bool UserSendMessage(QString);
signals:
	void UserMessageToServer(QJsonObject);
};

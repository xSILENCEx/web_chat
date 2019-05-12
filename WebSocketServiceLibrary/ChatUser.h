#pragma once

#include <QObject>
#include <QString>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
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

	bool SendUserMessage(int, QString);
	void ReceiveUserMessage(const ChatUser*, const int&, const QString&);
	bool UserLogin(QString, QString);
	void ReceiveUserlist(const QString&);
signals:
	void UserMessageToServer(const ChatUser*, const int&, const QString&);
	void ShowUserMessage(bool, const int&, const QString&);
	void ShowUserList(const QString&);
	void VisitorConversionUser(ChatUser*);

};

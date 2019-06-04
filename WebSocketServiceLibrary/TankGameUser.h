#pragma once

#include <QObject>
#include <QString>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
#include <QWebSocket>
#include <QDebug>
#include "../UserManagementLibrary/User.h"
#include "../UserManagementLibrary/Message.h"
#include "../UserManagementLibrary/DataBase.h"

class TankGameUser : public QObject
{
	Q_OBJECT

public:
	TankGameUser(QObject* parent = nullptr);
	~TankGameUser();
	DataBase* db;
	User user;
	int x = 0, y = 0, direction = 0;
	QJsonObject ConversionJson();
public slots:
	bool UserLogin(QString, QString);
	bool UserLogout();
	bool SendUserMessage(int, QString);
	void ReceiveUserMessage(int, QString);
	void ReceiveUserlist(QString);
signals:
	void VisitorConversionUser(TankGameUser*);
	void UserConversionVisitor(TankGameUser*);
	void UserMessageToServer(int, QString);
	void ShowUserMessage(bool, QString);
	void ShowUserList(QString);
	void ShowUserInfo(QString);
};

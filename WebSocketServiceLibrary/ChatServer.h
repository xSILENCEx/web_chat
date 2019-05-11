#pragma once

#include <QObject>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
class ChatServer : public QObject
{
	Q_OBJECT

public:
	ChatServer(QObject* parent = nullptr);
	~ChatServer();
public slots:
	void ReceiveUserMessage(QJsonArray);
	void UpdateUserlist(QJsonArray);
signals:
	void ForwardUserMessageToBrowser(QString);
	void ForwardUserlistToBrowser(QString);
};

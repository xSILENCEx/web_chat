#pragma once

#include <QObject>
#include <QJsonObject>
#include <QJsonDocument>
class ChatServer : public QObject
{
	Q_OBJECT

public:
	ChatServer(QObject* parent = nullptr);
	~ChatServer();
public slots:
	void ReceiveUserMessage(QJsonObject);
signals:
	void ForwardUserMessageToBrowser(QString);
};

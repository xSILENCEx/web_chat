#pragma once

#include <QObject>
#include <QString>


#include "ChatUser.h"
class ChatServer : public QObject
{
	Q_OBJECT

public:
	ChatServer(QObject* parent = nullptr);
	~ChatServer();
public slots:
	void ReceiveUserMessage(ChatUser*, QString);
signals:
	void ForwardUserMessage(ChatUser*, QString);
	void ForwardUserlist(QString);
};

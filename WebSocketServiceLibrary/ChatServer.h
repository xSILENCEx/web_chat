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
	void ReceiveUserMessage(const ChatUser*, const int&, const QString&);
signals:
	void ForwardUserMessage(const ChatUser*, const int&, const QString&);
	void ForwardUserlist(const QString&);
};

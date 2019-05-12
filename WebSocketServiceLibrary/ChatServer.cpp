#include "ChatServer.h"

ChatServer::ChatServer(QObject* parent)
	: QObject(parent)
{
}

ChatServer::~ChatServer()
{
}
void ChatServer::ReceiveUserMessage(const ChatUser* chatUser, const int& type, const QString& message)
{
	emit ForwardUserMessage(chatUser, type, message);
}
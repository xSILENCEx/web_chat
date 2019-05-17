#include "ChatServer.h"

ChatServer::ChatServer(QObject* parent)
	: QObject(parent)
{
}

ChatServer::~ChatServer()
{
}
void ChatServer::ReceiveUserMessage(ChatUser* chatUser, QString message)
{
	emit ForwardUserMessage(chatUser, message);
}
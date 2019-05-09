#include "ChatServer.h"

ChatServer::ChatServer(QObject *parent)
	: QObject(parent)
{
}

ChatServer::~ChatServer()
{
}
void ChatServer::ReceiveUserMessage(QJsonObject json)
{
	emit ForwardUserMessageToBrowser(QJsonDocument(json).toJson());
}
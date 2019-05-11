#include "ChatServer.h"

ChatServer::ChatServer(QObject *parent)
	: QObject(parent)
{
}

ChatServer::~ChatServer()
{
}
void ChatServer::ReceiveUserMessage(QJsonArray jsonArray)
{
	emit ForwardUserMessageToBrowser(QJsonDocument(jsonArray).toJson());
}
void ChatServer::UpdateUserlist(QJsonArray jsonArray)
{
	emit ForwardUserlistToBrowser(QJsonDocument(jsonArray).toJson());
}
#include "TankGameServer.h"

TankGameServer::TankGameServer(QObject *parent)
	: QObject(parent)
{
}

TankGameServer::~TankGameServer()
{
}
void TankGameServer::SendUserMessage(QString message)
{
	emit ShowUserMessage(message);
}
#include "TankGameServer.h"

TankGameServer::TankGameServer(QObject *parent)
	: QObject(parent)
{
}

TankGameServer::~TankGameServer()
{
}
void TankGameServer::ReceiveUserMessage(int id, QString message)
{
	emit ForwardUserMessage(id, message);
}
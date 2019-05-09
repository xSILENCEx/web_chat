#include "Message.h"

Message::Message(QObject *parent)
	: QObject(parent)
{
	Time = QDateTime::currentDateTime();
}

Message::~Message()
{
}

#include "TestDataChannel.h"

TestDataChannel::TestDataChannel(QObject *parent)
	: QObject(parent)
{
}

TestDataChannel::~TestDataChannel()
{
}
void TestDataChannel::SendMessage(QString message)
{
	messageID++;
	emit ForwardMessage("MessageID:"+QString::number(messageID)+". Message:"+message);
}
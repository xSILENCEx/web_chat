#include "Message.h"

Message::Message(QObject *parent)
	: QObject(parent)
{
	Time = QDateTime::currentDateTime();
}

Message::~Message()
{
}
QJsonObject Message::ConversionJson()
{
	QJsonObject json;
	json.insert("MessageContent", Content);
	json.insert("MessageType", Type);
	json.insert("MessageTime", Time.toString("yyyy-MM-dd hh:mm:ss"));
	return json;
}
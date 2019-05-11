#include "ChatUser.h"

ChatUser::ChatUser(QObject* parent)
	: QObject(parent)
{
	user.Name = QString::fromLocal8Bit("сн©м");
}

ChatUser::~ChatUser()
{
}
bool ChatUser::UserSendMessage(QString s)
{
	Message message;
	message.Content = s;
	QJsonArray jsonArray;
	jsonArray.insert(0, user.ConversionJson());
	jsonArray.insert(1, message.ConversionJson());
	emit UserMessageToServer(jsonArray);
	return true;
}
bool ChatUser::UserLogin(QString name, QString password)
{
	qInfo() << tr("User Login:%1").arg(name);
	user.Name = name;
	user.Password = password;
	emit VisitorConversionUser(this);
	return true;
}

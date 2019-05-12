#include "ChatUser.h"

ChatUser::ChatUser(QObject* parent)
	: QObject(parent)
{
	user.Name = QString::fromLocal8Bit("�ο�");
}

ChatUser::~ChatUser()
{
}
bool ChatUser::SendUserMessage(int type, QString s)
{
	Message message;
	message.Content = s;
	QJsonArray jsonArray;
	jsonArray.insert(0, user.ConversionJson());
	jsonArray.insert(1, message.ConversionJson());
	emit UserMessageToServer(this, type, QJsonDocument(jsonArray).toJson());
	return true;
}

void ChatUser::ReceiveUserMessage(const ChatUser* chatUser, const int& type, const QString& message)
{
	emit ShowUserMessage(this == chatUser, type, message);
}
void ChatUser::ReceiveUserlist(const QString& userlist)
{
	emit ShowUserList(userlist);
}
bool ChatUser::UserLogin(QString name, QString password)
{
	qInfo() << tr("User Login:%1").arg(name);
	user.Name = name;
	user.Password = password;
	emit VisitorConversionUser(this);
	return true;
}

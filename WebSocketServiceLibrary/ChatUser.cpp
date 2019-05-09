#include "ChatUser.h"

ChatUser::ChatUser(QObject *parent)
	: QObject(parent)
{

}

ChatUser::~ChatUser()
{
}
bool ChatUser::UserSendMessage(QString s)
{
	Message message;
	message.Content = s;
	QJsonObject json;
	json.insert("UserName", user.Name);
	json.insert("UserFaviconID", user.FaviconID);
	json.insert("MessageContent", message.Content);
	emit UserMessageToServer(json);
	return true;
}
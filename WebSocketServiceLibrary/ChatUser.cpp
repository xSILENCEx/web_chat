#include "ChatUser.h"

ChatUser::ChatUser(QObject* parent)
	: QObject(parent)
{
	user.Name = QString::fromLocal8Bit("сн©м");

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
bool ChatUser::UserRegister(QString name, QString password)
{
	int id = db->UserSelectID(name, password);
	if (id == -1)
	{
		if (db->UserRegister(name, password))
		{
			if (QFile("../UserResource/UserFavicon/-1.svg").copy("../UserResource/UserFavicon/"+QString::number(db->UserSelectID(name, password))+".svg"))
			{
				qInfo() << tr("User Register:%1.IP:%2").arg(name).arg(((QWebSocket*)this->parent()->parent()->parent())->peerAddress().toString());
				return true;
			}
		}
	}
	return false;
}
bool ChatUser::UserLogin(QString name, QString password)
{
	int id = db->UserSelectID(name, password);
	if (id != -1)
	{
		User u = db->UserSelectAll(id);
		user.ID = u.ID;
		user.Name = u.Name;
		user.Password = u.Password;
		user.Profile = u.Profile;
		user.Permission = u.Permission;
		emit VisitorConversionUser(this);
		qInfo() << tr("User Login:%1.IP:%2").arg(name).arg(((QWebSocket*)this->parent()->parent()->parent())->peerAddress().toString());
		return true;
	}
	return false;
}

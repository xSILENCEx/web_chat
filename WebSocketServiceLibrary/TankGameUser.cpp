#include "TankGameUser.h"

TankGameUser::TankGameUser(QObject* parent)
	: QObject(parent)
{
}

TankGameUser::~TankGameUser()
{
}
bool TankGameUser::SendUserMessage(int type, QString content)
{
	Message message;
	message.Type = type;
	if (type == 1)
		message.Content = content;
	else
		return false;
	emit UserMessageToServer(user.ID, QJsonDocument(message.ConversionJson()).toJson());
	return true;
}
void TankGameUser::ReceiveUserMessage(int id, QString message)
{
	emit ShowUserMessage(id, message);
}
void TankGameUser::ReceiveUserlist(QString userlist)
{
	emit ShowUserList(userlist);
}
bool TankGameUser::UserLogin(QString name, QString password)
{
	int id = db->UserSelectID(name, password);
	if (id != -1)
	{
		if (user.ID == id)
		{
			return true;
		}
		user = db->UserSelectAll(id);
		emit ShowUserInfo(QJsonDocument(user.ConversionJson()).toJson());
		emit VisitorConversionUser(this);
		qInfo() << tr("User Login:%1.IP:%2").arg(name).arg(((QWebSocket*)this->parent()->parent()->parent())->peerAddress().toString());
		return true;
	}
	else
	{
		if (user.ID != -1)
		{
			user = User();
			emit ShowUserInfo(QJsonDocument(user.ConversionJson()).toJson());
			emit UserConversionVisitor(this);
			return false;
		}
		else
		{
			return false;
		}
	}
}
bool TankGameUser::UserLogout()
{
	if (user.ID != -1)
	{
		user = User();
		emit ShowUserInfo(QJsonDocument(user.ConversionJson()).toJson());
		emit UserConversionVisitor(this);
		return false;
	}
	else
	{
		return false;
	}
}
QJsonObject TankGameUser::ConversionJson()
{
	QJsonObject json;
	json.insert("UserID", user.ID);
	json.insert("UserName", user.Name); 
	//json.insert("p", user.Name);
	json.insert("X", x);
	json.insert("Y", y);
	json.insert("Direction", direction);
	return json;
}
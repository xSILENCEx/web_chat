#include "ChatUser.h"

ChatUser::ChatUser(QObject* parent)
	: QObject(parent)
{
	user.Name = QString::fromLocal8Bit("ÓÎ¿Í");

}

ChatUser::~ChatUser()
{
}
bool ChatUser::SendUserMessage(int type, QString content)
{
	Message message;
	message.Type = type;
	if (type == 1)
		message.Content = content;
	else if (type == 2 || type == 3)
	{
		QString filename = ReceiveUserFile(content);
		if (!filename.isEmpty())
			message.Content = filename;
		else
			return false;
	}
	else
		return false;
	QJsonArray jsonArray;
	jsonArray.insert(0, user.ConversionJson());
	jsonArray.insert(1, message.ConversionJson());
	emit UserMessageToServer(this, QJsonDocument(jsonArray).toJson());
	return true;
}

void ChatUser::ReceiveUserMessage(ChatUser* chatUser, QString message)
{
	emit ShowUserMessage(this == chatUser, message);
}
void ChatUser::ReceiveUserlist(QString userlist)
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
			if (QFile("../UserResource/UserFavicon/-1.svg").copy("../UserResource/UserFavicon/" + QString::number(db->UserSelectID(name, password)) + ".svg"))
			{
				qInfo() << tr("User Register:%1.IP:%2").arg(name).arg(((QWebSocket*)this->parent()->parent()->parent())->peerAddress().toString());
				emit ShowServerTips(1, QString::fromLocal8Bit("×¢²á³É¹¦!"));
				return true;
			}
			else
			{
				emit ShowServerTips(3, QString::fromLocal8Bit("³õÊ¼»¯ÓÃ»§ÐÅÏ¢Ê§°Ü!"));
				return false;
			}
		}
		else
		{
			emit ShowServerTips(3, QString::fromLocal8Bit("×¢²áÊ§°Ü!"));
			return false;
		}
	}
	else
	{
		emit ShowServerTips(2, QString::fromLocal8Bit("ÒÑ×¢²á!<br/>ÇëÎðÖØ¸´×¢²á"));
		return true;
	}

}
bool ChatUser::UserLogin(QString name, QString password)
{
	int id = db->UserSelectID(name, password);
	if (id != -1)
	{
		if (user.ID == id)
		{
			emit ShowServerTips(2, QString::fromLocal8Bit("ÒÑµÇÂ¼!<br/>ÇëÎðÖØ¸´µÇÂ¼"));
			return true;
		}
		User u = db->UserSelectAll(id);
		user.ID = u.ID;
		user.Name = u.Name;
		user.Password = u.Password;
		user.Profile = u.Profile;
		user.Permission = u.Permission;
		emit ShowUserInfo(QJsonDocument(user.ConversionJson()).toJson());
		emit VisitorConversionUser(this);
		emit ShowServerTips(1, QString::fromLocal8Bit("µÇÂ¼³É¹¦!"));
		qInfo() << tr("User Login:%1.IP:%2").arg(name).arg(((QWebSocket*)this->parent()->parent()->parent())->peerAddress().toString());
		return true;
	}
	else
	{
		if (user.ID != -1)
		{
			user.ID = -1;
			user.Name = QString::fromLocal8Bit("ÓÎ¿Í");
			user.Password = "";
			user.Profile = "";
			user.Permission = -1;
			emit ShowUserInfo(QJsonDocument(user.ConversionJson()).toJson());
			emit UserConversionVisitor(this);
			emit ShowServerTips(2, QString::fromLocal8Bit("ÕËºÅÃÜÂë´íÎó!<br/>Çë¼ì²é"));
			return false;
		}
		else
		{
			emit ShowServerTips(2, QString::fromLocal8Bit("ÕËºÅÃÜÂë´íÎó!<br/>Çë¼ì²é"));
			return false;
		}
	}
}
QString ChatUser::ReceiveUserFile(QString filestring)
{
	QJsonObject jsonObject = QJsonDocument::fromJson(filestring.toUtf8()).object();
	QByteArray byteArray1 = jsonObject.value("file").toString().split(',').at(1).toUtf8();
	QByteArray byteArray2 = QByteArray::fromBase64(byteArray1);
	QString filename = QDateTime::currentDateTime().toString("yyyyMMddhhmmss") + jsonObject.value("filename").toString();
	QFile file("../UserResource/File/" + filename);
	if (file.open(QIODevice::WriteOnly))
	{
		file.write(byteArray2);
		file.close();
		return filename;
	}
	return "";
}
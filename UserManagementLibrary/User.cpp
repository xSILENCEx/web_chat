#include "User.h"

User::User(QObject* parent)
	: QObject(parent)
{
}

User::~User()
{
}
QJsonObject User::ConversionJson()
{
	QJsonObject json;
	json.insert("UserID", ID);
	json.insert("UserName", Name);
	return json;
}
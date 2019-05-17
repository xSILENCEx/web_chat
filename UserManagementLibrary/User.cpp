#include "User.h"

User::User(QObject* parent)
	: QObject(parent)
{
}
User::User(const User& user)
{
	ID = user.ID;
	Name = user.Name;
	Password = user.Password;
	Profile = user.Profile;
	Permission = user.Permission;
}
User::~User()
{
}
QJsonObject User::ConversionJson()
{
	QJsonObject json;
	json.insert("UserID", ID);
	json.insert("UserName", Name);
	//json.insert("UserPassword", Password);
	json.insert("UserProfile", Profile);
	//json.insert("UserPermission", Permission);
	return json;
}
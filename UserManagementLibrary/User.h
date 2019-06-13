#pragma once
#include "usermanagementlibrary_global.h"
#include <QObject>
#include <QString>
#include <QJsonObject>
class USERMANAGEMENTLIBRARY_EXPORT User : public QObject
{
	Q_OBJECT

public:
	User(QObject* parent = nullptr);
	User(const User&);
	User& operator =(const User&);
	~User();

	int ID = -1;
	QString Name=QString::fromLocal8Bit("сн©м");
	QString Password;
	QString Profile;
	QString Favicon="-1.svg";
	int Permission = -1;
	QJsonObject ConversionJson();

};

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
	~User();

	int ID = -1;
	QString Name;
	QString Password;
	QString Profile;
	int Permission=-1;
	QJsonObject ConversionJson();

};

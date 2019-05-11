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
	~User();

	int ID = -1;
	QString Name;
	QString Password;
	QJsonObject ConversionJson();

};

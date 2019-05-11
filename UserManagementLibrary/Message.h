#pragma once
#include "usermanagementlibrary_global.h"
#include <QObject>
#include <QDateTime>
#include <QJsonObject>
class USERMANAGEMENTLIBRARY_EXPORT Message : public QObject
{
	Q_OBJECT

public:
	Message(QObject* parent = nullptr);
	~Message();

	int ID;
	QString Content;
	QDateTime Time;
	QJsonObject ConversionJson();
};

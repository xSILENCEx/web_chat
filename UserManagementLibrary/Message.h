#pragma once
#include "usermanagementlibrary_global.h"
#include <QObject>
#include <QDateTime>
class USERMANAGEMENTLIBRARY_EXPORT Message : public QObject
{
	Q_OBJECT

public:
	Message(QObject* parent = nullptr);
	~Message();

	int ID;
	QString Content;
	QDateTime Time;
};

#pragma once

#include "otherlibrary_global.h"
#include <QObject>
#include <QString>
#include <QDateTime>
#include <QDebug>
class OTHERLIBRARY_EXPORT Logger : public QObject
{
	Q_OBJECT

public:
	Logger(QObject* = nullptr);
	~Logger();
	void MessageCreate(QtMsgType type, const QString& msg);
signals:
	void MessageOutput(QString);
};

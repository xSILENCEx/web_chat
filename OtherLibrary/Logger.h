#pragma once

#include "otherlibrary_global.h"
#include <QObject>
#include <QString>
#include <QDateTime>
#include <QFile>
#include <QDebug>

#include "Config.h"
class OTHERLIBRARY_EXPORT Logger : public QObject
{
	Q_OBJECT

public:
	Logger(QObject* = nullptr);
	~Logger();
	void MessageCreate(QtMsgType type, const QString& msg);
	void MessageOutput(int,QString);
	void MessageToStdio(QString);
	void MseeageToFile(QString, QString);
signals:
	void ForwardMseeage(int, QString);
};

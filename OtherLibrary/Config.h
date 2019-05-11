#pragma once

#include "otherlibrary_global.h"
#include <QObject>
#include <QSettings>
#include <QHostAddress>
#include <QVariant>
#include <QDebug>
class OTHERLIBRARY_EXPORT Config : public QObject
{
	Q_OBJECT

public:
	Config(QObject* = nullptr);
	~Config();

	QSettings* Settings;

private:
	QString path = "../UserResource/ModuleTest.ini";

	void KeyCheck(const QString& prefix, const QString& key, const QVariant& value);
	void CreatDefaultConfig();

};

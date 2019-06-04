#include "Config.h"

Config::Config(QObject* parent)
	: QObject(parent)
{
	Settings = new QSettings(path, QSettings::IniFormat, this);
	CreatDefaultConfig();
}

Config::~Config()
{
}
void Config::KeyCheck(const QString & prefix,const QString& key, const QVariant& value)
{
	if (!Settings->contains(prefix+"/"+key))
	{
		qDebug() << tr("Creat Config key:%1 | %2 | %3").arg(prefix).arg(key).arg(value.toString());
		Settings->beginGroup(prefix);
		Settings->setValue(key, value);
		Settings->endGroup();
		Settings->sync();
	}
}
void Config::CreatDefaultConfig()
{
	KeyCheck("HttpServer","Address", QHostAddress(QHostAddress::AnyIPv4).toString());
	KeyCheck("HttpServer","Port", 80);

	KeyCheck("ChatWebSocketServer","Address", QHostAddress(QHostAddress::AnyIPv4).toString());
	KeyCheck("ChatWebSocketServer","Port", 12345);

	KeyCheck("TankGameWebSocketServer", "Address", QHostAddress(QHostAddress::AnyIPv4).toString());
	KeyCheck("TankGameWebSocketServer", "Port", 12346);

	KeyCheck("Log", "Stderr", true);
	KeyCheck("Log", "File", false);
	KeyCheck("Log", "FilePath", "../UserResource/ModuleTest.log");
	KeyCheck("Log", "Level", 0);
}
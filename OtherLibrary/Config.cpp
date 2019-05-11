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

	KeyCheck("WebSocketServer","Address", QHostAddress(QHostAddress::AnyIPv4).toString());
	KeyCheck("WebSocketServer","Port", 12345);


}
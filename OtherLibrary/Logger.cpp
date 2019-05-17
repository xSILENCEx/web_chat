#include "Logger.h"

Logger::Logger(QObject* parent)
	: QObject(parent)
{
}

Logger::~Logger()
{
}
void Logger::MessageCreate(QtMsgType type, const QString& msg)
{
	int level = 0;
	QString message;
	switch (type)
	{
	case QtDebugMsg:
		level = 0;
		message = tr("[%1]-[Debug]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss")).arg(msg);
		break;
	case QtInfoMsg:
		level = 1;
		message = tr("[%1]-[Info]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss")).arg(msg);
		break;
	case QtWarningMsg:
		level = 2;
		message = tr("[%1]-[Warning]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss")).arg(msg);
		break;

	case QtCriticalMsg:
		level = 3;
		message = tr("[%1]-[Critical]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss")).arg(msg);
		break;

	case QtFatalMsg:
		level = 4;
		message = tr("[%1]-[Fatal:]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss")).arg(msg);
		break;
	}
	MessageOutput(level, message);
}
void Logger::MessageToStdio(QString message)
{
	fprintf(stderr, "%s\n", message.toLocal8Bit().constData());
}
void Logger::MseeageToFile(QString fileName, QString message)
{
	QFile file(fileName);
	if (file.open(QIODevice::WriteOnly | QIODevice::Append))
	{
		QTextStream fileStream(&file);
		fileStream.setCodec("UTF-8");
		fileStream << message << endl;
		file.close();
	}
}
void Logger::MessageOutput(int level, QString message)
{
	Config config;
	if (level >= config.Settings->value("log/Level").toInt())
	{
		if (config.Settings->value("log/Stderr").toBool())
		{
			MessageToStdio(message);
		}
		if (config.Settings->value("log/File").toBool())
		{
			MseeageToFile(config.Settings->value("log/FilePath").toString(), message);
		}
	}
	emit ForwardMseeage(level, message);
}


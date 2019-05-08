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

	QString message;
	switch (type)
	{
	case QtDebugMsg:
		message = tr("[%1]-[Debug]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;
	case QtInfoMsg:
		message = tr("[%1]-[Info]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;
	case QtWarningMsg:
		message = tr("[%1]-[Warning]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;

	case QtCriticalMsg:
		message = tr("[%1]-[Critical]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;

	case QtFatalMsg:
		message = tr("[%1]-[Fatal:]:%2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;
	}
	fprintf(stderr, "%s\n", message.toLocal8Bit().constData());
	emit MessageOutput(message);
}
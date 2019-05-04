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
		message = QString("[%1]-[Debug]: %2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;
	case QtInfoMsg:
		message = QString("[%1]-[Info]: %2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;
	case QtWarningMsg:
		message = QString("[%1]-[Warning]: %2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;

	case QtCriticalMsg:
		message = QString("[%1]-[Critical]: %2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;

	case QtFatalMsg:
		message = QString("[%1]-[Fatal:]: %2").arg(QDateTime::currentDateTime().toString("yyyy-MM-dd hh:mm:ss ddd")).arg(msg);
		break;
	}
	fprintf(stderr, "%s\n", message.toLocal8Bit().constData());
	emit MessageOutput(message);
}
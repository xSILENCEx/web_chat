#include <QtCore/QCoreApplication>
#include "../OtherLibrary/Logger.h"
#include <QDebug>
Logger* logger;
void LogMessage(QtMsgType type, const QMessageLogContext& context, const QString& msg)
{
	logger->MessageCreate(type, msg);
}
int main(int argc, char *argv[])
{
	QCoreApplication a(argc, argv);
	logger = new Logger(&a);

	qInstallMessageHandler(LogMessage);
	qDebug() << "123";
	return a.exec();
}

#include <QtCore/QCoreApplication>


#include "../OtherLibrary/Logger.h"
#include "../HttpServiceLibrary/HttpService.h"
#include "../WebSocketServiceLibrary/WebSocketService.h"


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
	qDebug() << "Start Test\n\n\n";
	WebSocketService webSocketService(&a);

	HttpService httpService(&a);
	httpService.StartHttpServer();

	return a.exec();
}

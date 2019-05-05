#include "HttpService.h"

HttpService::HttpService(QObject* parent)
	: QObject(parent)
{
	
	SetHttpRoute();
}
HttpService::~HttpService()
{
}
bool HttpService::StartHttpServer()
{
	int port = httpServer.listen(QHostAddress::Any, 80);
	if (port == -1) {
		qWarning() << tr("QHttpServer not run.");
		return false;
	}
	else
	{
		qInfo() << tr("QHttpServer Running on http://%1:%2/").arg("0.0.0.0").arg(port);
		return true;
	}
}
void HttpService::FileResponse(QString fileName, QHttpServerResponder* responder)
{
	QFile file(fileName);
	if (file.open(QIODevice::ReadOnly))
	{
		
		//QTextStream fileStream(&file);
		//fileStream.setCodec("UTF-8");
		QMimeDatabase mimeDatabase;
		qDebug() << tr("QHttpServer Response Success:%1 - %2").arg(file.fileName()).arg(mimeDatabase.mimeTypeForFile(fileName).name());
		responder->write(file.readAll(), mimeDatabase.mimeTypeForFile(fileName).name().toUtf8());
	}
	else
	{
		qWarning() << tr("QQHttpServer Response Failure: File not open - %1").arg(file.fileName());
		responder->write(QHttpServerResponder::StatusCode::NotFound);
	}
}
void HttpService::SetHttpRoute()
{
	httpServer.route("/", [=](QHttpServerResponder && responder) {
		FileResponse(QString("Html/") + "index.html", &responder);
		});
	httpServer.route("/favicon.ico", [=](QHttpServerResponder && responder) {
		FileResponse(QString("Html/") + "favicon.ico", &responder);
		});
	httpServer.route("/js/<arg>", [=](QString fileName,QHttpServerResponder && responder) {
		FileResponse(QString("Html/js/") + fileName, &responder);
		});
	httpServer.route("/css/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("Html/css/") + fileName, &responder);
		});
	httpServer.route("/img/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("Html/img/") + fileName, &responder);
		});
}
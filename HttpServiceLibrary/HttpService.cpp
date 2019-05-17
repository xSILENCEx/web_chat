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
	Config config;
	int port = httpServer.listen(QHostAddress(config.Settings->value("HttpServer/Address").toString()), config.Settings->value("HttpServer/Port").toInt());
	if (port == -1) {
		qWarning() << tr("QHttpServer not run.");
		return false;
	}
	else
	{
		qInfo() << tr("QHttpServer Running on http://%1:%2/").arg(config.Settings->value("HttpServer/Address").toString()).arg(port);
		return true;
	}
}
void HttpService::FileResponse(QString fileName, QHttpServerResponder* responder)
{
	QFile file(fileName);
	if (file.open(QIODevice::ReadOnly))
	{
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
		FileResponse(QString("../web_chat/") + "index.html", &responder);
		});
	httpServer.route("/favicon.ico", [=](QHttpServerResponder && responder) {
		FileResponse(QString("../web_chat/") + "favicon.ico", &responder);
		});
	httpServer.route("/js/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("../web_chat/js/") + fileName, &responder);
		});
	httpServer.route("/css/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("../web_chat/css/") + fileName, &responder);
		});
	httpServer.route("/img/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("../web_chat/img/") + fileName, &responder);
		});
	httpServer.route("/UserFavicon/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("../UserResource/UserFavicon/") + fileName, &responder);
		});
	httpServer.route("/File/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("../UserResource/File/") + fileName, &responder);
		});
}
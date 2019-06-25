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
void HttpService::FileResponse(QString fileName, QHttpServerResponder* responder,int type)
{
	QFile file;
	if (type != 0)
	{
		if (QFile::exists(QString("../web_chat/") + fileName))
			file.setFileName(QString("../web_chat/") + fileName);
		else if (QFile::exists(QString("../web_game/") + fileName))
			file.setFileName(QString("../web_game/") + fileName);
		else
		{
			qWarning() << tr("QHttpServer Response Failure: File not exist - %1").arg(file.fileName());
			responder->write(QHttpServerResponder::StatusCode::NotFound);
		}
	}
	else
	{
		file.setFileName(fileName);
	}
	if (file.open(QIODevice::ReadOnly))
	{
		QMimeDatabase mimeDatabase;
		qDebug() << tr("QHttpServer Response Success:%1 - %2").arg(file.fileName()).arg(mimeDatabase.mimeTypeForFile(fileName).name());
		responder->write(file.readAll(), mimeDatabase.mimeTypeForFile(fileName).name().toUtf8());
	}
	else
	{
		qWarning() << tr("QHttpServer Response Failure: File not open - %1").arg(file.fileName());
		responder->write(QHttpServerResponder::StatusCode::NotFound);
	}
}
void HttpService::SetHttpRoute()
{
	httpServer.route("/", [=](QHttpServerResponder && responder) {
		FileResponse("index.html", &responder,1);
		});
	httpServer.route("/game", [=](QHttpServerResponder&& responder) {
		FileResponse("tank_index.html", &responder, 1);
		});
	httpServer.route("/favicon.ico", [=](QHttpServerResponder && responder) {
		FileResponse("favicon.ico", &responder,1);
		});
	httpServer.route("/tank_favicon.ico", [=](QHttpServerResponder&& responder) {
		FileResponse("tank_favicon.ico", &responder, 1);
		});
	httpServer.route("/js/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("js/") + fileName, &responder,1);
		});
	httpServer.route("/css/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("css/") + fileName, &responder,1);
		});
	httpServer.route("/img/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("img/") + fileName, &responder,1);
		});
	httpServer.route("/UserFavicon/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("../UserResource/UserFavicon/") + fileName, &responder);
		});
	httpServer.route("/File/<arg>", [=](QString fileName, QHttpServerResponder && responder) {
		FileResponse(QString("../UserResource/File/") + fileName, &responder);
		});
}
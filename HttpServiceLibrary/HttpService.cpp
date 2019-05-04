#include "HttpService.h"

HttpService::HttpService(QObject* parent)
	: QObject(parent)
{
	StartHttpServer();
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
		qInfo() << tr("QHttpServer Running on http://127.0.0.1:%1/").arg(port);
		return true;
	}
}
void HttpService::SetHttpRoute()
{
	httpServer.route("/", []() {
		QFile file(QString("Html/") + "index.html");
		if (file.open(QIODevice::ReadOnly))
		{
			qDebug() << "QHttpServer Response Success:" + file.fileName();
		}
		else
		{
			qWarning() << "QHttpServer Response Failure: File not open - " + file.fileName();
		}
		
		return  file.readAll();
		});
	httpServer.route("/favicon.ico", []() {
		QFile file(QString("Html/") + "favicon.ico");
		if (file.open(QIODevice::ReadOnly))
		{
			qDebug() << "QHttpServer Response Success:" + file.fileName();
		}
		else
		{
			qWarning() << "QHttpServer Response Failure: File not open - " + file.fileName();
		}
		return  file.readAll();
		});

	httpServer.route("/<arg>/<arg>", [](QString fileName1, QString fileName2) {
		QFile file;
		if (fileName1 == "js" || fileName1 == "css" || fileName1 == "btn-icon" || fileName1 == "headImages")
			file.setFileName(QString("Html/") + fileName1 + "/" + fileName2);
		if (file.open(QIODevice::ReadOnly))
		{
			qDebug() << "QHttpServer Response Success:" + file.fileName();
		}
		else
		{
			qWarning() << "QHttpServer Response Failure: File not open - " + file.fileName();
		}
		return  file.readAll();
		});
	httpServer.route("/<arg>/<arg>/<arg>", [](QString fileName1, QString fileName2, QString fileName3) {
		QFile file;
		if (fileName1 == "css" || fileName1 == "headImages")
			if (fileName2 == "btn" || fileName2 == "img-css")
				file.setFileName(QString("Html/") + fileName1 + "/" + fileName2 + "/" + fileName3);
		if (file.open(QIODevice::ReadOnly))
		{
			qDebug() << "QHttpServer Response Success:" + file.fileName();
		}
		else
		{
			qWarning() << "QHttpServer Response Failure: File not open - " + file.fileName();
		}
		return  file.readAll();
		});

}
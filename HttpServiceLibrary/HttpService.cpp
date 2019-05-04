#include "HttpService.h"

HttpService::HttpService(QObject* parent)
	: QObject(parent)
{
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
		QFile a("index.html");
		if (a.open(QIODevice::ReadOnly))
		{
			qDebug() << "QHttpServer Response Success: index.html";
			return  a.readAll();
		}
		else
		{
			qDebug() << "QHttpServer Response Failure: index.html";
			//return  QHttpServerResponder::StatusCode::NotFound;
		}
		});
	httpServer.route("/<arg>.js", [](QString id, const QHttpServerRequest & request) {
		//qDebug() << id;
		QFile a(id);
		a.open(QIODevice::ReadOnly);
		return  a.readAll();
		});
}
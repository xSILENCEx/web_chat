#pragma once

#include "httpservicelibrary_global.h"


#include <QObject>
#include <QtHttpServer>
#include <QFile>
#include <QBitArray>
#include <QString>

#include "../OtherLibrary/Config.h"
class HTTPSERVICELIBRARY_EXPORT HttpService : public QObject
{
	Q_OBJECT

public:
	HttpService(QObject* = nullptr);
	~HttpService();
	
	bool StartHttpServer();
	
	void SetHttpRoute();

private:
	QHttpServer httpServer;
	void FileResponse(QString fileName, QHttpServerResponder* responder);
};


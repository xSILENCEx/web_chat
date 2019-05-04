#pragma once

#include "httpservicelibrary_global.h"


#include <QObject>
#include <QtHttpServer>
#include <QFile>
#include <QBitArray>
#include <QString>
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
};


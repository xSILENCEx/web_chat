#pragma once

#include "httpservicelibrary_global.h"
#include <QObject>
class HTTPSERVICELIBRARY_EXPORT HttpService : public QObject
{
	Q_OBJECT

public:
	HttpService(QObject* = nullptr);
	~HttpService();
};


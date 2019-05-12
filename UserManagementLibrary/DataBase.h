#pragma once
#include "usermanagementlibrary_global.h"
#include <QObject>
#include <QSqlDatabase>
#include <QSqlQuery>
#include <QSqlError>
#include <QDebug>
class USERMANAGEMENTLIBRARY_EXPORT DataBase : public QObject
{
	Q_OBJECT

public:
	DataBase(QObject* parent = nullptr);
	~DataBase();
};

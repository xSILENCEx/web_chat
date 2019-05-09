#pragma once

#include "usermanagementlibrary_global.h"
#include <QObject>

class USERMANAGEMENTLIBRARY_EXPORT UserManagement:QObject
{
	Q_OBJECT
public:
	UserManagement(QObject* parent = nullptr);
	~UserManagement();
};

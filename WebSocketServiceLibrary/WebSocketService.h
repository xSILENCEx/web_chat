#pragma once

#include "websocketservicelibrary_global.h"
#include <QObject>

#include "../UserManagementLibrary/DataBase.h"
#include "ChatWebSocketService.h"
#include "TankGameWebSocketService.h"
class WEBSOCKETSERVICELIBRARY_EXPORT WebSocketService :public QObject
{
	Q_OBJECT

public:
	WebSocketService(QObject* parent = nullptr);
	~WebSocketService();
	DataBase db;
	ChatWebSocketService chatWebSocketService;
	TankGameWebSocketService tankGameWebSocketService;
};

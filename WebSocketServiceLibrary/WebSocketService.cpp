#include "WebSocketService.h"

WebSocketService::WebSocketService(QObject* parent)
	: QObject(parent)
{
	db.CreatBaseDDataBase();
	chatWebSocketService.db = &db;
}
WebSocketService::~WebSocketService()
{
}

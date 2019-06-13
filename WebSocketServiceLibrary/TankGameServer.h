#pragma once

#include <QObject>

class TankGameServer : public QObject
{
	Q_OBJECT

public:
	TankGameServer(QObject* parent = nullptr);
	~TankGameServer();
public slots:
	void SendUserMessage(QString);
signals:
	void ShowUserMessage(QString);
};

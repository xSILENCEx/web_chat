#pragma once

#include <QObject>

class TankGameServer : public QObject
{
	Q_OBJECT

public:
	TankGameServer(QObject* parent = nullptr);
	~TankGameServer();
public slots:
	void ReceiveUserMessage(int, QString);
signals:
	void ForwardUserMessage(int, QString);
	void ForwardUserlist(QString);
};

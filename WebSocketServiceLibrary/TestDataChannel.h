#pragma once
#include <QObject>

class TestDataChannel : public QObject
{
	Q_OBJECT

public:
	TestDataChannel(QObject *parent = nullptr);
	~TestDataChannel();
	int messageID=0;
public slots:
	void SendMessage(QString);
signals:
	void ForwardMessage(QString);
};

#include "DataBase.h"

DataBase::DataBase(QObject *parent)
	: QObject(parent)
{
	QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE", "sqlite1");
	db.setDatabaseName("../UserResource/qtDb.db");
	db.open();
	QSqlDatabase db1 = QSqlDatabase::database("sqlite1");

	QSqlQuery sql_query(db1);
	QString create_sql = "create table student (id int primary key, name varchar(30), age int)";
	sql_query.prepare(create_sql);
	if (!sql_query.exec())
	{
		qDebug() << "Error: Fail to create table." << sql_query.lastError();
	}
	else
	{
		qDebug() << "Table created!";
	}
	/*QString insert_sql = "insert into student values (?, ?, ?)";
	sql_query.prepare(insert_sql);
	sql_query.addBindValue(max_id + 1);
	sql_query.addBindValue("Wang");
	sql_query.addBindValue(25);*/
}

DataBase::~DataBase()
{
}

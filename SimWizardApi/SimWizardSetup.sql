CREATE DATABASE SimWizard;

USE SimWizard;

CREATE TABLE service(
	id int not null IDENTITY(1,1) PRIMARY KEY,
	name varchar(40) not null,
	status varchar(7) not null,
	month char(3) not null,
);

CREATE TABLE task(
	id int not null IDENTITY(1,1) PRIMARY KEY,
	status varchar(7) not null,
	owner varchar(30) not null,
	description varchar(50) not null,
	category varchar(12) not null,
	targetdate datetime not null,
);
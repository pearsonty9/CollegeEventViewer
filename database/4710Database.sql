use heroku_32a9766f7436002;

drop table comments;drop table at_loc;drop table joined;
drop table eventss;drop table location;
drop table rso;
drop table users;drop table university;

create table university
(
	numOfStudents INTEGER,
    description text,
    uniName char(225) not null,
    location char(20),
    primary key (uniName)
);

create table users
(
    UID integer not null unique auto_increment,
    username char(20) not null unique,
    password char(20) not null,
    userType char(3) not null,
    uniName char(20) not null,
    #Valid input: SUP, ADM, STU. Constraint needed
    constraint checkType check(userType = "SUP" or userType = "ADM" or userType = "STU"),
    PRIMARY KEY(UID),
    foreign key(uniName) references university(uniName)
);

create table RSO
(
	domainEmail char(20),
    RID integer not null unique AUTO_INCREMENT,
    UID integer not null,
	rsoName char(225) not null,
	uniName char(225) not null,
    ContactNumber char(9),
    ContactEmail char(30),
    description text,
    constraint check_num check (ContactNumber not like '%[^0-9]%'),
    PRIMARY KEY (RID),
    foreign key(uniName) references university(uniName),
    foreign key(UID) references users(UID)
);

create table location
(
	LocID integer not null unique auto_increment,
    longitude char(10),
    latitude char(10),
    locName char(20),
    Primary key(locID)
);

create table Eventss
(
	Date char(10), 
	StartT time not null, 
	EndT  time not null,
    name char(30) not null,
    LocID  integer not null,
    ContactName char(30),
    ContactNumber char(9),
    ContactEmail char(30),
    Category char(3),
	Description text,
    RID integer,
    UID integer not null,
    uniName char(255),
	PRIMARY KEY  (Date, Start, End),
    foreign key(LocID) references location(LocID),
    foreign key(RID) references rso(RID),
    foreign key(UID) references users(UID),
    foreign key(uniName) references university(uniName),
    constraint check_num check (ContactNumber not like '%[^0-9]%')
);

# Disabled this section of code because I do not have the SUPER permission from Heroku to implement it
# The intention was to query the eventss table to see if the insertion would cause an overlap
# We decided to handle this constraint using our API instead as a result

#DELIMITER $$
#create trigger time_overlap before insert on eventss for each row 
#	begin
#	if exists(select StartT, EndT from eventss e join inserted i on
#    ((e.StartT < i.EndT) and (e.EndT > i.StartT))) then
#    signal sqlstate '45'; end if; end;$$

create table joined
(
	UID integer not null,
    RID integer not null,
    primary key(UID, RID),
    foreign key(UID) references users(UID),
	foreign key(RID) references rso(RID)
);

create table comments
(
	CID integer not null unique auto_increment,
	textfield text,
    rating integer,
    UID integer not null,
    Date char(10) not null,
    Start time not null,
    End time not null,
    Primary key(CID),
    foreign key(UID) references users(UID),
    foreign key(Date,Start,End) references eventss(Date,Start,End)
);

# Test uni data
insert into university (uniName, numOfStudents, location) VALUES('UCF', 20,'Orlando');
insert into university (uniName, numOfStudents, location) VALUES('USF', 20,'Tampa');
insert into university (uniName, numOfStudents, location) VALUES('UF', 20,'Gainesville');

# Test student data
insert into users (username,password,userType,uniName) VALUES('StuA','360NoScope', 'STU', 'UCF');
insert into users (username,password,userType,uniName) VALUES('StuB','p455w0rd', 'STU', 'UCF');
insert into users (username,password,userType,uniName) VALUES('StuC','hiMom!', 'STU', 'UCF');
insert into users (username,password,userType,uniName) VALUES('StuD','d4t4', 'STU', 'UCF');
insert into users (username,password,userType,uniName) VALUES('StuE','360NoScope', 'STU', 'USF');
insert into users (username,password,userType,uniName) VALUES('StuF','p455w0rd', 'STU', 'USF');
insert into users (username,password,userType,uniName) VALUES('StuG','hiMom!', 'STU', 'USF');
insert into users (username,password,userType,uniName) VALUES('StuH','d4t4', 'STU', 'USF');
insert into users (username,password,userType,uniName) VALUES('StuI','360Missed', 'STU', 'UF');
insert into users (username,password,userType,uniName) VALUES('StuJ','f4il', 'STU', 'UF');
insert into users (username,password,userType,uniName) VALUES('StuK','ex4mplePass', 'STU', 'UF');
insert into users (username,password,userType,uniName) VALUES('StuL','l4m3P4ssw0rd', 'STU', 'UF');
insert into users (username,password,userType,uniName) VALUES('StuM','itsAPass', 'STU', 'UCF');
insert into users (username,password,userType,uniName) VALUES('StuN','legitPass', 'STU', 'UCF');
insert into users (username,password,userType,uniName) VALUES('StuO','ImRunning', 'STU', 'USF');
insert into users (username,password,userType,uniName) VALUES('StuP','outOf', 'STU', 'USF');
insert into users (username,password,userType,uniName) VALUES('StuQ','jokePass', 'STU', 'UF');
insert into users (username,password,userType,uniName) VALUES('StuR','wordsHere', 'STU', 'UF');
insert into users (username,password,userType,uniName) VALUES('StuS','password1', 'STU', 'UCF');
insert into users (username,password,userType,uniName) VALUES('StuT','passwprd2', 'STU', 'USF');

#Test admin data
insert into users (username,password,userType,uniName) VALUES('AdmA','securePass1', 'ADM', 'UCF');
insert into users (username,password,userType,uniName) VALUES('AdmB','securePass2', 'ADM', 'UCF');
insert into users (username,password,userType,uniName) VALUES('AdmC','securePass3', 'ADM', 'UCF');

#Test super admin data
insert into users (username,password,userType,uniName) VALUES('SupA','AbsSecurity1', 'SUP', 'UCF');

#Test rso,location,event data
insert into location(longitude,latitude,locName) VALUES('1.2','2.2','dumbName');
insert into rso(UID,rsoName,uniName) values(204,'fratBoys','UCF');
insert into eventss(Date,Start,End,name,LocID,RID,UID,uniName) VALUES('1/1/2020','12:30','13:30','dumbEvent',4,4,204,'UCF');
insert into location(longitude,latitude,locName) VALUES('2W','3N','Campus');
insert into rso(UID,rsoName,uniName) values(224,'Theta Beta Pi','UCF');
insert into eventss(Date,Start,End,name,LocID,RID,UID,uniName) VALUES('1/2/2020','12:30','13:30','PlanningEvent',4,4,224,'UCF');
insert into location(longitude,latitude,locName) VALUES('25E','32N','awesomeLoc');
insert into rso(UID,rsoName,uniName) values(224,'Tau Zeta Pi','UCF');
insert into eventss(Date,Start,End,name,LocID,RID,UID,uniName) VALUES('2/4/2020','12:30','13:30','LFEvent',4,4,224,'UCF');
insert into location(longitude,latitude,locName) VALUES('1.2','2.2','dumbName');
insert into rso(UID,rsoName,uniName) values(214,'Zeta Zeta Alpha','UCF');
insert into eventss(Date,Start,End,name,LocID,RID,UID,uniName) VALUES('8/12/2020','1:30','15:30','RFEvent',4,4,224,'UCF');

#Test joined data
insert into joined(UID,RID) VALUES(204,4);
insert into joined(UID,RID) VALUES(224,14);
insert into joined(UID,RID) VALUES(224,24);
insert into joined(UID,RID) VALUES(224,34);

#Test comments data
insert into comments(textfield,UID,Date,Start,End) values("Looks awesome!",4,'8/12/2020','1:30','15:30');
insert into comments(textfield,UID,Date,Start,End) values("I don't know bro. Looks kinda sus...",14,'8/12/2020','1:30','15:30');
insert into comments(textfield,UID,Date,Start,End) values("This is gonna be good",24,'8/12/2020','1:30','15:30');

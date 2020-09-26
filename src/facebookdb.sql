create database facebookdb;
use facebookdb;

create table `users` (
	id int(11) primary key AUTO_INCREMENT,
    name nvarchar(30),
    telephone varchar(12),
    password varchar(12),
    token varchar(100),
    avatar varchar(100),
    count_friends int(11)
);
create index user_index on users(name, telephone);

create table `friends` (
	id int(11) primary key AUTO_INCREMENT,
    user_id int(11),
    friend_id int(11),
    create_at datetime,
    status int(11)
);

create table `blacklist` (
	id int(11) primary key AUTO_INCREMENT,
    user_one_id int(11),
    user_two_id int(11),
    create_at datetime,
    status int(11)
);

create table `reports` (
	id int(11) primary key AUTO_INCREMENT,
    type nvarchar(50),
    user_id int(11),
    post_id int(11)
);

create table `messages` (
	id int(11) primary key AUTO_INCREMENT,
    content nvarchar(500),
    isBlock boolean
);

create table `posts` (
	id int(11) primary key AUTO_INCREMENT,
    user_id int(11),
    content nvarchar(500)
);

create table `media` (
	id int(11) primary key AUTO_INCREMENT,
    post_id int(11),
    user_id int(11),
    path varchar(100),
    type int(2)
);

create table `likes` (
	id int(11) primary key AUTO_INCREMENT,
    post_id int(11),
    user_id int(11)
);

create table `comments` (
	id int(11) primary key AUTO_INCREMENT,
	content nvarchar(500),
    post_id int(11),
    user_id int(11),
    create_at datetime
);
ALTER TABLE `users` CHANGE `birthday` `birthday` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;

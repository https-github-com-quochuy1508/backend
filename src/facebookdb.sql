create database facebookdb;
use facebookdb;

create table `users` (
	id int(11) primary key AUTO_INCREMENT,
    name nvarchar(30),
    telephone varchar(12),
    password varchar(100),
    uuid varchar(100),
    avatar varchar(100),
    avatar_cover varchar(100),
    birthday datetime,
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
    user_one_id int(11),
    user_two_id int(11),
    content nvarchar(500),
    isBlock boolean
);

create table `posts` (
	id int(11) primary key AUTO_INCREMENT,
    user_id int(11),
    content nvarchar(500),
    create_at datetime
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

ALTER TABLE `facebookdb`.`users` 
CHANGE COLUMN `token` `uuid` VARCHAR(100) NULL DEFAULT NULL ;
ALTER TABLE `facebookdb`.`media` 
CHANGE COLUMN `post_id` `post_id` INT(11) NOT NULL ,
CHANGE COLUMN `user_id` `user_id` INT(11) NOT NULL ,
CHANGE COLUMN `path` `path` VARCHAR(100) NOT NULL ,
CHANGE COLUMN `type` `type` VARCHAR(50) NOT NULL ;
ALTER TABLE `facebookdb`.`users` 
CHANGE COLUMN `avatar` `avatar` VARCHAR(500) NULL DEFAULT NULL ,
CHANGE COLUMN `avatar_cover` `avatar_cover` VARCHAR(500) NULL DEFAULT NULL ;

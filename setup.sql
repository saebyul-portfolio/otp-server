CREATE SCHEMA `otp` ;
USE `otp`;

/*
password 컬럼은 Multi Account 대응용
*/
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `user` VARCHAR(255) NOT NULL PRIMARY KEY,
  `password` VARCHAR(255) NOT NULL,
  `program` VARCHAR(255) NOT NULL,
  `oauth` VARCHAR(255) NOT NULL,
  `used` BOOLEAN NOT NULL DEFAULT 0
);
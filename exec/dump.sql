-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: butter
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `butter`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `butter` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `butter`;

--
-- Table structure for table `avatar_type`
--

DROP TABLE IF EXISTS `avatar_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar_type` (
  `avatar_type_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`avatar_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar_type`
--

LOCK TABLES `avatar_type` WRITE;
/*!40000 ALTER TABLE `avatar_type` DISABLE KEYS */;
INSERT INTO `avatar_type` VALUES (1,'Avatar1'),(2,'Avatar2'),(3,'Avatar3'),(4,'Avatar4'),(5,'Avatar5'),(6,'Avatar6'),(7,'DEFAULT_AVATARTYPE');
/*!40000 ALTER TABLE `avatar_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bread_log`
--

DROP TABLE IF EXISTS `bread_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bread_log` (
  `amount` int NOT NULL,
  `bread_log_id` bigint NOT NULL AUTO_INCREMENT,
  `bread_log_type_id` bigint NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `crew_id` bigint DEFAULT NULL,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`bread_log_id`),
  KEY `FK2j5cy8bg513t9gmmhoe00qsk3` (`bread_log_type_id`),
  KEY `FKctqigswkud46okb88rs6tchub` (`crew_id`),
  KEY `FK2ld1uq1o5hiwiidnk62xc92id` (`member_id`),
  CONSTRAINT `FK2j5cy8bg513t9gmmhoe00qsk3` FOREIGN KEY (`bread_log_type_id`) REFERENCES `bread_log_type` (`bread_log_type_id`),
  CONSTRAINT `FK2ld1uq1o5hiwiidnk62xc92id` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKctqigswkud46okb88rs6tchub` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bread_log`
--

LOCK TABLES `bread_log` WRITE;
/*!40000 ALTER TABLE `bread_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `bread_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bread_log_type`
--

DROP TABLE IF EXISTS `bread_log_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bread_log_type` (
  `bread_log_type_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`bread_log_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bread_log_type`
--

LOCK TABLES `bread_log_type` WRITE;
/*!40000 ALTER TABLE `bread_log_type` DISABLE KEYS */;
INSERT INTO `bread_log_type` VALUES (1,'Recharge'),(2,'Donate'),(3,'Settle');
/*!40000 ALTER TABLE `bread_log_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clip`
--

DROP TABLE IF EXISTS `clip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clip` (
  `clip_id` bigint NOT NULL AUTO_INCREMENT,
  `crew_id` bigint NOT NULL,
  `hit_count` bigint NOT NULL DEFAULT '0',
  `title` varchar(50) NOT NULL,
  `video_name` varchar(2048) NOT NULL,
  `video_url` varchar(2048) NOT NULL,
  PRIMARY KEY (`clip_id`),
  KEY `FKdtbtq516w7aep74839kc7hal6` (`crew_id`),
  CONSTRAINT `FKdtbtq516w7aep74839kc7hal6` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clip`
--

LOCK TABLES `clip` WRITE;
/*!40000 ALTER TABLE `clip` DISABLE KEYS */;
INSERT INTO `clip` VALUES (1,1,100,'Rock Performance','clip-1-1','http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'),(2,1,200,'Jazz Solo','clip-1-1','http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'),(3,2,150,'Pop Star Performance','clip-2-1','http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'),(4,1,100,'ding ding','clip-1-1','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250221_025158227.mp4'),(5,1,200,'jannabi','clip-1-1','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250221_025159475.mp4'),(6,2,150,'wongyeom','clip-2-1','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250221_025204045.mp4'),(7,2,150,'joker','clip-2-2','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250221_025210113.mp4'),(8,2,200,'bong','clip-3-1','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250221_025208574.mp4'),(9,1,300,'nangman','clip-3-2','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250221_025201188.mp4');
/*!40000 ALTER TABLE `clip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crew`
--

DROP TABLE IF EXISTS `crew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crew` (
  `donation_amount` int NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `crew_id` bigint NOT NULL AUTO_INCREMENT,
  `update_date` datetime(6) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `image_url` varchar(2048) DEFAULT NULL,
  `portfolio_video_url` varchar(2048) NOT NULL,
  `promotion_url` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`crew_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crew`
--

LOCK TABLES `crew` WRITE;
/*!40000 ALTER TABLE `crew` DISABLE KEYS */;
INSERT INTO `crew` VALUES (15000,'2025-02-02 21:59:16.000000',1,'2025-02-12 09:42:34.000000','감성버스','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/2bef287b-fa94-431d-ad03-e811b41360ac.jpg','http://video.url/crew10','http://promo.url/crew10'),(7500,'2024-12-28 14:01:04.000000',2,'2025-02-12 09:42:34.000000','노을빛 멜로디','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ca21626e-442b-465b-b1b1-3f55bf5fc79e.jpg','http://video.url/crew8','http://promo.url/crew8'),(1500,'2024-11-29 19:46:27.000000',3,'2025-02-12 09:42:34.000000','담담한 노래들','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/14e47e70-1fed-4481-a942-c2c423acb555.gif','http://video.url/crew3','http://promo.url/crew3'),(1800,'2024-11-24 22:07:29.000000',4,'2025-02-12 09:42:34.000000','여운','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/995af50c-2f30-4aa4-9d35-8ea3b8a28663.jpg','http://video.url/crew4','http://promo.url/crew4'),(12000,'2024-10-09 03:44:24.000000',5,'2025-02-12 09:42:34.000000','깊은 밤, 노래 한 곡','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1f90b929-e81c-4ded-ae19-97a9e013e201.jpg','http://video.url/crew7','http://promo.url/crew7'),(1000,'2024-05-01 16:31:43.000000',6,'2025-02-12 09:42:34.000000','시간의 흔적','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/37b5dc38-ff8e-486e-a796-3cb5251178fa.jpg','http://video.url/crew1','http://promo.url/crew1'),(5000,'2024-04-10 22:42:05.000000',7,'2025-02-12 09:42:34.000000','목소리로 그리는 그림','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1c64cbe2-51dd-433a-8d5a-a0e7de556a4e.jpg','http://video.url/crew6','http://promo.url/crew6'),(9800,'2024-04-02 12:02:22.000000',8,'2025-02-12 09:42:34.000000','하모니, 그 순간','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b15297fe-8996-484f-a761-8f685e58a464.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-02 21:59:16.000000',9,'2025-02-12 09:42:34.000000','소울파이어','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/702d0045-523e-4714-90d1-5b5b0382a8b4.jpg','http://video.url/crew10','http://promo.url/crew10'),(7500,'2024-12-28 14:01:04.000000',10,'2025-02-12 09:42:34.000000','감성코드','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/751b542b-fe05-46b6-bb22-c63b9b6548fa.jpg','http://video.url/crew8','http://promo.url/crew8'),(1500,'2024-11-29 19:46:27.000000',11,'2025-02-12 09:42:34.000000','네온소울','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/6145732b-649b-40da-b725-af085e5ddd02.jpg','http://video.url/crew3','http://promo.url/crew3'),(1800,'2024-11-24 22:07:29.000000',12,'2025-02-12 09:42:34.000000','비트앤소울','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/fbd0ace8-f789-4fbe-89cd-19ac9f86102c.jpg','http://video.url/crew4','http://promo.url/crew4'),(12000,'2024-10-09 03:44:24.000000',13,'2025-02-12 09:42:34.000000','무드바이브','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b68b9f7b-d478-4734-917c-5c62b5599b0b.jpg','http://video.url/crew7','http://promo.url/crew7'),(1000,'2024-05-01 16:31:43.000000',14,'2025-02-12 09:42:34.000000','블루스웨이브','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c29db0eb-c687-401b-8a0c-430ae27a298a.jpg','http://video.url/crew1','http://promo.url/crew1'),(5000,'2024-04-10 22:42:05.000000',15,'2025-02-12 09:42:34.000000','루프탑그루브','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b565dabd-226d-4610-b8e0-eb7a6d8733a6.jpg','http://video.url/crew6','http://promo.url/crew6'),(9800,'2024-04-02 12:02:22.000000',16,'2025-02-12 09:42:34.000000','미드나잇스웨이','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5864f338-44fc-404f-bde5-5cfdfc9a29ab.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-02 21:59:16.000000',17,'2025-02-12 09:42:34.000000','나무 위의 노래','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a5383b2a-e6c2-498d-8875-82bbbe8caa0d.jpg','http://video.url/crew10','http://promo.url/crew10'),(7500,'2024-12-28 14:01:04.000000',18,'2025-02-12 09:42:34.000000','스트링하모니','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/706af792-a1b9-4d05-a378-dcf791045077.jpg','http://video.url/crew8','http://promo.url/crew8'),(1500,'2024-11-29 19:46:27.000000',19,'2025-02-12 09:42:34.000000','맑은날 기타','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/bbb29f98-6b46-4362-b563-b72c37b28cb1.jpg','http://video.url/crew3','http://promo.url/crew3'),(1800,'2024-11-24 22:07:29.000000',20,'2025-02-12 09:42:34.000000','소리바람','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5440f62b-a89e-4296-8675-b5d460c9d033.jpg','http://video.url/crew4','http://promo.url/crew4'),(12000,'2024-10-09 03:44:24.000000',21,'2025-02-12 09:42:34.000000','숲속 멜로디','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/bba79eaf-9971-4780-b88a-eb524bf56015.jpg','http://video.url/crew7','http://promo.url/crew7'),(1000,'2024-05-01 16:31:43.000000',22,'2025-02-12 09:42:34.000000','작은 방의 음악회','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ae2c67af-b77f-40d1-8953-bd83d17f8950.jpg','http://video.url/crew1','http://promo.url/crew1'),(5000,'2024-04-10 22:42:05.000000',23,'2025-02-12 09:42:34.000000','우드소울','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/59bc631c-1036-45e8-82ac-c2c3cc5776f2.jpg','http://video.url/crew6','http://promo.url/crew6'),(9800,'2024-04-02 12:02:22.000000',24,'2025-02-12 09:42:34.000000','통기타 이야기','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/dc151fc1-408a-493c-a98b-6a7e3f893339.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-02 21:59:16.000000',25,'2025-02-12 09:42:34.000000','바람의 여정','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b68e3d19-a008-429e-b209-c16e841db11a.jpg','http://video.url/crew10','http://promo.url/crew10'),(7500,'2024-12-28 14:01:04.000000',26,'2025-02-12 09:42:34.000000','밤하늘 유랑단','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/68d7c686-a094-4b8c-91c2-8c3bfe6fb144.jpg','http://video.url/crew8','http://promo.url/crew8'),(1500,'2024-11-29 19:46:27.000000',27,'2025-02-12 09:42:34.000000','무명은 아름다워','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/8fde11d5-5986-4323-923f-cce11dc7386c.jpg','http://video.url/crew3','http://promo.url/crew3'),(1800,'2024-11-24 22:07:29.000000',28,'2025-02-12 09:42:34.000000','도로 위 선율','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f6093f38-f657-4779-8d6d-857c2b427392.jpg','http://video.url/crew4','http://promo.url/crew4'),(12000,'2024-10-09 03:44:24.000000',29,'2025-02-12 09:42:34.000000','길거리 시인들','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/54d6e570-2f6a-41e7-827a-8ef281f1316c.jpg','http://video.url/crew7','http://promo.url/crew7'),(1000,'2024-05-01 16:31:43.000000',30,'2025-02-12 09:42:34.000000','인디그라운드','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d1cf60a1-5052-44fc-b91f-f0247f5968df.jpg','http://video.url/crew1','http://promo.url/crew1'),(5000,'2024-04-10 22:42:05.000000',31,'2025-02-12 09:42:34.000000','색깔있는 소리','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ece04bd2-af61-4fe9-bd58-3f7394392bb6.jpg','http://video.url/crew6','http://promo.url/crew6'),(9800,'2024-04-02 12:02:22.000000',32,'2025-02-12 09:42:34.000000','자유음악단','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4ff86549-5641-49d5-92c2-2c68ebdbb34c.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-02 21:59:16.000000',33,'2025-02-12 09:42:34.000000','빛나는 하루','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/43debbde-97d1-4e4b-aba8-e018be6d589a.jpg','http://video.url/crew10','http://promo.url/crew10'),(7500,'2024-12-28 14:01:04.000000',34,'2025-02-12 09:42:34.000000','하이라이트 크루','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a396edda-174c-4bf1-9a05-09dd42cf0caf.jpg','http://video.url/crew8','http://promo.url/crew8'),(1500,'2024-11-29 19:46:27.000000',35,'2025-02-12 09:42:34.000000','퍼플스테이지','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/59e680f9-a4d8-4aaa-a392-d4cc54d0a0d0.jpg','http://video.url/crew3','http://promo.url/crew3'),(1800,'2024-11-24 22:07:29.000000',36,'2025-02-12 09:42:34.000000','스포트라이트','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/e40f0d7d-ea16-45d8-af14-81a66ac9a889.jpg','http://video.url/crew4','http://promo.url/crew4'),(12000,'2024-10-09 03:44:24.000000',37,'2025-02-12 09:42:34.000000','하트비트','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/53cac171-647a-49ea-8c76-97b0d5f6426c.jpg','http://video.url/crew7','http://promo.url/crew7'),(1000,'2024-05-01 16:31:43.000000',38,'2025-02-12 09:42:34.000000','블링버스','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1948f51c-da52-4c79-8696-00a6d0b26260.jpg','http://video.url/crew1','http://promo.url/crew1'),(5000,'2024-04-10 22:42:05.000000',39,'2025-02-12 09:42:34.000000','에너제틱','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/2465e65f-6290-473f-97ea-5d96216063ce.jpg','http://video.url/crew6','http://promo.url/crew6'),(9800,'2024-04-02 12:02:22.000000',40,'2025-02-12 09:42:34.000000','윙스온더로드','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a8bd990e-6df9-49bf-a48a-15be5dfe4099.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-02 21:59:16.000000',41,'2025-02-12 09:42:34.000000','한잔 멜로디','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b66a58f9-1fff-4e29-a3bf-35589731a9dc.jpg','http://video.url/crew10','http://promo.url/crew10'),(7500,'2024-12-28 14:01:04.000000',42,'2025-02-12 09:42:34.000000','복고소울','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/9c9094ca-bcf5-4b73-855f-4aa063d48860.jpg','http://video.url/crew8','http://promo.url/crew8'),(1500,'2024-11-29 19:46:27.000000',43,'2025-02-12 09:42:34.000000','가락의 향기','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b4fcce61-eced-4ab0-b3c3-a57be64747c7.jpg','http://video.url/crew3','http://promo.url/crew3'),(1800,'2024-11-24 22:07:29.000000',44,'2025-02-12 09:42:34.000000','트롯로드','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4e6a29d8-a725-49f9-a879-206355e8c8db.jpg','http://video.url/crew4','http://promo.url/crew4'),(12000,'2024-10-09 03:44:24.000000',45,'2025-02-12 09:42:34.000000','감성트롯','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a9fe4180-0d2f-494e-9e94-e3b363095050.jpg','http://video.url/crew7','http://promo.url/crew7'),(1000,'2024-05-01 16:31:43.000000',46,'2025-02-12 09:42:34.000000','어게인7080','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/72f91fbb-5f17-4540-920b-d0325a3a0228.jpg','http://video.url/crew1','http://promo.url/crew1'),(5000,'2024-04-10 22:42:05.000000',47,'2025-02-12 09:42:34.000000','한밤의 트롯','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b89af8b0-2167-4a05-9b89-2b0a4c1b1b33.jpg','http://video.url/crew6','http://promo.url/crew6'),(9800,'2024-04-02 12:02:22.000000',48,'2025-02-12 09:42:34.000000','신바람버스킹','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f8e35442-213c-462d-9c01-db7e8fa1d608.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-02 21:59:16.000000',49,'2025-02-12 09:42:34.000000','스테리나잇','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d925c90b-7939-48a5-8a12-83adff892b70.jpg','http://video.url/crew10','http://promo.url/crew10'),(7500,'2024-12-28 14:01:04.000000',50,'2025-02-12 09:42:34.000000','팝코어','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c3646555-9a91-4dcc-a2a3-5e932dc20aac.jpg','http://video.url/crew8','http://promo.url/crew8'),(1500,'2024-11-29 19:46:27.000000',51,'2025-02-12 09:42:34.000000','스트릿팝','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/397a117c-ad12-490a-9a0a-f1f8a5f11e49.jpg','http://video.url/crew3','http://promo.url/crew3'),(1800,'2024-11-24 22:07:29.000000',52,'2025-02-12 09:42:34.000000','크리스탈비트','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/a73316de-55a2-4d73-bbb7-f232d698c8c7.jpg','http://video.url/crew4','http://promo.url/crew4'),(12000,'2024-10-09 03:44:24.000000',53,'2025-02-12 09:42:34.000000','메이저노트','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/72cc9709-f1d1-45c7-9c24-2b8f01371559.jpg','http://video.url/crew7','http://promo.url/crew7'),(1000,'2024-05-01 16:31:43.000000',54,'2025-02-12 09:42:34.000000','오픈마이크팝','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/776dda13-cc22-4bf8-92bc-8894a2b2e209.jpg','http://video.url/crew1','http://promo.url/crew1'),(5000,'2024-04-10 22:42:05.000000',55,'2025-02-12 09:42:34.000000','빅웨이브','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/80921169-c6bf-4f60-8974-ed3f30a8e3a5.jpg','http://video.url/crew6','http://promo.url/crew6'),(9800,'2024-04-02 12:02:22.000000',56,'2025-02-12 09:42:34.000000','업비트크루','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d1d7f0f5-f3f6-4a89-8b41-a99437fd7858.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-02 21:59:16.000000',57,'2025-02-12 09:42:34.000000','리듬시티','Advancing biotech solutions.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/e09bcb05-b86f-4f05-9c95-cc21776935f4.jpg','http://video.url/crew10','http://promo.url/crew10'),(7500,'2024-12-28 14:01:04.000000',58,'2025-02-12 09:42:34.000000','언더비트','Leading robotics innovation.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/dff53ff2-9496-445c-bae3-8cbbc753d035.jpg','http://video.url/crew8','http://promo.url/crew8'),(1500,'2024-11-29 19:46:27.000000',59,'2025-02-12 09:42:34.000000','플로우킹즈','A pop music group','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/002783da-4fc0-499c-b4f5-0856212c4d20.jpg','http://video.url/crew3','http://promo.url/crew3'),(1800,'2024-11-24 22:07:29.000000',60,'2025-02-12 09:42:34.000000','사이퍼스쿼드','A hip-hop music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1816b8df-644e-46bc-9851-6a395e1d6504.jpg','http://video.url/crew4','http://promo.url/crew4'),(12000,'2024-10-09 03:44:24.000000',61,'2025-02-12 09:42:34.000000','버스킹헤드','Specialized in AI development.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5f4160b9-9c1c-4c9e-99ba-b50bea9d49fa.jpg','http://video.url/crew7','http://promo.url/crew7'),(1000,'2024-05-01 16:31:43.000000',62,'2025-02-12 09:42:34.000000','스트릿라임즈','A rock music crew','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/70a87ab7-10de-4e84-baa9-445196020332.jpg','http://video.url/crew1','http://promo.url/crew1'),(5000,'2024-04-10 22:42:05.000000',63,'2025-02-12 09:42:34.000000','베이스클랜','Innovative space explorers.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/3c5773b8-f7cc-4dc1-9ad4-4c1dbc2c6407.jpg','http://video.url/crew6','http://promo.url/crew6'),(9800,'2024-04-02 12:02:22.000000',64,'2025-02-12 09:42:34.000000','킹오브더스트릿','Experts in cybersecurity.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/8665ca4e-4711-4444-9879-e9156815bc81.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-20 21:29:47.000000',65,'2025-02-20 21:29:47.000000','원찬이와 아이들','우리 버스킹 크루는 열정과 감성으로 거리를 무대로 만들어, 음악과 퍼포먼스로 사람들에게 감동과 즐거움을 선사합니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b5c3b8da-5f77-47b0-9bb5-f0dcb6c0623a.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-20 21:29:47.000000',66,'2025-02-20 21:29:47.000000','떡잎마을 방범대','다채로운 음악과 열정적인 퍼포먼스로 거리의 분위기를 밝히는 버스킹 크루입니다','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/0c9445c1-706c-43ae-b4b2-3f36c2b5b491.jpg','http://video.url/crew9','http://promo.url/crew9'),(15000,'2025-02-20 21:29:47.000000',67,'2025-02-20 21:29:47.000000','다정이와 아이들','우리 버스킹 크루는 열정과 감성으로 거리를 무대로 만들어, 음악과 퍼포먼스로 사람들에게 감동과 즐거움을 선사합니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b15297fe-8996-484f-a761-8f685e58a464.jpg','http://video.url/crew9','http://promo.url/crew9');
/*!40000 ALTER TABLE `crew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crew_genre`
--

DROP TABLE IF EXISTS `crew_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crew_genre` (
  `crew_genre_id` bigint NOT NULL AUTO_INCREMENT,
  `crew_id` bigint NOT NULL,
  `genre_id` bigint NOT NULL,
  PRIMARY KEY (`crew_genre_id`),
  KEY `FK3w460wt632fbwh6g0yojke8w7` (`crew_id`),
  KEY `FKhkku3thju6yo3wqry68mht57a` (`genre_id`),
  CONSTRAINT `FK3w460wt632fbwh6g0yojke8w7` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`),
  CONSTRAINT `FKhkku3thju6yo3wqry68mht57a` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crew_genre`
--

LOCK TABLES `crew_genre` WRITE;
/*!40000 ALTER TABLE `crew_genre` DISABLE KEYS */;
INSERT INTO `crew_genre` VALUES (1,1,2),(2,2,2),(3,3,2),(4,4,2),(5,5,2),(6,6,2),(7,7,2),(8,8,2),(9,9,8),(10,10,8),(11,11,8),(12,12,8),(13,13,8),(14,14,8),(15,15,8),(16,16,8),(17,17,6),(18,18,6),(19,19,6),(20,20,6),(21,21,6),(22,22,6),(23,23,6),(24,24,6),(25,25,12),(26,26,12),(27,27,12),(28,28,12),(29,29,12),(30,30,12),(31,31,12),(32,32,12),(33,33,5),(34,34,5),(35,35,5),(36,36,5),(37,37,5),(38,38,5),(39,39,5),(40,40,5),(41,41,13),(42,42,13),(43,43,13),(44,44,13),(45,45,13),(46,46,13),(47,47,13),(48,48,13),(49,49,4),(50,50,4),(51,51,4),(52,52,4),(53,53,4),(54,54,4),(55,55,4),(56,56,4),(57,57,7),(58,58,7),(59,59,7),(60,60,7),(61,61,7),(62,62,7),(63,63,7),(64,64,7),(65,65,13),(66,66,1),(67,67,1),(68,1,1),(69,1,2),(70,1,3),(71,1,4),(72,2,5),(73,2,6),(74,2,7),(75,2,8),(76,3,9),(77,3,10),(78,3,11),(79,3,12),(80,4,13),(81,4,1),(82,4,2),(83,4,3),(84,5,4),(85,5,5),(86,5,6),(87,5,7),(88,6,8),(89,6,9),(90,6,10),(91,6,11),(92,7,12),(93,7,13),(94,7,1),(95,7,2),(96,8,3),(97,8,4),(98,8,5),(99,8,6),(100,9,7),(101,9,8),(102,9,9),(103,9,10),(104,10,11),(105,10,12),(106,10,13),(107,10,1);
/*!40000 ALTER TABLE `crew_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crew_member`
--

DROP TABLE IF EXISTS `crew_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crew_member` (
  `is_crew_admin` bit(1) NOT NULL,
  `crew_id` bigint NOT NULL,
  `crew_member_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`crew_member_id`),
  KEY `FKesrnjlu0s2tt9reqrkobvjgha` (`crew_id`),
  KEY `FK9ow8ue7prf36p1s22f2gu7mnl` (`member_id`),
  CONSTRAINT `FK9ow8ue7prf36p1s22f2gu7mnl` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKesrnjlu0s2tt9reqrkobvjgha` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crew_member`
--

LOCK TABLES `crew_member` WRITE;
/*!40000 ALTER TABLE `crew_member` DISABLE KEYS */;
INSERT INTO `crew_member` VALUES (_binary '',8,1,3),(_binary '\0',8,2,4),(_binary '',65,3,18),(_binary '\0',65,4,6),(_binary '\0',65,5,7),(_binary '\0',65,6,8),(_binary '\0',65,7,9),(_binary '\0',65,8,10),(_binary '\0',65,9,11),(_binary '',66,10,12),(_binary '\0',66,11,13),(_binary '\0',66,12,14),(_binary '\0',66,13,15),(_binary '\0',66,14,16),(_binary '\0',66,15,17),(_binary '',67,16,19),(_binary '\0',67,17,6),(_binary '\0',67,18,7),(_binary '\0',67,19,8),(_binary '\0',67,20,9),(_binary '\0',67,21,10),(_binary '\0',67,22,11);
/*!40000 ALTER TABLE `crew_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crew_notice`
--

DROP TABLE IF EXISTS `crew_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crew_notice` (
  `create_date` datetime(6) NOT NULL,
  `crew_id` bigint NOT NULL,
  `crew_notice_id` bigint NOT NULL AUTO_INCREMENT,
  `update_date` datetime(6) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` varchar(200) NOT NULL,
  `image_url` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`crew_notice_id`),
  KEY `FKkjs2s81t16h49gll7acvtoim4` (`crew_id`),
  CONSTRAINT `FKkjs2s81t16h49gll7acvtoim4` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crew_notice`
--

LOCK TABLES `crew_notice` WRITE;
/*!40000 ALTER TABLE `crew_notice` DISABLE KEYS */;
INSERT INTO `crew_notice` VALUES ('2025-02-01 10:15:30.654321',1,1,'2025-02-05 14:30:00.654987','New Busking Schedule!','다음 주 새로운 버스킹 일정이 업데이트되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c2620a7c-fa94-4726-a67f-176704549bb8.jpg'),('2025-02-02 11:30:25.123654',2,2,'2025-02-06 16:45:10.321987','Practice Session Update','연습 시간이 변경되었습니다. 확인해 주세요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4e0e0a60-ec5d-44e7-974a-4c279fed6a56.jpg'),('2025-02-03 14:50:55.456321',3,3,'2025-02-07 13:20:30.654789','Live Performance Tonight!','오늘 저녁 특별 공연이 진행됩니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/40a43d2d-c330-4480-8957-602040074488.jpg'),('2025-02-04 09:10:15.789654',4,4,'2025-02-08 15:10:45.987321','New Crew Member!','새로운 크루 멤버를 소개합니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5bf78906-cb36-4ff7-b5a8-e1901d2333db.jpg'),('2025-02-05 12:20:40.321789',5,5,'2025-02-09 18:55:20.123654','Busking Location Change','공연 장소가 변경되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/abc48305-8f9d-4e59-81c1-6df316430f61.jpg'),('2025-02-06 15:25:33.654123',6,6,'2025-02-10 07:45:20.987321','Thank You for Your Support!','모두의 성원에 감사드립니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/0f722d62-d262-4edf-a65e-b6e7c3208b22.jpg'),('2025-02-07 10:40:25.321987',7,7,'2025-02-11 12:30:55.987654','Merchandise Update','새로운 굿즈가 출시되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ab40fa82-38b7-49c1-a24f-cf21cefeacfe.jpg'),('2025-02-08 07:30:50.654321',8,8,'2025-02-12 14:50:20.456321','Live Streaming Event!','온라인으로 함께 공연을 즐기세요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/bb11a127-da3f-4d88-8619-b9aed75f5260.jpg'),('2025-02-09 13:40:10.789654',9,9,'2025-02-13 10:10:25.321987','Special Guest Announcement','이번 공연의 스페셜 게스트를 소개합니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/73ae9d7b-4984-400d-b1a0-f59d77257f6b.jpg'),('2025-02-10 08:35:40.987654',10,10,'2025-02-14 11:45:33.654321','Rehearsal Schedule','이번 주 리허설 일정이 공지되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/02a2f2d1-776f-49a3-84bf-2d251ad67c79.jpg'),('2025-02-11 14:10:15.987654',1,11,'2025-02-15 15:30:55.321654','Crowdfunding Project!','크라우드 펀딩 프로젝트가 시작되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b9391f09-be0c-4a12-8da8-c999293969c6.jpg'),('2025-02-12 16:50:55.123789',2,12,'2025-02-16 06:45:25.654321','Fan Meeting Event','팬들과의 특별한 만남을 준비했습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/58fd91eb-c695-4cf5-9c39-88b349336a5c.jpg'),('2025-02-13 09:15:30.789654',3,13,'2025-02-17 21:30:15.654987','Performance Highlights','지난 공연의 하이라이트 영상이 업로드되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d452059f-0092-44e8-a99b-6157f997d3a2.jpg'),('2025-02-14 12:50:55.987654',4,14,'2025-02-18 16:10:25.321456','Winter Festival Performance!','겨울 페스티벌 공연 일정이 추가되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1743884a-f8a4-44c3-90d3-80cad59734df.jpg'),('2025-02-15 07:45:20.321789',5,15,'2025-02-19 11:45:33.987654','New Collaboration','특별한 아티스트와의 협업이 예정되어 있습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f285cbe4-719e-4961-8252-4e62c4a0b63e.jpg'),('2025-02-16 10:20:30.123654',6,16,'2025-02-20 14:30:45.654789','Behind the Scenes','무대 뒤 이야기를 공유합니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/e115de6e-2379-4888-bcc9-07aec7287dfa.jpg'),('2025-02-17 08:55:40.321987',7,17,'2025-02-21 10:10:55.123456','New Music Release!','새로운 곡이 발매되었습니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b6d80a38-cb4b-4064-952e-da70fb7880da.jpg'),('2025-02-18 15:30:20.456321',8,18,'2025-02-22 13:45:40.789654','Interview Feature','인터뷰 영상이 공개되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/74f022f2-22d0-4395-bc53-cf60e0de7e9f.jpg'),('2025-02-19 11:40:10.789654',9,19,'2025-02-23 07:55:30.654321','Limited Edition Merch','한정판 굿즈가 출시되었습니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5bfb2c5f-929b-40e8-a20e-e2a32061bfa3.jpg'),('2025-02-20 14:50:55.321987',10,20,'2025-02-24 12:20:15.987654','Concert Ticket Sales','콘서트 티켓 예매가 시작되었습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f6e24a02-750d-4e08-aded-af22861cd586.jpg'),('2025-02-20 21:29:48.000000',65,21,'2025-02-20 21:29:48.000000','버스킹 공지: 이번 주 공연 일정','안녕하세요! 이번 주 버스킹 공연 일정을 알려드립니다. 토요일 오후 3시, 강남역 8번 출구에서 만나요!','https://cdn.pixabay.com/photo/2024/03/04/08/06/ai-generated-8612008_640.png'),('2025-02-20 21:29:48.000000',65,22,'2025-02-20 21:29:48.000000','버스킹 참가자 모집','새 멤버를 모집합니다! 악기 연주자, 보컬 모두 환영합니다. 관심 있으신 분은 문의주세요.','https://cdn.pixabay.com/photo/2022/08/21/21/24/sleeping-7402144_640.jpg'),('2025-02-20 21:29:48.000000',65,23,'2025-02-20 21:29:48.000000','버스킹 장소 변경 안내','이번 주 버스킹 장소가 강남역에서 홍대입구역으로 변경되었습니다. 참고 부탁드립니다.','https://cdn.pixabay.com/photo/2024/03/04/08/06/ai-generated-8612007_640.png'),('2025-02-20 21:29:48.000000',65,24,'2025-02-20 21:29:48.000000','버스킹 연습 일정 공지','다음 주 공연을 위한 연습 일정입니다. 수요일 오후 7시, 강남 스튜디오에서 진행합니다.','https://cdn.pixabay.com/photo/2021/05/28/11/39/girl-6290663_640.jpg'),('2025-02-20 21:29:48.000000',65,25,'2025-02-20 21:29:48.000000','버스킹 후원 안내','버스킹 활동을 후원해주실 분들을 모집합니다. 후원금은 장비 구입 및 활동비로 사용됩니다.','https://cdn.pixabay.com/photo/2019/10/31/21/11/street-musician-4592890_640.jpg'),('2025-02-20 21:29:48.000000',65,26,'2025-02-20 21:29:48.000000','버스킹 공연 영상 업로드','지난 주 버스킹 공연 영상을 유튜브에 업로드했습니다. 많은 시청 부탁드립니다!','https://cdn.pixabay.com/photo/2016/11/29/13/20/guitarist-1869787_640.jpg'),('2025-02-20 21:29:48.000000',65,27,'2025-02-20 21:29:48.000000','버스킹 휴식 공지','다음 주는 휴식입니다. 공연 일정이 없으니 참고해주세요.','https://cdn.pixabay.com/photo/2015/09/19/01/03/guitar-946701_640.jpg'),('2025-02-20 21:29:48.000000',65,28,'2025-02-20 21:29:48.000000','버스킹 장비 점검 안내','공연 전 장비 점검을 진행합니다. 악기나 장비를 사용하시는 분들은 꼭 참석해주세요.','https://cdn.pixabay.com/photo/2024/03/04/08/06/ai-generated-8612010_640.png'),('2025-02-20 21:29:48.000000',65,29,'2025-02-20 21:29:48.000000','버스킹 공연 후기 공유','지난 공연 후기를 공유합니다. 많은 관심과 응원 감사드립니다!','https://cdn.pixabay.com/photo/2016/03/27/21/44/musician-1284394_640.jpg'),('2025-02-20 21:29:48.000000',65,30,'2025-02-20 21:29:48.000000','버스킹 이벤트 안내','다음 달 버스킹 페스티벌에 참가합니다. 자세한 일정은 추후 공지드리겠습니다.','https://cdn.pixabay.com/photo/2022/07/04/04/37/musician-7300353_640.jpg'),('2025-02-20 21:29:48.000000',66,31,'2025-02-20 21:29:48.000000','버스킹 일정 변경 안내','이번 주 버스킹 일정이 일요일 오후 2시로 변경되었습니다. 장소는 동대문역입니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c2620a7c-fa94-4726-a67f-176704549bb8.jpg'),('2025-02-20 21:29:48.000000',66,32,'2025-02-20 21:29:48.000000','버스킹 신규 멤버 환영','새로 합류한 멤버를 환영합니다! 함께 멋진 공연을 만들어봐요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/4e0e0a60-ec5d-44e7-974a-4c279fed6a56.jpg'),('2025-02-20 21:29:48.000000',66,33,'2025-02-20 21:29:48.000000','버스킹 장비 대여 안내','악기나 장비가 필요하신 분은 대여 가능합니다. 미리 문의주세요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/40a43d2d-c330-4480-8957-602040074488.jpg'),('2025-02-20 21:29:48.000000',66,34,'2025-02-20 21:29:48.000000','버스킹 공연 피드백 요청','지난 공연에 대한 피드백을 받습니다. 의견을 남겨주시면 감사하겠습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5bf78906-cb36-4ff7-b5a8-e1901d2333db.jpg'),('2025-02-20 21:29:48.000000',66,35,'2025-02-20 21:29:48.000000','버스킹 연습 일정 변경','이번 주 연습 일정이 금요일 오후 6시로 변경되었습니다. 참고해주세요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f6e24a02-750d-4e08-aded-af22861cd586.jpg'),('2025-02-20 21:29:48.000000',66,36,'2025-02-20 21:29:48.000000','버스킹 공연 사진 공유','지난 공연 사진을 공유합니다. 링크를 통해 확인해주세요!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5bfb2c5f-929b-40e8-a20e-e2a32061bfa3.jpg'),('2025-02-20 21:29:48.000000',66,37,'2025-02-20 21:29:48.000000','버스킹 후원 감사 인사','버스킹 활동을 후원해주신 분들께 감사드립니다. 더 열심히 하겠습니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/74f022f2-22d0-4395-bc53-cf60e0de7e9f.jpg'),('2025-02-20 21:29:48.000000',66,38,'2025-02-20 21:29:48.000000','버스킹 이벤트 참가 안내','다가오는 버스킹 페스티벌에 참가합니다. 많은 관심 부탁드립니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b6d80a38-cb4b-4064-952e-da70fb7880da.jpg'),('2025-02-20 21:29:48.000000',66,39,'2025-02-20 21:29:48.000000','버스킹 공연 장소 공지','이번 주 공연 장소는 명동역 3번 출구입니다. 시간은 오후 4시입니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/e115de6e-2379-4888-bcc9-07aec7287dfa.jpg'),('2025-02-20 21:29:48.000000',66,40,'2025-02-20 21:29:48.000000','버스킹 휴식 기간 안내','다음 주는 휴식 기간입니다. 공연 일정이 없으니 참고해주세요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/f285cbe4-719e-4961-8252-4e62c4a0b63e.jpg'),('2025-02-20 21:29:48.000000',67,41,'2025-02-20 21:29:48.000000','버스킹 공연 일정 공지','이번 주 버스킹 공연은 토요일 오후 5시, 홍대입구역에서 진행됩니다. 많은 관심 부탁드립니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1743884a-f8a4-44c3-90d3-80cad59734df.jpg'),('2025-02-20 21:29:48.000000',67,42,'2025-02-20 21:29:48.000000','버스킹 신규 곡 연습 안내','새로 추가된 곡을 연습합니다. 수요일 오후 7시, 스튜디오에서 만나요!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/d452059f-0092-44e8-a99b-6157f997d3a2.jpg'),('2025-02-20 21:29:48.000000',67,43,'2025-02-20 21:29:48.000000','버스킹 장소 협조 요청','공연 장소에서 주변 분들의 협조를 부탁드립니다. 소음에 주의해주세요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/58fd91eb-c695-4cf5-9c39-88b349336a5c.jpg'),('2025-02-20 21:29:48.000000',67,44,'2025-02-20 21:29:48.000000','버스킹 후원자 모집','버스킹 활동을 후원해주실 분들을 모집합니다. 후원금은 장비 구입 및 활동비로 사용됩니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/b9391f09-be0c-4a12-8da8-c999293969c6.jpg'),('2025-02-20 21:29:48.000000',67,45,'2025-02-20 21:29:48.000000','버스킹 공연 영상 공유','지난 주 버스킹 공연 영상을 유튜브에 업로드했습니다. 많은 시청 부탁드립니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/02a2f2d1-776f-49a3-84bf-2d251ad67c79.jpg'),('2025-02-20 21:29:48.000000',67,46,'2025-02-20 21:29:48.000000','버스킹 연습 일정 공지','이번 주 연습 일정은 목요일 오후 6시입니다. 모두 필참 바랍니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/73ae9d7b-4984-400d-b1a0-f59d77257f6b.jpg'),('2025-02-20 21:29:48.000000',67,47,'2025-02-20 21:29:48.000000','버스킹 이벤트 참가 안내','다가오는 버스킹 페스티벌에 참가합니다. 자세한 일정은 추후 공지드리겠습니다.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/bb11a127-da3f-4d88-8619-b9aed75f5260.jpg'),('2025-02-20 21:29:48.000000',67,48,'2025-02-20 21:29:48.000000','버스킹 공연 후기 공유','지난 공연 후기를 공유합니다. 많은 관심과 응원 감사드립니다!','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ab40fa82-38b7-49c1-a24f-cf21cefeacfe.jpg'),('2025-02-20 21:29:48.000000',67,49,'2025-02-20 21:29:48.000000','버스킹 휴식 기간 안내','다음 주는 휴식 기간입니다. 공연 일정이 없으니 참고해주세요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/0f722d62-d262-4edf-a65e-b6e7c3208b22.jpg'),('2025-02-20 21:29:48.000000',67,50,'2025-02-20 21:29:48.000000','버스킹 장비 점검 안내','공연 전 장비 점검을 진행합니다. 악기나 장비를 사용하시는 분들은 꼭 참석해주세요.','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/abc48305-8f9d-4e59-81c1-6df316430f61.jpg');
/*!40000 ALTER TABLE `crew_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `is_followed` bit(1) NOT NULL,
  `crew_id` bigint NOT NULL,
  `follow_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `FKl09083japav8jw2yby5jgwbnl` (`crew_id`),
  KEY `FKla8lvflaauks5sw7s0u44q6x0` (`member_id`),
  CONSTRAINT `FKl09083japav8jw2yby5jgwbnl` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`),
  CONSTRAINT `FKla8lvflaauks5sw7s0u44q6x0` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (_binary '',1,1,4),(_binary '',1,2,2),(_binary '',1,3,5),(_binary '',1,4,3),(_binary '',2,5,3),(_binary '',2,6,1),(_binary '',2,7,5),(_binary '',3,8,1),(_binary '',3,9,5),(_binary '',3,10,4),(_binary '',3,11,3),(_binary '',4,12,1),(_binary '',4,13,5),(_binary '',4,14,4),(_binary '',4,15,2),(_binary '',5,16,5),(_binary '',5,17,3),(_binary '',5,18,4),(_binary '',5,19,2),(_binary '',6,20,3),(_binary '',6,21,5),(_binary '',6,22,2),(_binary '',7,23,5),(_binary '',7,24,4),(_binary '',7,25,1),(_binary '',8,26,2),(_binary '',8,27,1),(_binary '',8,28,3),(_binary '',9,29,5),(_binary '',9,30,2),(_binary '',9,31,1),(_binary '',10,32,2);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genre_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'All'),(2,'Ballad'),(3,'Dance'),(4,'Pop'),(5,'K-Pop'),(6,'Acoustic'),(7,'Hip-Hop'),(8,'R&B'),(9,'Electronic'),(10,'Rock'),(11,'Jazz'),(12,'Indie'),(13,'Trot');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_clip`
--

DROP TABLE IF EXISTS `liked_clip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_clip` (
  `is_liked` bit(1) NOT NULL,
  `clip_id` bigint NOT NULL,
  `liked_clip_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`liked_clip_id`),
  KEY `FK4rf4gmfcdnspv9ifchdwubstl` (`clip_id`),
  KEY `FKigre2b5t73hcyycabd8rop9un` (`member_id`),
  CONSTRAINT `FK4rf4gmfcdnspv9ifchdwubstl` FOREIGN KEY (`clip_id`) REFERENCES `clip` (`clip_id`),
  CONSTRAINT `FKigre2b5t73hcyycabd8rop9un` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_clip`
--

LOCK TABLES `liked_clip` WRITE;
/*!40000 ALTER TABLE `liked_clip` DISABLE KEYS */;
INSERT INTO `liked_clip` VALUES (_binary '',1,1,1),(_binary '\0',2,2,2),(_binary '',3,3,3),(_binary '',8,4,20),(_binary '',7,5,20);
/*!40000 ALTER TABLE `liked_clip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked_schedule`
--

DROP TABLE IF EXISTS `liked_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `liked_schedule` (
  `is_liked` bit(1) NOT NULL,
  `liked_schedule_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `schedule_id` bigint NOT NULL,
  PRIMARY KEY (`liked_schedule_id`),
  KEY `FKs3ie6r9oquf53admbm4mgx0m0` (`member_id`),
  KEY `FKqcsa1oqded9u7ly88up791lej` (`schedule_id`),
  CONSTRAINT `FKqcsa1oqded9u7ly88up791lej` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`),
  CONSTRAINT `FKs3ie6r9oquf53admbm4mgx0m0` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked_schedule`
--

LOCK TABLES `liked_schedule` WRITE;
/*!40000 ALTER TABLE `liked_schedule` DISABLE KEYS */;
INSERT INTO `liked_schedule` VALUES (_binary '',1,1,1),(_binary '\0',2,2,2),(_binary '',3,3,3),(_binary '\0',4,4,4),(_binary '',5,5,5);
/*!40000 ALTER TABLE `liked_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live`
--

DROP TABLE IF EXISTS `live`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live` (
  `crew_id` bigint NOT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `live_id` bigint NOT NULL AUTO_INCREMENT,
  `schedule_id` bigint DEFAULT NULL,
  `start_date` datetime(6) NOT NULL,
  `title` varchar(50) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`live_id`),
  UNIQUE KEY `UKqp2udmk0qmfaacno4ahnvjre5` (`schedule_id`),
  KEY `FKsrkjvysf03be92gpxl2ihrj7u` (`crew_id`),
  CONSTRAINT `FKrqv7s0l2rcge0o2ukufcrfdsn` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`),
  CONSTRAINT `FKsrkjvysf03be92gpxl2ihrj7u` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live`
--

LOCK TABLES `live` WRITE;
/*!40000 ALTER TABLE `live` DISABLE KEYS */;
INSERT INTO `live` VALUES (1,'2025-02-20 23:29:48.000000',1,NULL,'2025-02-20 21:29:48.000000','Live Rock Show',NULL),(2,'2025-02-21 00:29:48.000000',2,NULL,'2025-02-20 21:29:48.000000','Jazz Performance',NULL),(3,'2025-02-20 22:29:48.000000',3,NULL,'2025-02-20 21:29:48.000000','Pop Music Show',NULL),(4,'2025-02-21 01:29:48.000000',4,NULL,'2025-02-20 21:29:48.000000','Hip-Hop Cypher',NULL),(5,'2025-02-21 02:29:48.000000',5,NULL,'2025-02-20 21:29:48.000000','Classical Evening',NULL),(1,'2025-02-12 10:30:00.000000',6,1,'2025-02-12 09:00:00.000000','길거리의 선율, 지금 시작합니다!',NULL),(1,NULL,7,6,'2025-02-12 11:00:00.000000','한밤의 감성 버스킹',NULL),(1,'2025-02-12 14:15:00.000000',8,16,'2025-02-12 12:45:00.000000','오늘도 노래로 행복을 전합니다',NULL),(1,'2025-02-12 16:45:00.000000',9,21,'2025-02-12 15:00:00.000000','낭만 가득, 길거리 라이브!',NULL),(2,'2025-02-12 18:30:00.000000',10,2,'2025-02-12 17:00:00.000000','즉흥 버스킹, 함께 즐겨요',NULL),(2,NULL,11,7,'2025-02-12 19:00:00.000000','도시의 소음 속 작은 음악회',NULL),(2,'2025-02-12 22:15:00.000000',12,17,'2025-02-12 20:45:00.000000','여기서 멈춰, 음악을 느껴봐',NULL),(3,'2025-02-13 01:15:00.000000',13,3,'2025-02-13 00:00:00.000000','감성 가득한 새벽 버스킹',NULL),(3,NULL,14,8,'2025-02-13 02:00:00.000000','별빛 아래 음악 여행',NULL),(3,'2025-02-13 05:00:00.000000',15,18,'2025-02-13 03:30:00.000000','도시의 밤을 채우는 멜로디',NULL),(4,'2025-02-13 07:30:00.000000',16,4,'2025-02-13 06:00:00.000000','아침 햇살과 함께하는 버스킹',NULL),(4,NULL,17,9,'2025-02-13 08:30:00.000000','출근길을 위한 힐링 라이브',NULL),(5,'2025-02-13 11:45:00.000000',18,5,'2025-02-13 10:15:00.000000','낮의 여유, 거리의 선율',NULL),(5,'2025-02-13 13:30:00.000000',19,10,'2025-02-13 12:00:00.000000','점심시간 감성 충전 라이브',NULL),(6,NULL,20,11,'2025-02-13 15:00:00.000000','오후 햇살 속 거리 음악회',NULL),(6,'2025-02-13 17:45:00.000000',21,26,'2025-02-13 16:15:00.000000','퇴근길 감성 버스킹',NULL),(7,'2025-02-13 19:30:00.000000',22,12,'2025-02-13 18:00:00.000000','저녁 노을과 함께하는 라이브',NULL),(8,'2025-02-13 21:00:00.000000',23,13,'2025-02-13 21:00:00.000000','밤공기 속 낭만적인 선율',NULL),(9,'2025-02-13 23:45:00.000000',24,14,'2025-02-13 22:15:00.000000','한밤의 감성 음악 여행',NULL),(10,'2025-02-14 02:00:00.000000',25,15,'2025-02-14 00:30:00.000000','새벽을 깨우는 감미로운 멜로디',NULL);
/*!40000 ALTER TABLE `live` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `birth_date` date DEFAULT NULL,
  `bread_amount` int DEFAULT NULL,
  `create_date` date NOT NULL,
  `is_extra_info_registered` bit(1) NOT NULL,
  `avatar_type_id` bigint DEFAULT NULL,
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `member_type_id` bigint DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `profile_image` varchar(2048) DEFAULT NULL,
  `login_id` varchar(255) DEFAULT NULL,
  `gender` enum('FEMALE','MALE') NOT NULL,
  PRIMARY KEY (`member_id`),
  KEY `idx_nickname` (`nickname`),
  KEY `idx_email` (`email`),
  KEY `idx_member_id` (`member_id`),
  KEY `FKdn8x5tf2qon8du0b5l0ne1i02` (`avatar_type_id`),
  KEY `FKhy7vopt86e2jdoovh4dw4us4i` (`member_type_id`),
  CONSTRAINT `FKdn8x5tf2qon8du0b5l0ne1i02` FOREIGN KEY (`avatar_type_id`) REFERENCES `avatar_type` (`avatar_type_id`),
  CONSTRAINT `FKhy7vopt86e2jdoovh4dw4us4i` FOREIGN KEY (`member_type_id`) REFERENCES `member_type` (`member_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('1990-01-01',1631,'2025-02-20',_binary '',1,1,1,'user1@example.com','User One','$2a$12$dQo54URbmGg6L59qXSgLPOk/vuBg45UOfjSbY7MB/VanylMZhhHw2',NULL,'user123','MALE'),('1995-05-15',1935,'2025-02-20',_binary '\0',2,2,2,'user2@example.com','User Two','$2a$12$XoEzMrF9cwmKafmDaH62P.YcL554rfwGfghxNFH6.CmQZ0S7NUxRW',NULL,'user456','FEMALE'),('1990-01-01',1166,'2025-02-20',_binary '\0',2,3,1,'user3@example.com','빠다','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6',NULL,'butter123','MALE'),('1998-08-20',1026,'2025-02-20',_binary '',3,4,2,'user4@example.com','초코','$2a$12$Qj1l2Rv68mGBtW/PyG7qEueUslfh2WZs.Jwo9t8kOi4B9uU7J7D9C',NULL,'choco789','FEMALE'),('1992-12-10',1971,'2025-02-20',_binary '\0',1,5,1,'user5@example.com','딸기','$2a$12$Y7LSF6/NwYpMc74uOTn6ZeUOujMPJHMT/FzghyATC08oM8Ykx.JhO',NULL,'straw999','MALE'),('1990-01-01',1712,'2025-02-20',_binary '\0',2,6,1,'user6@example.com','최재익','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/bc9333b8-0268-4a1e-b09b-b438586bd325.jpg','butter1234','MALE'),('1990-01-01',1030,'2025-02-20',_binary '\0',2,7,1,'user7@example.com','임다희','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/e9821646-ba6d-47fb-b8e1-2223934fa2c0.jpg','butter1235','FEMALE'),('1990-01-01',1343,'2025-02-20',_binary '\0',2,8,1,'user8@example.com','안다정','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/cc62a2c8-cc83-4755-93a0-8e82f35d4a88.jpg','butter1236','FEMALE'),('1990-01-01',1180,'2025-02-20',_binary '\0',2,9,1,'user9@example.com','이병건','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c5f32f5e-5f55-4dc4-b5b7-7ff4163b3305.jpg','butter1237','MALE'),('1990-01-01',1857,'2025-02-20',_binary '\0',2,10,1,'user10@example.com','김원찬','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c9c1b9f4-028f-4239-a066-2a09b9673fe5.jpg','butter1238','MALE'),('1990-01-01',1831,'2025-02-20',_binary '\0',2,11,1,'user11@example.com','김원겸','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/92e6ae65-1bbe-411f-8a09-e59cbd25b6b1.jpg','butter1239','MALE'),('1990-01-01',1798,'2025-02-20',_binary '\0',2,12,1,'user3@example.com','짱구','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/49514493-c78b-4592-ae61-d4e547d96f08.jpg','butter1240','MALE'),('1990-01-01',1554,'2025-02-20',_binary '\0',2,13,1,'user3@example.com','흰둥이','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/c4e4a73f-c7f5-4c9d-b525-820aae2936ca.jpg','butter1241','MALE'),('1990-01-01',1679,'2025-02-20',_binary '\0',2,14,1,'user3@example.com','철수','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ecb68ffd-6f91-4129-bb0a-bd7777e87e69.jpg','butter1242','MALE'),('1990-01-01',1367,'2025-02-20',_binary '\0',2,15,1,'user3@example.com','유리','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/07186f22-e6a9-4c3f-8994-28d46e93a980.jpg','butter1243','MALE'),('1990-01-01',1152,'2025-02-20',_binary '\0',2,16,1,'user3@example.com','맹구','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/1a1cef8b-b188-4aaf-883b-6cd27384f2d2.jpg','butter1244','MALE'),('1990-01-01',1234,'2025-02-20',_binary '\0',2,17,1,'user3@example.com','훈이','$2a$12$EGlsV9zlJcfjr2Iplvxq9uY1to7FUnsUG9wUFj4mJpD3kPRl7Wsz6','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/5d6c29a9-3a42-4df0-84ab-5619798016d7.jpg','butter1245','MALE'),('1999-11-23',1535,'2025-02-20',_binary '',3,18,1,'rladnjscks1@eexample.com','크루장 김원찬','$2a$10$ugpwRg6xsmazWGaZKpsPBOORd2SkwIXJds//uWevZygdOCoTIn1Bi','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/ecee0476-99a7-4713-94e2-9ba9a484de18.webp','rladnjscks1!','MALE'),('1999-11-23',1535,'2025-02-20',_binary '',2,19,1,'dksekwjd1@eexample.com','크루장 안다정','$2a$10$j7pNvJLstT54tvOWnkCJ2exaDnnWptJ8RWlBZ5jA5L0X.idrTPoOK','https://butter-s3-bucket.s3.ap-northeast-2.amazonaws.com/8df81bb2-3243-434a-ad8c-92ecc3caf9d7.webp','dksekwjd1!','FEMALE'),('2025-02-18',0,'2025-02-20',_binary '\0',7,20,1,'user1@naver.com','DEFAULT_NICKNAME','$2a$10$0aDRndZxwB2qMfFbZzHQfObnqWsj/PE4EzCfn40NgI2C0DlYqm0FW',NULL,'user1','MALE');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_genre`
--

DROP TABLE IF EXISTS `member_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_genre` (
  `genre_id` bigint NOT NULL,
  `member_genre_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  PRIMARY KEY (`member_genre_id`),
  KEY `FKjs03trx02mqb6o54167h8xjaw` (`genre_id`),
  KEY `FKqkf5e9wjn44yufdx1a1v6wky5` (`member_id`),
  CONSTRAINT `FKjs03trx02mqb6o54167h8xjaw` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`),
  CONSTRAINT `FKqkf5e9wjn44yufdx1a1v6wky5` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_genre`
--

LOCK TABLES `member_genre` WRITE;
/*!40000 ALTER TABLE `member_genre` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_type`
--

DROP TABLE IF EXISTS `member_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_type` (
  `member_type_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`member_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_type`
--

LOCK TABLES `member_type` WRITE;
/*!40000 ALTER TABLE `member_type` DISABLE KEYS */;
INSERT INTO `member_type` VALUES (1,'USER'),(2,'ADMIN');
/*!40000 ALTER TABLE `member_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_token`
--

DROP TABLE IF EXISTS `refresh_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_token` (
  `member_id` bigint DEFAULT NULL,
  `refresh_token_id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`refresh_token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_token`
--

LOCK TABLES `refresh_token` WRITE;
/*!40000 ALTER TABLE `refresh_token` DISABLE KEYS */;
INSERT INTO `refresh_token` VALUES (18,3,'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDAwODczNTMsImV4cCI6MTc0MDA5NDU1M30.VrVzcb4CdGfedjP948wl_yr4c-fXIowSUMbeFQNzjvZnZIFpw4rptTvLlceEeNsJ8pMzGRm4yFOAM19fe11LKg'),(20,4,'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDAwOTQ4NTksImV4cCI6MTc0MDEwMjA1OX0.0DagokeSIGg4IpNAURDz7cMPFC77GY_fD-bgRoAFwBFQe0EYEKhGZji4rVcV8F7hUdr0fj1Ys_x2fDxPQNW8lA');
/*!40000 ALTER TABLE `refresh_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `busking_date` datetime(6) NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `crew_id` bigint NOT NULL,
  `schedule_id` bigint NOT NULL AUTO_INCREMENT,
  `update_date` datetime(6) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` varchar(200) NOT NULL,
  `place` varchar(200) NOT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `FKl62h0fetmliri5we2wbo9wkt5` (`crew_id`),
  CONSTRAINT `FKl62h0fetmliri5we2wbo9wkt5` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`)
) ENGINE=InnoDB AUTO_INCREMENT=339 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (37.7749,-122.4194,'2025-02-20 21:29:48.000000','2025-02-20 21:29:48.000000',1,1,'2025-02-20 21:29:48.000000','San Francisco Street Performance','Enjoy live music','San Francisco'),(34.0522,-118.2437,'2025-02-20 21:29:48.000000','2025-02-20 21:29:48.000000',2,2,'2025-02-20 21:29:48.000000','Los Angeles Jazz Night','Smooth jazz under the stars','Los Angeles'),(40.7128,-74.006,'2025-02-20 21:29:48.000000','2025-02-20 21:29:48.000000',3,3,'2025-02-20 21:29:48.000000','New York Pop Concert','Pop stars live in NYC','New York'),(41.8781,-87.6298,'2025-02-20 21:29:48.000000','2025-02-20 21:29:48.000000',4,4,'2025-02-20 21:29:48.000000','Chicago Hip-Hop Festival','Hip-hop artists live','Chicago'),(48.8566,2.3522,'2025-02-20 21:29:48.000000','2025-02-20 21:29:48.000000',5,5,'2025-02-20 21:29:48.000000','Paris Classical Gala','An evening of classical music','Paris'),(37.5665,126.978,'2025-02-10 18:00:00.123456','2025-02-01 10:15:30.654321',1,6,'2025-02-20 21:29:48.000000','Seoul Night Jazz','편안한 재즈 음악을 선사합니다.','서울 광장'),(37.5704,126.9926,'2025-02-12 19:30:00.456789','2025-02-02 11:30:25.123654',2,7,'2025-02-20 21:29:48.000000','Acoustic Vibes','어쿠스틱 기타 연주와 함께하는 힐링 타임.','인사동 문화거리'),(37.5826,127.0012,'2025-02-14 17:45:00.789654','2025-02-03 14:50:55.456321',3,8,'2025-02-20 21:29:48.000000','Indie Love Songs','인디 밴드와 함께 감성적인 음악 여행.','홍대 걷고 싶은 거리'),(37.5546,126.9706,'2025-02-16 20:00:00.321456','2025-02-04 09:10:15.789654',4,9,'2025-02-20 21:29:48.000000','K-pop Dance Night','트렌디한 K-pop 댄스를 라이브로!','이태원 클럽 거리'),(37.5662,126.9824,'2025-02-18 18:30:00.654987','2025-02-05 12:20:40.321789',5,10,'2025-02-20 21:29:48.000000','Street Freestyle','힙합과 자유로운 비트의 만남.','강남역 M스테이지'),(37.5708,126.9851,'2025-02-20 19:00:00.987654','2025-02-06 15:25:33.654123',6,11,'2025-02-20 21:29:48.000000','Romantic Violin','낭만적인 바이올린 선율을 느껴보세요.','청계천 광장'),(37.559,126.9425,'2025-02-22 21:15:00.654321','2025-02-07 10:40:25.321987',7,12,'2025-02-20 21:29:48.000000','Rock the City','도시 속 강렬한 락 음악.','건대 스타시티'),(37.5416,127.0999,'2025-02-24 17:00:00.321987','2025-02-08 07:30:50.654321',8,13,'2025-02-20 21:29:48.000000','Latin Fiesta','뜨거운 라틴 리듬과 함께 춤을!','올림픽 공원'),(37.5236,126.9873,'2025-02-26 19:45:00.654123','2025-02-09 13:40:10.789654',9,14,'2025-02-20 21:29:48.000000','Blues Night','깊은 감성의 블루스 공연.','남산 서울타워'),(37.5665,126.978,'2025-02-28 18:00:00.789654','2025-02-10 08:35:40.987654',10,15,'2025-02-20 21:29:48.000000','Busan Soul','부산에서 열리는 감성 넘치는 소울 공연.','해운대 해변'),(37.4815,126.952,'2025-03-02 20:30:00.123456','2025-02-11 14:10:15.987654',1,16,'2025-02-20 21:29:48.000000','Classic Melodies','클래식 음악의 아름다움을 느껴보세요.','예술의 전당 야외무대'),(37.491,127.0177,'2025-03-04 18:45:00.654789','2025-02-12 16:50:55.123789',2,17,'2025-02-20 21:29:48.000000','Folk Song Night','포크송과 함께하는 감성 저녁.','삼청동 북촌마을'),(37.5011,127.0396,'2025-03-06 17:30:00.321654','2025-02-13 09:15:30.789654',3,18,'2025-02-20 21:29:48.000000','Funky Beats','신나는 펑키 음악과 함께.','서울숲 야외공연장'),(37.5096,127.0587,'2025-03-08 19:15:00.987321','2025-02-14 12:50:55.987654',4,19,'2025-02-20 21:29:48.000000','EDM Party','최고의 EDM DJ들이 펼치는 라이브!','한강 반포공원'),(37.5172,126.9109,'2025-03-10 18:00:00.654123','2025-02-15 07:45:20.321789',5,20,'2025-02-20 21:29:48.000000','Traditional Sounds','전통 국악과 함께하는 특별한 밤.','국립국악원 야외마당'),(37.5665,126.978,'2025-02-11 12:00:00.000000','2025-02-01 09:00:00.000000',1,21,'2025-02-01 09:00:00.000000','어쿠스틱 공연','감성적인 어쿠스틱 커버곡 공연','서울 시청 광장'),(37.5276,127.0443,'2025-02-11 13:30:00.000000','2025-02-01 10:15:00.000000',2,22,'2025-02-01 10:15:00.000000','힙합 쇼케이스','언더그라운드 힙합 공연','잠실 롯데월드몰 광장'),(37.5139,127.0605,'2025-02-11 14:00:00.000000','2025-02-01 11:30:00.000000',3,23,'2025-02-01 11:30:00.000000','재즈 트리오','클래식 재즈 공연','강남 코엑스 광장'),(37.5586,126.9254,'2025-02-11 15:00:00.000000','2025-02-01 13:00:00.000000',4,24,'2025-02-01 13:00:00.000000','밴드 공연','인디 록밴드 라이브','홍대 걷고싶은거리'),(37.5707,126.9926,'2025-02-11 16:30:00.000000','2025-02-01 14:20:00.000000',5,25,'2025-02-01 14:20:00.000000','팝 커버','인기 팝송 메들리','명동 중앙무대'),(37.5565,126.9404,'2025-02-11 17:00:00.000000','2025-02-01 15:00:00.000000',6,26,'2025-02-01 15:00:00.000000','퍼포먼스','비보이 댄스 공연','신촌 연세로'),(37.5411,127.0679,'2025-02-11 13:00:00.000000','2025-02-01 16:30:00.000000',7,27,'2025-02-01 16:30:00.000000','어쿠스틱 듀오','감성 발라드 공연','삼성동 코엑스 밀레니엄 광장'),(37.5582,126.9977,'2025-02-11 14:30:00.000000','2025-02-01 17:45:00.000000',8,28,'2025-02-01 17:45:00.000000','클래식 연주','현악 4중주','을지로 지하상가'),(37.5273,127.0276,'2025-02-11 15:30:00.000000','2025-02-01 18:20:00.000000',9,29,'2025-02-01 18:20:00.000000','트로트 메들리','신나는 트로트 공연','신천 잠실새내역'),(37.5612,127.0359,'2025-02-11 16:00:00.000000','2025-02-02 09:00:00.000000',10,30,'2025-02-02 09:00:00.000000','K-POP 커버','아이돌 댄스 커버','건대입구역 광장'),(37.5432,126.9508,'2025-02-11 17:30:00.000000','2025-02-02 10:30:00.000000',1,31,'2025-02-02 10:30:00.000000','락밴드 공연','오리지널 곡 발표','상수동 카페거리'),(37.5641,127.0084,'2025-02-11 18:00:00.000000','2025-02-02 11:45:00.000000',2,32,'2025-02-02 11:45:00.000000','포크송 공연','70-80년대 포크송','왕십리 광장'),(37.5249,127.0364,'2025-02-11 12:30:00.000000','2025-02-02 13:15:00.000000',3,33,'2025-02-02 13:15:00.000000','플루트 연주','클래식 명곡 연주','석촌호수 공원'),(37.5591,127.041,'2025-02-11 13:45:00.000000','2025-02-02 14:30:00.000000',4,34,'2025-02-02 14:30:00.000000','힙합 공연','프리스타일 랩 배틀','군자역 광장'),(37.5489,126.9217,'2025-02-11 14:15:00.000000','2025-02-02 15:45:00.000000',5,35,'2025-02-02 15:45:00.000000','재즈 공연','스윙 재즈 공연','합정 메세나폴리스'),(37.5383,127.0825,'2025-02-11 15:45:00.000000','2025-02-02 16:20:00.000000',6,36,'2025-02-02 16:20:00.000000','어쿠스틱 공연','감성 포크 공연','천호역 광장'),(37.5492,126.9138,'2025-02-11 16:15:00.000000','2025-02-02 17:00:00.000000',7,37,'2025-02-02 17:00:00.000000','팝 페스티벌','팝송 메들리','망원 한강공원'),(37.5615,127.0366,'2025-02-11 17:45:00.000000','2025-02-02 18:30:00.000000',8,38,'2025-02-02 18:30:00.000000','밴드 공연','락밴드 커버곡','건대 로데오거리'),(37.5577,126.9236,'2025-02-11 18:15:00.000000','2025-02-02 19:00:00.000000',9,39,'2025-02-02 19:00:00.000000','퍼포먼스','마임 퍼포먼스','연남동 경의선숲길'),(37.5512,127.1047,'2025-02-11 12:45:00.000000','2025-02-02 20:15:00.000000',10,40,'2025-02-02 20:15:00.000000','클래식','피아노 독주회','길동 생태공원'),(37.5665,126.978,'2025-02-12 12:00:00.000000','2025-02-02 09:00:00.000000',1,41,'2025-02-02 09:00:00.000000','힙합 공연','언더그라운드 힙합','서울 시청 광장'),(37.5276,127.0443,'2025-02-12 13:30:00.000000','2025-02-02 10:15:00.000000',2,42,'2025-02-02 10:15:00.000000','재즈 퀄텟','모던 재즈 공연','잠실 롯데월드몰 광장'),(37.5139,127.0605,'2025-02-12 14:00:00.000000','2025-02-02 11:30:00.000000',3,43,'2025-02-02 11:30:00.000000','어쿠스틱 공연','기타 솔로 공연','강남 코엑스 광장'),(37.5586,126.9254,'2025-02-12 15:00:00.000000','2025-02-02 13:00:00.000000',4,44,'2025-02-02 13:00:00.000000','락밴드','헤비메탈 공연','홍대 걷고싶은거리'),(37.5707,126.9926,'2025-02-12 16:30:00.000000','2025-02-02 14:20:00.000000',5,45,'2025-02-02 14:20:00.000000','K-POP 커버','여자아이돌 댄스','명동 중앙무대'),(37.5565,126.9404,'2025-02-12 17:00:00.000000','2025-02-02 15:00:00.000000',6,46,'2025-02-02 15:00:00.000000','스트릿 댄스','팝핀 댄스 공연','신촌 연세로'),(37.5411,127.0679,'2025-02-12 13:00:00.000000','2025-02-02 16:30:00.000000',7,47,'2025-02-02 16:30:00.000000','클래식','바이올린 독주','삼성동 코엑스 밀레니엄 광장'),(37.5582,126.9977,'2025-02-12 14:30:00.000000','2025-02-02 17:45:00.000000',8,48,'2025-02-02 17:45:00.000000','포크송','통기타 공연','을지로 지하상가'),(37.5273,127.0276,'2025-02-12 15:30:00.000000','2025-02-02 18:20:00.000000',9,49,'2025-02-02 18:20:00.000000','트로트','신세대 트로트','신천 잠실새내역'),(37.5612,127.0359,'2025-02-12 16:00:00.000000','2025-02-03 09:00:00.000000',10,50,'2025-02-03 09:00:00.000000','팝 커버','빌보드 히트곡','건대입구역 광장'),(37.5432,126.9508,'2025-02-12 17:30:00.000000','2025-02-03 10:30:00.000000',1,51,'2025-02-03 10:30:00.000000','인디밴드','인디음악 공연','상수동 카페거리'),(37.5641,127.0084,'2025-02-12 18:00:00.000000','2025-02-03 11:45:00.000000',2,52,'2025-02-03 11:45:00.000000','발라드','감성 발라드','왕십리 광장'),(37.5249,127.0364,'2025-02-12 12:30:00.000000','2025-02-03 13:15:00.000000',3,53,'2025-02-03 13:15:00.000000','색소폰 연주','재즈 스탠다드','석촌호수 공원'),(37.5591,127.041,'2025-02-12 13:45:00.000000','2025-02-03 14:30:00.000000',4,54,'2025-02-03 14:30:00.000000','비보잉','브레이크 댄스','군자역 광장'),(37.5489,126.9217,'2025-02-12 14:15:00.000000','2025-02-03 15:45:00.000000',5,55,'2025-02-03 15:45:00.000000','퓨전 재즈','현대 재즈','합정 메세나폴리스'),(37.5383,127.0825,'2025-02-12 15:45:00.000000','2025-02-03 16:20:00.000000',6,56,'2025-02-03 16:20:00.000000','포크 공연','어쿠스틱 포크','천호역 광장'),(37.5492,126.9138,'2025-02-12 16:15:00.000000','2025-02-03 17:00:00.000000',7,57,'2025-02-03 17:00:00.000000','팝 페스티벌','팝송 커버','망원 한강공원'),(37.5615,127.0366,'2025-02-12 17:45:00.000000','2025-02-03 18:30:00.000000',8,58,'2025-02-03 18:30:00.000000','록 페스티벌','클래식 록','건대 로데오거리'),(37.5577,126.9236,'2025-02-12 18:15:00.000000','2025-02-03 19:00:00.000000',9,59,'2025-02-03 19:00:00.000000','스트릿 댄스','현대무용','연남동 경의선숲길'),(37.5512,127.1047,'2025-02-12 12:45:00.000000','2025-02-03 20:15:00.000000',10,60,'2025-02-03 20:15:00.000000','클래식','첼로 독주회','길동 생태공원'),(37.5665,126.978,'2025-02-13 12:00:00.000000','2025-02-03 09:00:00.000000',1,61,'2025-02-03 09:00:00.000000','클래식 기타','스페인 기타곡 연주회','서울 시청 광장'),(37.5276,127.0443,'2025-02-13 13:30:00.000000','2025-02-03 10:15:00.000000',2,62,'2025-02-03 10:15:00.000000','힙합 공연','알앤비 힙합 쇼','잠실 롯데월드몰 광장'),(37.5139,127.0605,'2025-02-13 14:00:00.000000','2025-02-03 11:30:00.000000',3,63,'2025-02-03 11:30:00.000000','보컬 그룹','아카펠라 공연','강남 코엑스 광장'),(37.5586,126.9254,'2025-02-13 15:00:00.000000','2025-02-03 13:00:00.000000',4,64,'2025-02-03 13:00:00.000000','인디밴드','얼터너티브 록','홍대 걷고싶은거리'),(37.5707,126.9926,'2025-02-13 16:30:00.000000','2025-02-03 14:20:00.000000',5,65,'2025-02-03 14:20:00.000000','힙합댄스','스트릿 댄스 배틀','명동 중앙무대'),(37.5565,126.9404,'2025-02-13 17:00:00.000000','2025-02-03 15:00:00.000000',6,66,'2025-02-03 15:00:00.000000','어쿠스틱 밴드','컨트리 음악','신촌 연세로'),(37.5411,127.0679,'2025-02-13 13:00:00.000000','2025-02-03 16:30:00.000000',7,67,'2025-02-03 16:30:00.000000','재즈밴드','빅밴드 재즈','삼성동 코엑스 밀레니엄 광장'),(37.5582,126.9977,'2025-02-13 14:30:00.000000','2025-02-03 17:45:00.000000',8,68,'2025-02-03 17:45:00.000000','피아노 트리오','클래식 앙상블','을지로 지하상가'),(37.5273,127.0276,'2025-02-13 15:30:00.000000','2025-02-03 18:20:00.000000',9,69,'2025-02-03 18:20:00.000000','퓨전국악','전통음악 재해석','신천 잠실새내역'),(37.5612,127.0359,'2025-02-13 16:00:00.000000','2025-02-04 09:00:00.000000',10,70,'2025-02-04 09:00:00.000000','스트릿 댄스','팝핀 퍼포먼스','건대입구역 광장'),(37.5432,126.9508,'2025-02-13 17:30:00.000000','2025-02-04 10:30:00.000000',1,71,'2025-02-04 10:30:00.000000','어쿠스틱 듀오','포크 발라드','상수동 카페거리'),(37.5641,127.0084,'2025-02-13 18:00:00.000000','2025-02-04 11:45:00.000000',2,72,'2025-02-04 11:45:00.000000','플루트 앙상블','클래식 명곡','왕십리 광장'),(37.5249,127.0364,'2025-02-13 12:30:00.000000','2025-02-04 13:15:00.000000',3,73,'2025-02-04 13:15:00.000000','록밴드','브릿팝 커버','석촌호수 공원'),(37.5591,127.041,'2025-02-13 13:45:00.000000','2025-02-04 14:30:00.000000',4,74,'2025-02-04 14:30:00.000000','비보이','힙합 퍼포먼스','군자역 광장'),(37.5489,126.9217,'2025-02-13 14:15:00.000000','2025-02-04 15:45:00.000000',5,75,'2025-02-04 15:45:00.000000','재즈 퀄텟','라틴 재즈','합정 메세나폴리스'),(37.5383,127.0825,'2025-02-13 15:45:00.000000','2025-02-04 16:20:00.000000',6,76,'2025-02-04 16:20:00.000000','싱어송라이터','오리지널 곡','천호역 광장'),(37.5492,126.9138,'2025-02-13 16:15:00.000000','2025-02-04 17:00:00.000000',7,77,'2025-02-04 17:00:00.000000','디제잉','일렉트로닉 세트','망원 한강공원'),(37.5615,127.0366,'2025-02-13 17:45:00.000000','2025-02-04 18:30:00.000000',8,78,'2025-02-04 18:30:00.000000','밴드 공연','얼터너티브 메탈','건대 로데오거리'),(37.5577,126.9236,'2025-02-13 18:15:00.000000','2025-02-04 19:00:00.000000',9,79,'2025-02-04 19:00:00.000000','마술 퍼포먼스','스트릿 매직쇼','연남동 경의선숲길'),(37.5512,127.1047,'2025-02-13 12:45:00.000000','2025-02-04 20:15:00.000000',10,80,'2025-02-04 20:15:00.000000','현악 앙상블','실내악 공연','길동 생태공원'),(37.5665,126.978,'2025-02-13 18:00:00.000000','2025-02-20 21:29:48.000000',1,81,'2025-02-20 21:29:48.000000','서울 버스킹 공연','서울에서 열리는 멋진 버스킹 공연입니다.','서울'),(37.5651,126.9895,'2025-02-13 19:30:00.000000','2025-02-20 21:29:48.000000',2,82,'2025-02-20 21:29:48.000000','홍대 버스킹','홍대 거리에서 감성적인 버스킹 공연.','서울'),(37.5704,126.9921,'2025-02-13 20:00:00.000000','2025-02-20 21:29:48.000000',3,83,'2025-02-20 21:29:48.000000','명동 버스킹','명동에서 펼쳐지는 멋진 거리 공연.','서울'),(35.1595,126.8526,'2025-02-13 17:30:00.000000','2025-02-20 21:29:48.000000',5,84,'2025-02-20 21:29:48.000000','광주 국립아시아문화전당 버스킹','문화전당 앞에서 펼쳐지는 공연.','광주'),(35.1579,126.9017,'2025-02-13 19:00:00.000000','2025-02-20 21:29:48.000000',6,85,'2025-02-20 21:29:48.000000','충장로 거리공연','광주 충장로 거리에서 펼쳐지는 버스킹.','광주'),(35.1442,126.9326,'2025-02-13 20:30:00.000000','2025-02-20 21:29:48.000000',7,86,'2025-02-20 21:29:48.000000','광주역 버스킹','광주역 광장에서 감미로운 공연.','광주'),(35.1365,126.8786,'2025-02-13 21:00:00.000000','2025-02-20 21:29:48.000000',8,87,'2025-02-20 21:29:48.000000','광주 송정역 거리공연','광주 송정역에서 펼쳐지는 공연.','광주'),(37.8854,127.7302,'2025-02-13 16:30:00.000000','2025-02-20 21:29:48.000000',9,88,'2025-02-20 21:29:48.000000','춘천 남이섬 버스킹','남이섬에서 펼쳐지는 감성 공연.','강원도'),(37.5584,129.0955,'2025-02-13 18:00:00.000000','2025-02-20 21:29:48.000000',10,89,'2025-02-20 21:29:48.000000','강릉 경포대 거리공연','경포대 해변가에서 감미로운 공연.','강원도'),(37.3812,128.3987,'2025-02-13 19:30:00.000000','2025-02-20 21:29:48.000000',11,90,'2025-02-20 21:29:48.000000','정선 5일장 버스킹','정선 5일장에서 펼쳐지는 공연.','강원도'),(36.3504,127.3845,'2025-02-13 17:00:00.000000','2025-02-20 21:29:48.000000',13,91,'2025-02-20 21:29:48.000000','대전 은행동 버스킹','대전 은행동 거리에서 멋진 공연.','대전'),(36.3475,127.3867,'2025-02-13 18:30:00.000000','2025-02-20 21:29:48.000000',14,92,'2025-02-20 21:29:48.000000','대전 중앙시장 거리공연','중앙시장 앞에서 펼쳐지는 감성 공연.','대전'),(36.3214,127.4041,'2025-02-13 19:45:00.000000','2025-02-20 21:29:48.000000',15,93,'2025-02-20 21:29:48.000000','대전 유성 온천 버스킹','유성 온천 근처에서 감성적인 공연.','대전'),(36.3681,127.3505,'2025-02-13 20:15:00.000000','2025-02-20 21:29:48.000000',16,94,'2025-02-20 21:29:48.000000','대전 엑스포공원 공연','엑스포공원에서 펼쳐지는 버스킹 공연.','대전'),(35.0906,128.8554,'2025-02-13 17:15:00.000000','2025-02-20 21:29:48.000000',17,95,'2025-02-20 21:29:48.000000','녹산 산업단지 거리공연','녹산 공단 지역에서 버스킹 공연.','녹산'),(35.0811,128.8734,'2025-02-13 18:45:00.000000','2025-02-20 21:29:48.000000',18,96,'2025-02-20 21:29:48.000000','녹산 해변가 라이브 공연','녹산 해변에서 감미로운 거리공연.','녹산'),(35.0765,128.8607,'2025-02-13 19:30:00.000000','2025-02-20 21:29:48.000000',19,97,'2025-02-20 21:29:48.000000','녹산 버스터미널 버스킹','버스터미널 앞에서 펼쳐지는 감성 공연.','녹산'),(35.0932,128.9675,'2025-02-13 16:45:00.000000','2025-02-20 21:29:48.000000',21,98,'2025-02-20 21:29:48.000000','명지 신도시 거리공연','명지 신도시에서 펼쳐지는 멋진 공연.','명지'),(35.0984,128.9743,'2025-02-13 18:00:00.000000','2025-02-20 21:29:48.000000',22,99,'2025-02-20 21:29:48.000000','명지 국제신도시 버스킹','명지 국제신도시에서 감미로운 공연.','명지'),(35.0879,128.9601,'2025-02-13 19:30:00.000000','2025-02-20 21:29:48.000000',23,100,'2025-02-20 21:29:48.000000','명지 바닷가 라이브 공연','명지 바닷가에서 펼쳐지는 감성 공연.','명지'),(35.0814,128.9557,'2025-02-13 20:30:00.000000','2025-02-20 21:29:48.000000',24,101,'2025-02-20 21:29:48.000000','명지 거리공연','명지 내 인기 거리에서 펼쳐지는 공연.','명지'),(37.5668,126.9783,'2025-02-14 18:00:00.000000','2025-02-20 21:29:48.000000',25,102,'2025-02-20 21:29:48.000000','서울 버스킹 공연','서울에서 열리는 멋진 버스킹 공연입니다.','서울'),(37.5653,126.9898,'2025-02-14 19:30:00.000000','2025-02-20 21:29:48.000000',26,103,'2025-02-20 21:29:48.000000','홍대 버스킹','홍대 거리에서 감성적인 버스킹 공연.','서울'),(37.5707,126.9924,'2025-02-14 20:00:00.000000','2025-02-20 21:29:48.000000',27,104,'2025-02-20 21:29:48.000000','명동 버스킹','명동에서 펼쳐지는 멋진 거리 공연.','서울'),(37.5588,126.999,'2025-02-14 21:00:00.000000','2025-02-20 21:29:48.000000',28,105,'2025-02-20 21:29:48.000000','강남 버스킹','강남역 인근에서 감성적인 공연.','서울'),(35.1598,126.8529,'2025-02-14 17:30:00.000000','2025-02-20 21:29:48.000000',29,106,'2025-02-20 21:29:48.000000','광주 국립아시아문화전당 버스킹','문화전당 앞에서 펼쳐지는 공연.','광주'),(35.1582,126.902,'2025-02-14 19:00:00.000000','2025-02-20 21:29:48.000000',30,107,'2025-02-20 21:29:48.000000','충장로 거리공연','광주 충장로 거리에서 펼쳐지는 버스킹.','광주'),(35.1445,126.9329,'2025-02-14 20:30:00.000000','2025-02-20 21:29:48.000000',31,108,'2025-02-20 21:29:48.000000','광주역 버스킹','광주역 광장에서 감미로운 공연.','광주'),(37.8857,127.7305,'2025-02-14 16:30:00.000000','2025-02-20 21:29:48.000000',33,109,'2025-02-20 21:29:48.000000','춘천 남이섬 버스킹','남이섬에서 펼쳐지는 감성 공연.','강원도'),(37.5587,129.0958,'2025-02-14 18:00:00.000000','2025-02-20 21:29:48.000000',34,110,'2025-02-20 21:29:48.000000','강릉 경포대 거리공연','경포대 해변가에서 감미로운 공연.','강원도'),(37.3815,128.399,'2025-02-14 19:30:00.000000','2025-02-20 21:29:48.000000',35,111,'2025-02-20 21:29:48.000000','정선 5일장 버스킹','정선 5일장에서 펼쳐지는 공연.','강원도'),(38.2087,128.5922,'2025-02-14 20:00:00.000000','2025-02-20 21:29:48.000000',36,112,'2025-02-20 21:29:48.000000','속초 영금정 거리공연','속초 영금정에서 펼쳐지는 라이브 공연.','강원도'),(36.3507,127.3848,'2025-02-14 17:00:00.000000','2025-02-20 21:29:48.000000',37,113,'2025-02-20 21:29:48.000000','대전 은행동 버스킹','대전 은행동 거리에서 멋진 공연.','대전'),(36.3478,127.387,'2025-02-14 18:30:00.000000','2025-02-20 21:29:48.000000',38,114,'2025-02-20 21:29:48.000000','대전 중앙시장 거리공연','중앙시장 앞에서 펼쳐지는 감성 공연.','대전'),(36.3217,127.4044,'2025-02-14 19:45:00.000000','2025-02-20 21:29:48.000000',39,115,'2025-02-20 21:29:48.000000','대전 유성 온천 버스킹','유성 온천 근처에서 감성적인 공연.','대전'),(35.0909,128.8557,'2025-02-14 17:15:00.000000','2025-02-20 21:29:48.000000',41,116,'2025-02-20 21:29:48.000000','녹산 산업단지 거리공연','녹산 공단 지역에서 버스킹 공연.','녹산'),(35.0814,128.8737,'2025-02-14 18:45:00.000000','2025-02-20 21:29:48.000000',42,117,'2025-02-20 21:29:48.000000','녹산 해변가 라이브 공연','녹산 해변에서 감미로운 거리공연.','녹산'),(35.0768,128.861,'2025-02-14 19:30:00.000000','2025-02-20 21:29:48.000000',43,118,'2025-02-20 21:29:48.000000','녹산 버스터미널 버스킹','버스터미널 앞에서 펼쳐지는 감성 공연.','녹산'),(35.0701,128.8525,'2025-02-14 20:00:00.000000','2025-02-20 21:29:48.000000',44,119,'2025-02-20 21:29:48.000000','녹산 거리공연','녹산 지역 내 거리에서 펼쳐지는 공연.','녹산'),(35.0935,128.9678,'2025-02-14 16:45:00.000000','2025-02-20 21:29:48.000000',45,120,'2025-02-20 21:29:48.000000','명지 신도시 거리공연','명지 신도시에서 펼쳐지는 멋진 공연.','명지'),(35.0987,128.9746,'2025-02-14 18:00:00.000000','2025-02-20 21:29:48.000000',46,121,'2025-02-20 21:29:48.000000','명지 국제신도시 버스킹','명지 국제신도시에서 감미로운 공연.','명지'),(35.0882,128.9604,'2025-02-14 19:30:00.000000','2025-02-20 21:29:48.000000',47,122,'2025-02-20 21:29:48.000000','명지 바닷가 라이브 공연','명지 바닷가에서 펼쳐지는 감성 공연.','명지'),(37.5665,126.978,'2025-02-15 18:00:00.000000','2025-02-20 21:29:48.000000',63,123,'2025-02-20 21:29:48.000000','서울 명동 거리공연','명동에서 펼쳐지는 감성 라이브.','서울'),(37.567,126.9782,'2025-02-15 19:00:00.000000','2025-02-20 21:29:48.000000',64,124,'2025-02-20 21:29:48.000000','서울 대학로 버스킹','대학로에서 펼쳐지는 공연.','서울'),(37.5675,126.9784,'2025-02-15 20:00:00.000000','2025-02-20 21:29:48.000000',65,125,'2025-02-20 21:29:48.000000','서울 홍대 거리공연','홍대에서 감성적인 버스킹.','서울'),(37.568,126.9786,'2025-02-15 21:00:00.000000','2025-02-20 21:29:48.000000',66,126,'2025-02-20 21:29:48.000000','서울 강남역 라이브','강남역 인근에서 감미로운 공연.','서울'),(37.5685,126.9788,'2025-02-15 22:00:00.000000','2025-02-20 21:29:48.000000',67,127,'2025-02-20 21:29:48.000000','서울 신촌 거리공연','신촌 거리에서 펼쳐지는 공연.','서울'),(35.1595,126.8525,'2025-02-15 18:00:00.000000','2025-02-20 21:29:48.000000',58,128,'2025-02-20 21:29:48.000000','광주 충장로 버스킹','충장로에서 펼쳐지는 공연.','광주'),(35.16,126.853,'2025-02-15 19:00:00.000000','2025-02-20 21:29:48.000000',59,129,'2025-02-20 21:29:48.000000','광주 상무지구 거리공연','상무지구에서 감미로운 라이브.','광주'),(35.1605,126.8535,'2025-02-15 20:00:00.000000','2025-02-20 21:29:48.000000',60,130,'2025-02-20 21:29:48.000000','광주 아시아문화전당 공연','문화전당 앞에서 진행되는 공연.','광주'),(35.161,126.854,'2025-02-15 21:00:00.000000','2025-02-20 21:29:48.000000',61,131,'2025-02-20 21:29:48.000000','광주 송정역 거리공연','광주 송정역 앞에서 감성적인 공연.','광주'),(35.1615,126.8545,'2025-02-15 22:00:00.000000','2025-02-20 21:29:48.000000',62,132,'2025-02-20 21:29:48.000000','광주 대인시장 라이브','광주 대인시장 근처에서 감성적인 공연.','광주'),(37.8855,127.73,'2025-02-15 18:00:00.000000','2025-02-20 21:29:48.000000',53,133,'2025-02-20 21:29:48.000000','춘천 남이섬 버스킹','남이섬에서 감성적인 공연.','강원도'),(37.886,127.7305,'2025-02-15 19:00:00.000000','2025-02-20 21:29:48.000000',54,134,'2025-02-20 21:29:48.000000','춘천 레고랜드 라이브','레고랜드 앞에서 펼쳐지는 공연.','강원도'),(37.8865,127.731,'2025-02-15 20:00:00.000000','2025-02-20 21:29:48.000000',55,135,'2025-02-20 21:29:48.000000','속초 해수욕장 거리공연','속초 해수욕장에서 감미로운 버스킹.','강원도'),(37.887,127.7315,'2025-02-15 21:00:00.000000','2025-02-20 21:29:48.000000',56,136,'2025-02-20 21:29:48.000000','강릉 해변 거리공연','강릉 해변에서 펼쳐지는 감성 공연.','강원도'),(37.8875,127.732,'2025-02-15 22:00:00.000000','2025-02-20 21:29:48.000000',57,137,'2025-02-20 21:29:48.000000','주문진 해변 라이브','주문진 해변에서 감미로운 공연.','강원도'),(36.3505,127.3845,'2025-02-15 18:00:00.000000','2025-02-20 21:29:48.000000',48,138,'2025-02-20 21:29:48.000000','대전 중앙시장 거리공연','대전 중앙시장 앞에서 진행되는 공연.','대전'),(36.351,127.385,'2025-02-15 19:00:00.000000','2025-02-20 21:29:48.000000',49,139,'2025-02-20 21:29:48.000000','대전 은행동 버스킹','은행동 거리에서 멋진 공연.','대전'),(36.3515,127.3855,'2025-02-15 20:00:00.000000','2025-02-20 21:29:48.000000',50,140,'2025-02-20 21:29:48.000000','대전 유성온천 라이브','유성온천 근처에서 감성적인 버스킹.','대전'),(36.352,127.386,'2025-02-15 21:00:00.000000','2025-02-20 21:29:48.000000',51,141,'2025-02-20 21:29:48.000000','대전 엑스포과학공원 공연','엑스포과학공원에서 진행되는 감성 공연.','대전'),(36.3525,127.3865,'2025-02-15 22:00:00.000000','2025-02-20 21:29:48.000000',52,142,'2025-02-20 21:29:48.000000','대전 엑스포공원 거리공연','엑스포공원 내에서 펼쳐지는 공연.','대전'),(35.0905,128.855,'2025-02-15 18:00:00.000000','2025-02-20 21:29:48.000000',43,143,'2025-02-20 21:29:48.000000','녹산 해변 거리공연','녹산 해변에서 감성적인 라이브 공연.','녹산'),(35.091,128.8555,'2025-02-15 19:00:00.000000','2025-02-20 21:29:48.000000',44,144,'2025-02-20 21:29:48.000000','녹산 거리공연','녹산 지역 내 인기 장소에서 펼쳐지는 공연.','녹산'),(35.0915,128.856,'2025-02-15 20:00:00.000000','2025-02-20 21:29:48.000000',45,145,'2025-02-20 21:29:48.000000','녹산 바닷가 버스킹','녹산 바닷가에서 펼쳐지는 감미로운 공연.','녹산'),(35.092,128.8565,'2025-02-15 21:00:00.000000','2025-02-20 21:29:48.000000',46,146,'2025-02-20 21:29:48.000000','녹산 거리 라이브','녹산 지역 거리에서 펼쳐지는 감성 공연.','녹산'),(35.0925,128.857,'2025-02-15 22:00:00.000000','2025-02-20 21:29:48.000000',47,147,'2025-02-20 21:29:48.000000','녹산 해변 라이브','녹산 해변에서 감미로운 공연.','녹산'),(35.0935,128.9678,'2025-02-14 16:45:00.000000','2025-02-20 21:29:48.000000',45,148,'2025-02-20 21:29:48.000000','명지 신도시 거리공연','명지 신도시에서 펼쳐지는 멋진 공연.','명지'),(35.0987,128.9746,'2025-02-14 18:00:00.000000','2025-02-20 21:29:48.000000',46,149,'2025-02-20 21:29:48.000000','명지 국제신도시 버스킹','명지 국제신도시에서 감미로운 공연.','명지'),(35.0882,128.9604,'2025-02-14 19:30:00.000000','2025-02-20 21:29:48.000000',47,150,'2025-02-20 21:29:48.000000','명지 바닷가 라이브 공연','명지 바닷가에서 펼쳐지는 감성 공연.','명지'),(37.5665,126.978,'2025-02-16 14:00:00.000000','2025-02-01 09:00:00.000000',12,151,'2025-02-01 09:00:00.000000','서울 버스킹 공연 1','신나는 어쿠스틱 공연을 선보입니다!','서울특별시 종로구 광화문광장'),(37.5139,127.06,'2025-02-16 15:30:00.000000','2025-02-01 10:15:00.000000',24,152,'2025-02-01 10:15:00.000000','서울 버스킹 공연 2','감성적인 재즈 공연','서울특별시 강남구 코엑스광장'),(37.5577,126.9226,'2025-02-16 17:00:00.000000','2025-02-01 11:30:00.000000',35,153,'2025-02-01 11:30:00.000000','서울 버스킹 공연 3','신나는 힙합 퍼포먼스','서울특별시 마포구 홍대거리'),(37.5711,126.9923,'2025-02-16 18:30:00.000000','2025-02-01 12:45:00.000000',47,154,'2025-02-01 12:45:00.000000','서울 버스킹 공연 4','클래식과 대중음악의 만남','서울특별시 중구 명동거리'),(35.1595,126.8526,'2025-02-16 13:00:00.000000','2025-02-01 09:30:00.000000',15,155,'2025-02-01 09:30:00.000000','광주 버스킹 공연 1','전통과 현대의 콜라보','광주광역시 동구 충장로'),(35.146,126.9223,'2025-02-16 14:30:00.000000','2025-02-01 10:45:00.000000',27,156,'2025-02-01 10:45:00.000000','광주 버스킹 공연 2','청년 뮤지션들의 열정 무대','광주광역시 서구 상무지구'),(35.1738,126.9115,'2025-02-16 16:00:00.000000','2025-02-01 12:00:00.000000',38,157,'2025-02-01 12:00:00.000000','광주 버스킹 공연 3','감성 발라드 공연','광주광역시 북구 전남대학교'),(35.1325,126.7937,'2025-02-16 17:30:00.000000','2025-02-01 13:15:00.000000',49,158,'2025-02-01 13:15:00.000000','광주 버스킹 공연 4','인디밴드 공연','광주광역시 광산구 수완지구'),(35.1468,126.9152,'2025-02-16 19:00:00.000000','2025-02-01 14:30:00.000000',61,159,'2025-02-01 14:30:00.000000','광주 버스킹 공연 5','락밴드의 열정 무대','광주광역시 서구 유스퀘어'),(37.8813,127.73,'2025-02-16 12:00:00.000000','2025-02-01 09:45:00.000000',17,160,'2025-02-01 09:45:00.000000','강원도 버스킹 공연 1','산과 함께하는 어쿠스틱','강원도 춘천시 남이섬'),(37.7556,128.8961,'2025-02-16 13:30:00.000000','2025-02-01 11:00:00.000000',29,161,'2025-02-01 11:00:00.000000','강원도 버스킹 공연 2','바다와 함께하는 포크송','강원도 강릉시 안목해변'),(37.3809,129.1707,'2025-02-16 15:00:00.000000','2025-02-01 12:15:00.000000',41,162,'2025-02-01 12:15:00.000000','강원도 버스킹 공연 3','민속음악과 퓨전국악','강원도 삼척시 죽서루'),(37.5556,128.3261,'2025-02-16 16:30:00.000000','2025-02-01 13:30:00.000000',52,163,'2025-02-01 13:30:00.000000','강원도 버스킹 공연 4','산악 힐링 콘서트','강원도 평창군 알펜시아'),(36.3504,127.3845,'2025-02-16 13:00:00.000000','2025-02-01 10:00:00.000000',19,164,'2025-02-01 10:00:00.000000','대전 버스킹 공연 1','과학도시의 테크노 음악','대전광역시 유성구 대학로'),(36.3217,127.4199,'2025-02-16 14:30:00.000000','2025-02-01 11:15:00.000000',31,165,'2025-02-01 11:15:00.000000','대전 버스킹 공연 2','청년예술가 공연','대전광역시 중구 은행동'),(36.3548,127.3778,'2025-02-16 16:00:00.000000','2025-02-01 12:30:00.000000',43,166,'2025-02-01 12:30:00.000000','대전 버스킹 공연 3','R&B 소울 공연','대전광역시 서구 둔산동'),(36.3259,127.4323,'2025-02-16 17:30:00.000000','2025-02-01 13:45:00.000000',54,167,'2025-02-01 13:45:00.000000','대전 버스킹 공연 4','재즈 트리오 공연','대전광역시 동구 중앙로'),(36.3173,127.4041,'2025-02-16 19:00:00.000000','2025-02-01 15:00:00.000000',65,168,'2025-02-01 15:00:00.000000','대전 버스킹 공연 5','퓨전국악 공연','대전광역시 중구 으능정이거리'),(35.0937,128.8526,'2025-02-16 14:00:00.000000','2025-02-01 10:15:00.000000',21,169,'2025-02-01 10:15:00.000000','녹산 버스킹 공연 1','산업단지의 락 스피릿','부산광역시 강서구 녹산산업중앙로'),(35.0892,128.8551,'2025-02-16 15:30:00.000000','2025-02-01 11:30:00.000000',33,170,'2025-02-01 11:30:00.000000','녹산 버스킹 공연 2','워킹맨의 블루스','부산광역시 강서구 녹산동'),(35.0915,128.8498,'2025-02-16 17:00:00.000000','2025-02-01 12:45:00.000000',45,171,'2025-02-01 12:45:00.000000','녹산 버스킹 공연 3','팝 커버 공연','부산광역시 강서구 녹산해맞이공원'),(35.0968,128.8563,'2025-02-16 18:30:00.000000','2025-02-01 14:00:00.000000',56,172,'2025-02-01 14:00:00.000000','녹산 버스킹 공연 4','어쿠스틱 기타 듀오','부산광역시 강서구 녹산문화공원'),(35.0937,128.9026,'2025-02-16 13:00:00.000000','2025-02-01 10:30:00.000000',23,173,'2025-02-01 10:30:00.000000','명지 버스킹 공연 1','해변의 어쿠스틱','부산광역시 강서구 명지국제신도시'),(35.0892,128.9051,'2025-02-16 14:30:00.000000','2025-02-01 11:45:00.000000',34,174,'2025-02-01 11:45:00.000000','명지 버스킹 공연 2','신도시 팝 페스티벌','부산광역시 강서구 명지동'),(35.0915,128.8998,'2025-02-16 16:00:00.000000','2025-02-01 13:00:00.000000',46,175,'2025-02-01 13:00:00.000000','명지 버스킹 공연 3','재즈 트리오의 밤','부산광역시 강서구 명지오션시티'),(35.0968,128.9063,'2025-02-16 17:30:00.000000','2025-02-01 14:15:00.000000',57,176,'2025-02-01 14:15:00.000000','명지 버스킹 공연 4','청년예술가 공연','부산광역시 강서구 명지근린공원'),(35.0901,128.9032,'2025-02-16 19:00:00.000000','2025-02-01 15:30:00.000000',67,177,'2025-02-01 15:30:00.000000','명지 버스킹 공연 5','인디밴드의 밤','부산광역시 강서구 명지공원'),(37.5675,126.979,'2025-02-17 14:00:00.000000','2025-02-03 09:00:00.000000',11,178,'2025-02-03 09:00:00.000000','서울 버스킹 공연 1','봄을 기다리는 어쿠스틱 공연','서울특별시 종로구 광화문광장'),(37.5149,127.061,'2025-02-17 15:30:00.000000','2025-02-03 10:15:00.000000',23,179,'2025-02-03 10:15:00.000000','서울 버스킹 공연 2','도시의 재즈 선율','서울특별시 강남구 코엑스광장'),(37.5587,126.9236,'2025-02-17 17:00:00.000000','2025-02-03 11:30:00.000000',34,180,'2025-02-03 11:30:00.000000','서울 버스킹 공연 3','젊음의 힙합 페스타','서울특별시 마포구 홍대거리'),(37.5721,126.9933,'2025-02-17 18:30:00.000000','2025-02-03 12:45:00.000000',46,181,'2025-02-03 12:45:00.000000','서울 버스킹 공연 4','퓨전 클래식의 밤','서울특별시 중구 명동거리'),(37.5136,127.1035,'2025-02-17 20:00:00.000000','2025-02-03 14:00:00.000000',57,182,'2025-02-03 14:00:00.000000','서울 버스킹 공연 5','어반 포크 뮤직 나잇','서울특별시 송파구 잠실광장'),(35.1605,126.8536,'2025-02-17 13:00:00.000000','2025-02-03 09:30:00.000000',14,183,'2025-02-03 09:30:00.000000','광주 버스킹 공연 1','국악과 현대음악의 만남','광주광역시 동구 충장로'),(35.147,126.9233,'2025-02-17 14:30:00.000000','2025-02-03 10:45:00.000000',26,184,'2025-02-03 10:45:00.000000','광주 버스킹 공연 2','청춘의 음악 이야기','광주광역시 서구 상무지구'),(35.1748,126.9125,'2025-02-17 16:00:00.000000','2025-02-03 12:00:00.000000',37,185,'2025-02-03 12:00:00.000000','광주 버스킹 공연 3','감성 어쿠스틱 공연','광주광역시 북구 전남대학교'),(35.1335,126.7947,'2025-02-17 17:30:00.000000','2025-02-03 13:15:00.000000',48,186,'2025-02-03 13:15:00.000000','광주 버스킹 공연 4','인디음악 페스티벌','광주광역시 광산구 수완지구'),(37.8823,127.731,'2025-02-17 12:00:00.000000','2025-02-03 09:45:00.000000',16,187,'2025-02-03 09:45:00.000000','강원도 버스킹 공연 1','겨울 숲속의 음악회','강원도 춘천시 남이섬'),(37.7566,128.8971,'2025-02-17 13:30:00.000000','2025-02-03 11:00:00.000000',28,188,'2025-02-03 11:00:00.000000','강원도 버스킹 공연 2','커피향과 음악의 만남','강원도 강릉시 안목해변'),(37.3819,129.1717,'2025-02-17 15:00:00.000000','2025-02-03 12:15:00.000000',40,189,'2025-02-03 12:15:00.000000','강원도 버스킹 공연 3','전통과 현대의 하모니','강원도 삼척시 죽서루'),(37.5566,128.3271,'2025-02-17 16:30:00.000000','2025-02-03 13:30:00.000000',51,190,'2025-02-03 13:30:00.000000','강원도 버스킹 공연 4','겨울 스포츠와 음악의 만남','강원도 평창군 알펜시아'),(38.109,128.599,'2025-02-17 18:00:00.000000','2025-02-03 14:45:00.000000',62,191,'2025-02-03 14:45:00.000000','강원도 버스킹 공연 5','설악산 음악회','강원도 속초시 중앙시장'),(36.3514,127.3855,'2025-02-17 13:00:00.000000','2025-02-03 10:00:00.000000',18,192,'2025-02-03 10:00:00.000000','대전 버스킹 공연 1','사이언스 시티 음악제','대전광역시 유성구 대학로'),(36.3227,127.4209,'2025-02-17 14:30:00.000000','2025-02-03 11:15:00.000000',30,193,'2025-02-03 11:15:00.000000','대전 버스킹 공연 2','청년문화 페스티벌','대전광역시 중구 은행동'),(36.3558,127.3788,'2025-02-17 16:00:00.000000','2025-02-03 12:30:00.000000',42,194,'2025-02-03 12:30:00.000000','대전 버스킹 공연 3','솔로 아티스트 공연','대전광역시 서구 둔산동'),(36.3269,127.4333,'2025-02-17 17:30:00.000000','2025-02-03 13:45:00.000000',53,195,'2025-02-03 13:45:00.000000','대전 버스킹 공연 4','실험적 재즈 공연','대전광역시 동구 중앙로'),(35.0947,128.8536,'2025-02-17 14:00:00.000000','2025-02-03 10:15:00.000000',20,196,'2025-02-03 10:15:00.000000','녹산 버스킹 공연 1','공단 로커들의 이야기','부산광역시 강서구 녹산산업중앙로'),(35.0902,128.8561,'2025-02-17 15:30:00.000000','2025-02-03 11:30:00.000000',32,197,'2025-02-03 11:30:00.000000','녹산 버스킹 공연 2','퇴근길 음악회','부산광역시 강서구 녹산동'),(35.0925,128.8508,'2025-02-17 17:00:00.000000','2025-02-03 12:45:00.000000',44,198,'2025-02-03 12:45:00.000000','녹산 버스킹 공연 3','팝 & 재즈 공연','부산광역시 강서구 녹산해맞이공원'),(35.0978,128.8573,'2025-02-17 18:30:00.000000','2025-02-03 14:00:00.000000',55,199,'2025-02-03 14:00:00.000000','녹산 버스킹 공연 4','기타 듀오의 밤','부산광역시 강서구 녹산문화공원'),(35.0911,128.8542,'2025-02-17 20:00:00.000000','2025-02-03 15:15:00.000000',65,200,'2025-02-03 15:15:00.000000','녹산 버스킹 공연 5','주말 나이트 콘서트','부산광역시 강서구 녹산공단로'),(35.0947,128.9036,'2025-02-17 13:00:00.000000','2025-02-03 10:30:00.000000',22,201,'2025-02-03 10:30:00.000000','명지 버스킹 공연 1','바다향 음악회','부산광역시 강서구 명지국제신도시'),(35.0902,128.9061,'2025-02-17 14:30:00.000000','2025-02-03 11:45:00.000000',33,202,'2025-02-03 11:45:00.000000','명지 버스킹 공연 2','신도시 음악 페스타','부산광역시 강서구 명지동'),(35.0925,128.9008,'2025-02-17 16:00:00.000000','2025-02-03 13:00:00.000000',45,203,'2025-02-03 13:00:00.000000','명지 버스킹 공연 3','재즈 온 더 비치','부산광역시 강서구 명지오션시티'),(35.0978,128.9073,'2025-02-17 17:30:00.000000','2025-02-03 14:15:00.000000',56,204,'2025-02-03 14:15:00.000000','명지 버스킹 공연 4','젊은 예술가들의 무대','부산광역시 강서구 명지근린공원'),(37.5685,126.9795,'2025-02-18 14:00:00.000000','2025-02-04 09:00:00.000000',13,205,'2025-02-04 09:00:00.000000','서울 버스킹 공연 1','도시의 낭만 어쿠스틱','서울특별시 종로구 광화문광장'),(37.5159,127.0615,'2025-02-18 15:30:00.000000','2025-02-04 10:15:00.000000',25,206,'2025-02-04 10:15:00.000000','서울 버스킹 공연 2','강남의 재즈 세션','서울특별시 강남구 코엑스광장'),(37.5597,126.9246,'2025-02-18 17:00:00.000000','2025-02-04 11:30:00.000000',36,207,'2025-02-04 11:30:00.000000','서울 버스킹 공연 3','홍대의 힙합 비트','서울특별시 마포구 홍대거리'),(37.5731,126.9943,'2025-02-18 18:30:00.000000','2025-02-04 12:45:00.000000',47,208,'2025-02-04 12:45:00.000000','서울 버스킹 공연 4','명동의 클래식 향연','서울특별시 중구 명동거리'),(35.148,126.9243,'2025-02-18 14:30:00.000000','2025-02-04 10:45:00.000000',27,209,'2025-02-04 10:45:00.000000','광주 버스킹 공연 2','상무지구 팝 콘서트','광주광역시 서구 상무지구'),(35.1758,126.9135,'2025-02-18 16:00:00.000000','2025-02-04 12:00:00.000000',38,210,'2025-02-04 12:00:00.000000','광주 버스킹 공연 3','캠퍼스의 청춘 멜로디','광주광역시 북구 전남대학교'),(35.1345,126.7957,'2025-02-18 17:30:00.000000','2025-02-04 13:15:00.000000',49,211,'2025-02-04 13:15:00.000000','광주 버스킹 공연 4','수완지구 음악 페스타','광주광역시 광산구 수완지구'),(35.1488,126.9172,'2025-02-18 19:00:00.000000','2025-02-04 14:30:00.000000',61,212,'2025-02-04 14:30:00.000000','광주 버스킹 공연 5','유스퀘어 나이트 버스킹','광주광역시 서구 유스퀘어'),(37.7576,128.8981,'2025-02-18 13:30:00.000000','2025-02-04 11:00:00.000000',29,213,'2025-02-04 11:00:00.000000','강원도 버스킹 공연 2','안목해변의 설렘','강원도 강릉시 안목해변'),(37.3829,129.1727,'2025-02-18 15:00:00.000000','2025-02-04 12:15:00.000000',41,214,'2025-02-04 12:15:00.000000','강원도 버스킹 공연 3','죽서루의 풍류','강원도 삼척시 죽서루'),(37.5576,128.3281,'2025-02-18 16:30:00.000000','2025-02-04 13:30:00.000000',52,215,'2025-02-04 13:30:00.000000','강원도 버스킹 공연 4','알펜시아 윈터 콘서트','강원도 평창군 알펜시아'),(38.11,128.6,'2025-02-18 18:00:00.000000','2025-02-04 14:45:00.000000',63,216,'2025-02-04 14:45:00.000000','강원도 버스킹 공연 5','속초 밤바다 선율','강원도 속초시 중앙시장'),(36.3524,127.3865,'2025-02-18 13:00:00.000000','2025-02-04 10:00:00.000000',19,217,'2025-02-04 10:00:00.000000','대전 버스킹 공연 1','대학로의 예술혼','대전광역시 유성구 대학로'),(36.3237,127.4219,'2025-02-18 14:30:00.000000','2025-02-04 11:15:00.000000',31,218,'2025-02-04 11:15:00.000000','대전 버스킹 공연 2','은행동 문화 살롱','대전광역시 중구 은행동'),(36.3568,127.3798,'2025-02-18 16:00:00.000000','2025-02-04 12:30:00.000000',43,219,'2025-02-04 12:30:00.000000','대전 버스킹 공연 3','둔산동의 낭만','대전광역시 서구 둔산동'),(36.3279,127.4343,'2025-02-18 17:30:00.000000','2025-02-04 13:45:00.000000',54,220,'2025-02-04 13:45:00.000000','대전 버스킹 공연 4','중앙로 음악 여행','대전광역시 동구 중앙로'),(36.3193,127.4061,'2025-02-18 19:00:00.000000','2025-02-04 15:00:00.000000',65,221,'2025-02-04 15:00:00.000000','대전 버스킹 공연 5','으능정이의 밤','대전광역시 중구 으능정이거리'),(35.0957,128.8546,'2025-02-18 14:00:00.000000','2025-02-04 10:15:00.000000',21,222,'2025-02-04 10:15:00.000000','녹산 버스킹 공연 1','산업단지의 음악회','부산광역시 강서구 녹산산업중앙로'),(35.0912,128.8571,'2025-02-18 15:30:00.000000','2025-02-04 11:30:00.000000',33,223,'2025-02-04 11:30:00.000000','녹산 버스킹 공연 2','퇴근길 버스킹','부산광역시 강서구 녹산동'),(35.0935,128.8518,'2025-02-18 17:00:00.000000','2025-02-04 12:45:00.000000',45,224,'2025-02-04 12:45:00.000000','녹산 버스킹 공연 3','해맞이공원 음악제','부산광역시 강서구 녹산해맞이공원'),(35.0988,128.8583,'2025-02-18 18:30:00.000000','2025-02-04 14:00:00.000000',56,225,'2025-02-04 14:00:00.000000','녹산 버스킹 공연 4','문화공원의 밤','부산광역시 강서구 녹산문화공원'),(35.0921,128.8552,'2025-02-18 20:00:00.000000','2025-02-04 15:15:00.000000',66,226,'2025-02-04 15:15:00.000000','녹산 버스킹 공연 5','공단로 야간 콘서트','부산광역시 강서구 녹산공단로'),(35.0957,128.9046,'2025-02-18 13:00:00.000000','2025-02-04 10:30:00.000000',23,227,'2025-02-04 10:30:00.000000','명지 버스킹 공연 1','신도시 음악 페스티벌','부산광역시 강서구 명지국제신도시'),(35.0912,128.9071,'2025-02-18 14:30:00.000000','2025-02-04 11:45:00.000000',35,228,'2025-02-04 11:45:00.000000','명지 버스킹 공연 2','명지동 버스킹 타임','부산광역시 강서구 명지동'),(35.0935,128.9018,'2025-02-18 16:00:00.000000','2025-02-04 13:00:00.000000',46,229,'2025-02-04 13:00:00.000000','명지 버스킹 공연 3','오션시티 사운드','부산광역시 강서구 명지오션시티'),(35.0988,128.9083,'2025-02-18 17:30:00.000000','2025-02-04 14:15:00.000000',57,230,'2025-02-04 14:15:00.000000','명지 버스킹 공연 4','근린공원 음악회','부산광역시 강서구 명지근린공원'),(35.0921,128.9052,'2025-02-18 19:00:00.000000','2025-02-04 15:30:00.000000',67,231,'2025-02-04 15:30:00.000000','명지 버스킹 공연 5','명지공원 나이트 라이브','부산광역시 강서구 명지공원'),(37.5695,126.9805,'2025-02-19 14:00:00.000000','2025-02-05 09:00:00.000000',14,232,'2025-02-05 09:00:00.000000','서울 버스킹 공연 1','광화문 어쿠스틱 나이트','서울특별시 종로구 광화문광장'),(37.5169,127.0625,'2025-02-19 15:30:00.000000','2025-02-05 10:15:00.000000',26,233,'2025-02-05 10:15:00.000000','서울 버스킹 공연 2','코엑스 재즈 타임','서울특별시 강남구 코엑스광장'),(37.5607,126.9256,'2025-02-19 17:00:00.000000','2025-02-05 11:30:00.000000',37,234,'2025-02-05 11:30:00.000000','서울 버스킹 공연 3','홍대 스트리트 사운드','서울특별시 마포구 홍대거리'),(37.5741,126.9953,'2025-02-19 18:30:00.000000','2025-02-05 12:45:00.000000',48,235,'2025-02-05 12:45:00.000000','서울 버스킹 공연 4','명동 뮤직 페스타','서울특별시 중구 명동거리'),(37.5156,127.1055,'2025-02-19 20:00:00.000000','2025-02-05 14:00:00.000000',59,236,'2025-02-05 14:00:00.000000','서울 버스킹 공연 5','잠실 나이트 라이브','서울특별시 송파구 잠실광장'),(35.1625,126.8556,'2025-02-19 13:00:00.000000','2025-02-05 09:30:00.000000',16,237,'2025-02-05 09:30:00.000000','광주 버스킹 공연 1','충장로의 달빛 선율','광주광역시 동구 충장로'),(35.149,126.9253,'2025-02-19 14:30:00.000000','2025-02-05 10:45:00.000000',28,238,'2025-02-05 10:45:00.000000','광주 버스킹 공연 2','상무지구 어반 사운드','광주광역시 서구 상무지구'),(35.1768,126.9145,'2025-02-19 16:00:00.000000','2025-02-05 12:00:00.000000',39,239,'2025-02-05 12:00:00.000000','광주 버스킹 공연 3','대학가의 청춘 음악','광주광역시 북구 전남대학교'),(35.1355,126.7967,'2025-02-19 17:30:00.000000','2025-02-05 13:15:00.000000',50,240,'2025-02-05 13:15:00.000000','광주 버스킹 공연 4','수완지구 문화 공연','광주광역시 광산구 수완지구'),(35.1498,126.9182,'2025-02-19 19:00:00.000000','2025-02-05 14:30:00.000000',62,241,'2025-02-05 14:30:00.000000','광주 버스킹 공연 5','유스퀘어 버스킹 파티','광주광역시 서구 유스퀘어'),(37.8843,127.733,'2025-02-19 12:00:00.000000','2025-02-05 09:45:00.000000',18,242,'2025-02-05 09:45:00.000000','강원도 버스킹 공연 1','남이섬 음악 여행','강원도 춘천시 남이섬'),(37.7586,128.8991,'2025-02-19 13:30:00.000000','2025-02-05 11:00:00.000000',30,243,'2025-02-05 11:00:00.000000','강원도 버스킹 공연 2','안목해변 음악회','강원도 강릉시 안목해변'),(37.3839,129.1737,'2025-02-19 15:00:00.000000','2025-02-05 12:15:00.000000',42,244,'2025-02-05 12:15:00.000000','강원도 버스킹 공연 3','죽서루의 멜로디','강원도 삼척시 죽서루'),(37.5586,128.3291,'2025-02-19 16:30:00.000000','2025-02-05 13:30:00.000000',53,245,'2025-02-05 13:30:00.000000','강원도 버스킹 공연 4','알펜시아 스노우 콘서트','강원도 평창군 알펜시아'),(38.111,128.601,'2025-02-19 18:00:00.000000','2025-02-05 14:45:00.000000',64,246,'2025-02-05 14:45:00.000000','강원도 버스킹 공연 5','속초 야간 버스킹','강원도 속초시 중앙시장'),(36.3247,127.4229,'2025-02-19 14:30:00.000000','2025-02-05 11:15:00.000000',32,247,'2025-02-05 11:15:00.000000','대전 버스킹 공연 2','은행동 버스킹 존','대전광역시 중구 은행동'),(36.3578,127.3808,'2025-02-19 16:00:00.000000','2025-02-05 12:30:00.000000',44,248,'2025-02-05 12:30:00.000000','대전 버스킹 공연 3','둔산동 음악 여행','대전광역시 서구 둔산동'),(36.3289,127.4353,'2025-02-19 17:30:00.000000','2025-02-05 13:45:00.000000',55,249,'2025-02-05 13:45:00.000000','대전 버스킹 공연 4','중앙로의 밤','대전광역시 동구 중앙로'),(36.3203,127.4071,'2025-02-19 19:00:00.000000','2025-02-05 15:00:00.000000',66,250,'2025-02-05 15:00:00.000000','대전 버스킹 공연 5','으능정이 문화 공연','대전광역시 중구 으능정이거리'),(35.0922,128.8581,'2025-02-19 15:30:00.000000','2025-02-05 11:30:00.000000',34,251,'2025-02-05 11:30:00.000000','녹산 버스킹 공연 2','퇴근길 음악 선물','부산광역시 강서구 녹산동'),(35.0945,128.8528,'2025-02-19 17:00:00.000000','2025-02-05 12:45:00.000000',46,252,'2025-02-05 12:45:00.000000','녹산 버스킹 공연 3','해맞이공원 버스킹','부산광역시 강서구 녹산해맞이공원'),(35.0998,128.8593,'2025-02-19 18:30:00.000000','2025-02-05 14:00:00.000000',57,253,'2025-02-05 14:00:00.000000','녹산 버스킹 공연 4','문화공원 음악회','부산광역시 강서구 녹산문화공원'),(35.0931,128.8562,'2025-02-19 20:00:00.000000','2025-02-05 15:15:00.000000',67,254,'2025-02-05 15:15:00.000000','녹산 버스킹 공연 5','공단로 버스킹','부산광역시 강서구 녹산공단로'),(35.0922,128.9081,'2025-02-19 14:30:00.000000','2025-02-05 11:45:00.000000',36,255,'2025-02-05 11:45:00.000000','명지 버스킹 공연 2','명지동 스트리트 공연','부산광역시 강서구 명지동'),(35.0945,128.9028,'2025-02-19 16:00:00.000000','2025-02-05 13:00:00.000000',47,256,'2025-02-05 13:00:00.000000','명지 버스킹 공연 3','오션시티 버스킹','부산광역시 강서구 명지오션시티'),(35.0998,128.9093,'2025-02-19 17:30:00.000000','2025-02-05 14:15:00.000000',58,257,'2025-02-05 14:15:00.000000','명지 버스킹 공연 4','공원 음악회','부산광역시 강서구 명지근린공원'),(35.0931,128.9062,'2025-02-19 19:00:00.000000','2025-02-05 15:30:00.000000',65,258,'2025-02-05 15:30:00.000000','명지 버스킹 공연 5','명지공원 이브닝 콘서트','부산광역시 강서구 명지공원'),(37.5665,126.978,'2025-02-20 18:00:00.000000','2025-02-10 12:00:00.000000',3,259,'2025-02-10 12:30:00.000000','홍대 거리공연','홍대 앞에서 진행하는 버스킹 공연입니다.','서울'),(37.5704,126.9923,'2025-02-20 19:30:00.000000','2025-02-10 13:00:00.000000',7,260,'2025-02-10 13:30:00.000000','인사동 전통공연','인사동 거리에서 전통 음악과 함께하는 공연.','서울'),(37.5348,126.9946,'2025-02-20 20:00:00.000000','2025-02-10 14:00:00.000000',2,261,'2025-02-10 14:30:00.000000','한강 야경 버스킹','한강 공원에서 낭만적인 버스킹 공연.','서울'),(37.561,127.0017,'2025-02-20 18:30:00.000000','2025-02-10 15:00:00.000000',9,262,'2025-02-10 15:30:00.000000','명동 스트릿 공연','명동 거리에서 다양한 장르의 음악을 감상하세요.','서울'),(37.5803,127.0024,'2025-02-20 19:00:00.000000','2025-02-10 16:00:00.000000',5,263,'2025-02-10 16:30:00.000000','대학로 버스킹','대학로에서 펼쳐지는 감성적인 라이브 공연.','서울'),(37.5103,127.06,'2025-02-20 21:00:00.000000','2025-02-10 17:00:00.000000',1,264,'2025-02-10 17:30:00.000000','강남역 거리공연','강남역 주변에서 흥겨운 거리 공연.','서울'),(37.5663,126.9779,'2025-02-20 20:30:00.000000','2025-02-10 18:00:00.000000',6,265,'2025-02-10 18:30:00.000000','광화문 버스킹','광화문 광장에서 펼쳐지는 감동적인 라이브.','서울'),(37.5074,126.9603,'2025-02-20 22:00:00.000000','2025-02-10 19:00:00.000000',10,266,'2025-02-10 19:30:00.000000','이태원 야간 버스킹','이태원 거리에서 신나는 밤 공연.','서울'),(37.5551,126.9368,'2025-02-21 18:00:00.000000','2025-02-11 12:00:00.000000',4,267,'2025-02-11 12:30:00.000000','신촌 버스킹','신촌에서 펼쳐지는 감성적인 라이브 공연.','서울'),(37.5273,126.9279,'2025-02-21 19:00:00.000000','2025-02-11 13:00:00.000000',8,268,'2025-02-11 13:30:00.000000','합정 거리공연','합정역 주변에서 열리는 자유로운 분위기의 공연.','서울'),(37.5035,127.0247,'2025-02-21 20:00:00.000000','2025-02-11 14:00:00.000000',2,269,'2025-02-11 14:30:00.000000','코엑스 야외 버스킹','코엑스 앞 광장에서 진행하는 음악 공연.','서울'),(37.5423,127.0571,'2025-02-21 18:30:00.000000','2025-02-11 15:00:00.000000',6,270,'2025-02-11 15:30:00.000000','잠실 석촌호수 버스킹','석촌호수 주변에서 감성적인 음악 공연.','서울'),(37.5796,126.977,'2025-02-21 19:30:00.000000','2025-02-11 16:00:00.000000',1,271,'2025-02-11 16:30:00.000000','경복궁 앞 전통공연','경복궁 앞에서 펼쳐지는 전통음악과 춤.','서울'),(37.5229,126.9245,'2025-02-21 21:00:00.000000','2025-02-11 17:00:00.000000',9,272,'2025-02-11 17:30:00.000000','당산역 거리공연','당산역 주변에서 펼쳐지는 신나는 거리 공연.','서울'),(37.5621,126.995,'2025-02-21 20:30:00.000000','2025-02-11 18:00:00.000000',3,273,'2025-02-11 18:30:00.000000','동대문 야시장 버스킹','동대문 야시장 앞에서 열리는 야간 공연.','서울'),(37.5086,127.0631,'2025-02-21 22:00:00.000000','2025-02-11 19:00:00.000000',10,274,'2025-02-11 19:30:00.000000','삼성역 거리공연','삼성역 주변에서 즐기는 버스킹 무대.','서울'),(37.8854,127.7298,'2025-02-20 18:00:00.000000','2025-02-10 12:00:00.000000',2,275,'2025-02-10 12:30:00.000000','춘천 호반 버스킹','춘천 호반 근처에서 펼쳐지는 감성적인 라이브 공연.','강원도'),(37.7556,128.8961,'2025-02-20 19:00:00.000000','2025-02-10 13:00:00.000000',5,276,'2025-02-10 13:30:00.000000','속초 해변 거리공연','속초 해변에서 바다를 배경으로 열리는 버스킹 공연.','강원도'),(37.3704,128.3909,'2025-02-20 20:00:00.000000','2025-02-10 14:00:00.000000',8,277,'2025-02-10 14:30:00.000000','원주 문화의 거리 버스킹','원주 문화의 거리에서 다양한 장르의 음악 공연.','강원도'),(38.1064,128.622,'2025-02-20 18:30:00.000000','2025-02-10 15:00:00.000000',1,278,'2025-02-10 15:30:00.000000','강릉 경포대 버스킹','경포대 해변에서 펼쳐지는 감미로운 라이브 무대.','강원도'),(38.38,128.467,'2025-02-20 19:30:00.000000','2025-02-10 16:00:00.000000',6,279,'2025-02-10 16:30:00.000000','양양 서핑 거리공연','양양 서핑 해변에서 자유로운 분위기의 공연.','강원도'),(37.6831,127.8853,'2025-02-20 21:00:00.000000','2025-02-10 17:00:00.000000',9,280,'2025-02-10 17:30:00.000000','홍천 강변 버스킹','홍천 강변에서 감성적인 음악과 함께하는 버스킹.','강원도'),(37.6899,128.7576,'2025-02-20 20:30:00.000000','2025-02-10 18:00:00.000000',3,281,'2025-02-10 18:30:00.000000','정선 아리랑 시장 공연','정선 아리랑 시장에서 전통과 현대가 어우러진 공연.','강원도'),(38.207,128.5919,'2025-02-20 22:00:00.000000','2025-02-10 19:00:00.000000',7,282,'2025-02-10 19:30:00.000000','동해 묵호항 버스킹','묵호항에서 펼쳐지는 감성적인 거리 공연.','강원도'),(37.8854,127.7298,'2025-02-21 18:00:00.000000','2025-02-11 12:00:00.000000',4,283,'2025-02-11 12:30:00.000000','춘천 남이섬 버스킹','남이섬에서 펼쳐지는 감성적인 라이브 공연.','강원도'),(37.7556,128.8961,'2025-02-21 19:00:00.000000','2025-02-11 13:00:00.000000',6,284,'2025-02-11 13:30:00.000000','속초 중앙시장 공연','속초 중앙시장에서 다양한 장르의 버스킹 공연.','강원도'),(37.3704,128.3909,'2025-02-21 20:00:00.000000','2025-02-11 14:00:00.000000',9,285,'2025-02-11 14:30:00.000000','원주 무실공원 공연','원주 무실공원에서 자유로운 분위기의 거리 공연.','강원도'),(38.1064,128.622,'2025-02-21 18:30:00.000000','2025-02-11 15:00:00.000000',1,286,'2025-02-11 15:30:00.000000','강릉 안목해변 버스킹','강릉 안목해변에서 펼쳐지는 감미로운 음악 무대.','강원도'),(38.38,128.467,'2025-02-21 19:30:00.000000','2025-02-11 16:00:00.000000',5,287,'2025-02-11 16:30:00.000000','양양 서핑 해변 공연','양양의 서핑 해변에서 펼쳐지는 버스킹 무대.','강원도'),(37.6831,127.8853,'2025-02-21 21:00:00.000000','2025-02-11 17:00:00.000000',8,288,'2025-02-11 17:30:00.000000','홍천 비발디파크 거리공연','홍천 비발디파크에서 신나는 음악 공연.','강원도'),(37.6899,128.7576,'2025-02-21 20:30:00.000000','2025-02-11 18:00:00.000000',2,289,'2025-02-11 18:30:00.000000','정선 레일바이크 공연','정선 레일바이크 종점에서 즐기는 감성적인 공연.','강원도'),(38.207,128.5919,'2025-02-21 22:00:00.000000','2025-02-11 19:00:00.000000',10,290,'2025-02-11 19:30:00.000000','동해 추암 촛대바위 버스킹','추암 촛대바위 해변에서 펼쳐지는 감성적인 거리 공연.','강원도'),(36.3504,127.3845,'2025-02-20 18:00:00.000000','2025-02-11 12:00:00.000000',2,291,'2025-02-11 12:30:00.000000','대전 으능정이 거리 버스킹','대전 으능정이 거리에서 펼쳐지는 감미로운 라이브 공연.','대전'),(36.3552,127.2985,'2025-02-20 19:00:00.000000','2025-02-11 13:00:00.000000',5,292,'2025-02-11 13:30:00.000000','유성 온천공원 거리공연','유성 온천공원에서 진행되는 감성적인 버스킹 공연.','대전'),(36.379,127.3292,'2025-02-20 20:00:00.000000','2025-02-11 14:00:00.000000',8,293,'2025-02-11 14:30:00.000000','엑스포 과학공원 공연','대전 엑스포 과학공원에서 펼쳐지는 신나는 거리 공연.','대전'),(36.3178,127.3845,'2025-02-20 18:30:00.000000','2025-02-11 15:00:00.000000',1,294,'2025-02-11 15:30:00.000000','대전 한밭수목원 버스킹','한밭수목원에서 자연과 함께하는 여유로운 라이브 공연.','대전'),(36.2974,127.2892,'2025-02-20 19:30:00.000000','2025-02-11 16:00:00.000000',3,295,'2025-02-11 16:30:00.000000','대청호 전망대 거리공연','대청호 전망대에서 펼쳐지는 감성적인 거리 공연.','대전'),(36.3457,127.4525,'2025-02-20 21:00:00.000000','2025-02-11 17:00:00.000000',7,296,'2025-02-11 17:30:00.000000','대전 보라매공원 버스킹','보라매공원에서 펼쳐지는 자유로운 음악 공연.','대전'),(36.3622,127.4175,'2025-02-20 20:30:00.000000','2025-02-11 18:00:00.000000',4,297,'2025-02-11 18:30:00.000000','대전 중앙시장 공연','대전 중앙시장에서 활기찬 분위기의 버스킹 공연.','대전'),(36.3335,127.3953,'2025-02-20 22:00:00.000000','2025-02-11 19:00:00.000000',9,298,'2025-02-11 19:30:00.000000','대전 카이스트 앞 버스킹','대전 카이스트 앞 거리에서 진행되는 감성적인 공연.','대전'),(36.3504,127.3845,'2025-02-21 18:00:00.000000','2025-02-11 12:00:00.000000',3,299,'2025-02-11 12:30:00.000000','대전 으능정이 거리 버스킹','대전 으능정이 거리에서 펼쳐지는 감미로운 라이브 공연.','대전'),(36.3552,127.2985,'2025-02-21 19:00:00.000000','2025-02-11 13:00:00.000000',7,300,'2025-02-11 13:30:00.000000','유성 온천공원 거리공연','유성 온천공원에서 진행되는 감성적인 버스킹 공연.','대전'),(36.379,127.3292,'2025-02-21 20:00:00.000000','2025-02-11 14:00:00.000000',5,301,'2025-02-11 14:30:00.000000','엑스포 과학공원 공연','대전 엑스포 과학공원에서 펼쳐지는 신나는 거리 공연.','대전'),(36.3178,127.3845,'2025-02-21 18:30:00.000000','2025-02-11 15:00:00.000000',9,302,'2025-02-11 15:30:00.000000','대전 한밭수목원 버스킹','한밭수목원에서 자연과 함께하는 여유로운 라이브 공연.','대전'),(36.2974,127.2892,'2025-02-21 19:30:00.000000','2025-02-11 16:00:00.000000',1,303,'2025-02-11 16:30:00.000000','대청호 전망대 거리공연','대청호 전망대에서 펼쳐지는 감성적인 거리 공연.','대전'),(36.3457,127.4525,'2025-02-21 21:00:00.000000','2025-02-11 17:00:00.000000',6,304,'2025-02-11 17:30:00.000000','대전 보라매공원 버스킹','보라매공원에서 펼쳐지는 자유로운 음악 공연.','대전'),(36.3622,127.4175,'2025-02-21 20:30:00.000000','2025-02-11 18:00:00.000000',2,305,'2025-02-11 18:30:00.000000','대전 중앙시장 공연','대전 중앙시장에서 활기찬 분위기의 버스킹 공연.','대전'),(36.3335,127.3953,'2025-02-21 22:00:00.000000','2025-02-11 19:00:00.000000',4,306,'2025-02-11 19:30:00.000000','대전 카이스트 앞 버스킹','대전 카이스트 앞 거리에서 진행되는 감성적인 공연.','대전'),(35.1595,126.8526,'2025-02-20 18:00:00.000000','2025-02-11 12:00:00.000000',3,307,'2025-02-11 12:30:00.000000','광주 충장로 버스킹','광주 충장로에서 펼쳐지는 감미로운 라이브 공연.','광주'),(35.1528,126.8918,'2025-02-20 19:00:00.000000','2025-02-11 13:00:00.000000',7,308,'2025-02-11 13:30:00.000000','광주 국립아시아문화전당 공연','국립아시아문화전당 앞에서 열리는 특별한 거리 공연.','광주'),(35.1767,126.9083,'2025-02-20 20:00:00.000000','2025-02-11 14:00:00.000000',5,309,'2025-02-11 14:30:00.000000','광주 송정역 시장 거리공연','송정역 시장 앞에서 펼쳐지는 신나는 공연.','광주'),(35.1365,126.9021,'2025-02-20 18:30:00.000000','2025-02-11 15:00:00.000000',9,310,'2025-02-11 15:30:00.000000','광주 양림동 역사문화마을 버스킹','광주의 역사가 깃든 양림동에서 감성적인 공연.','광주'),(35.1873,126.8531,'2025-02-20 19:30:00.000000','2025-02-11 16:00:00.000000',1,311,'2025-02-11 16:30:00.000000','광주 풍암호수공원 거리공연','자연과 함께하는 힐링 라이브 공연.','광주'),(35.1401,126.8787,'2025-02-20 21:00:00.000000','2025-02-11 17:00:00.000000',6,312,'2025-02-11 17:30:00.000000','광주 기아 챔피언스 필드 공연','경기장 앞에서 펼쳐지는 열정 넘치는 버스킹.','광주'),(35.1298,126.9065,'2025-02-20 20:30:00.000000','2025-02-11 18:00:00.000000',2,313,'2025-02-11 18:30:00.000000','광주 전남대 후문 거리공연','대학생들과 함께하는 자유로운 분위기의 공연.','광주'),(35.174,126.9153,'2025-02-20 22:00:00.000000','2025-02-11 19:00:00.000000',4,314,'2025-02-11 19:30:00.000000','광주 첨단지구 버스킹','광주 첨단지구에서 펼쳐지는 트렌디한 라이브 공연.','광주'),(35.1595,126.8526,'2025-02-21 18:00:00.000000','2025-02-11 12:00:00.000000',8,315,'2025-02-11 12:30:00.000000','광주 충장로 야간 버스킹','광주 충장로에서 펼쳐지는 감미로운 밤 거리 공연.','광주'),(35.1528,126.8918,'2025-02-21 19:00:00.000000','2025-02-11 13:00:00.000000',2,316,'2025-02-11 13:30:00.000000','광주 국립아시아문화전당 공연','국립아시아문화전당 앞에서 열리는 특별한 거리 공연.','광주'),(35.1767,126.9083,'2025-02-21 20:00:00.000000','2025-02-11 14:00:00.000000',5,317,'2025-02-11 14:30:00.000000','광주 송정역 시장 거리공연','송정역 시장 앞에서 펼쳐지는 신나는 공연.','광주'),(35.1365,126.9021,'2025-02-21 18:30:00.000000','2025-02-11 15:00:00.000000',9,318,'2025-02-11 15:30:00.000000','광주 양림동 문화마을 버스킹','광주의 역사가 깃든 양림동에서 감성적인 공연.','광주'),(35.1873,126.8531,'2025-02-21 19:30:00.000000','2025-02-11 16:00:00.000000',1,319,'2025-02-11 16:30:00.000000','광주 풍암호수공원 거리공연','자연과 함께하는 힐링 라이브 공연.','광주'),(35.1401,126.8787,'2025-02-21 21:00:00.000000','2025-02-11 17:00:00.000000',6,320,'2025-02-11 17:30:00.000000','광주 기아 챔피언스 필드 공연','경기장 앞에서 펼쳐지는 열정 넘치는 버스킹.','광주'),(35.1298,126.9065,'2025-02-21 20:30:00.000000','2025-02-11 18:00:00.000000',3,321,'2025-02-11 18:30:00.000000','광주 전남대 후문 거리공연','대학생들과 함께하는 자유로운 분위기의 공연.','광주'),(35.174,126.9153,'2025-02-21 22:00:00.000000','2025-02-11 19:00:00.000000',4,322,'2025-02-11 19:30:00.000000','광주 첨단지구 버스킹','광주 첨단지구에서 펼쳐지는 트렌디한 라이브 공연.','광주'),(35.0923,128.8557,'2025-02-20 18:00:00.000000','2025-02-11 12:00:00.000000',1,323,'2025-02-11 12:30:00.000000','녹산 공원 버스킹','녹산 공원에서 펼쳐지는 감미로운 버스킹 공연.','녹산'),(35.0954,128.8621,'2025-02-20 19:00:00.000000','2025-02-11 13:00:00.000000',3,324,'2025-02-11 13:30:00.000000','녹산 해변가 거리공연','녹산 해변에서 낭만적인 라이브 음악.','녹산'),(35.0876,128.8493,'2025-02-20 20:00:00.000000','2025-02-11 14:00:00.000000',7,325,'2025-02-11 14:30:00.000000','녹산 야외무대 버스킹','녹산 야외무대에서 펼쳐지는 신나는 공연.','녹산'),(35.1011,128.8587,'2025-02-20 18:30:00.000000','2025-02-11 15:00:00.000000',5,326,'2025-02-11 15:30:00.000000','녹산 광장 음악회','녹산 광장에서 열리는 특별한 거리 공연.','녹산'),(35.0978,128.8655,'2025-02-20 19:30:00.000000','2025-02-11 16:00:00.000000',9,327,'2025-02-11 16:30:00.000000','녹산 문화거리 버스킹','녹산 문화거리에서 감성적인 공연.','녹산'),(35.0853,128.8412,'2025-02-20 21:00:00.000000','2025-02-11 17:00:00.000000',6,328,'2025-02-11 17:30:00.000000','녹산 호수공원 공연','자연과 함께하는 힐링 라이브 공연.','녹산'),(35.0905,128.8518,'2025-02-20 20:30:00.000000','2025-02-11 18:00:00.000000',2,329,'2025-02-11 18:30:00.000000','녹산 도서관 앞 버스킹','녹산 도서관 앞에서 펼쳐지는 조용한 감성 무대.','녹산'),(35.0999,128.8599,'2025-02-20 22:00:00.000000','2025-02-11 19:00:00.000000',4,330,'2025-02-11 19:30:00.000000','녹산 야경 속 거리공연','야경을 배경으로 펼쳐지는 낭만적인 버스킹.','녹산'),(35.0923,128.8557,'2025-02-21 18:00:00.000000','2025-02-11 12:00:00.000000',8,331,'2025-02-11 12:30:00.000000','녹산 공원 야간 버스킹','녹산 공원에서 펼쳐지는 감미로운 밤 거리 공연.','녹산'),(35.0954,128.8621,'2025-02-21 19:00:00.000000','2025-02-11 13:00:00.000000',3,332,'2025-02-11 13:30:00.000000','녹산 해변가 버스킹','녹산 해변에서 펼쳐지는 낭만적인 라이브 음악.','녹산'),(35.0876,128.8493,'2025-02-21 20:00:00.000000','2025-02-11 14:00:00.000000',5,333,'2025-02-11 14:30:00.000000','녹산 야외무대 버스킹','녹산 야외무대에서 펼쳐지는 신나는 공연.','녹산'),(35.1011,128.8587,'2025-02-21 18:30:00.000000','2025-02-11 15:00:00.000000',9,334,'2025-02-11 15:30:00.000000','녹산 광장 음악회','녹산 광장에서 열리는 특별한 거리 공연.','녹산'),(35.0978,128.8655,'2025-02-21 19:30:00.000000','2025-02-11 16:00:00.000000',1,335,'2025-02-11 16:30:00.000000','녹산 문화거리 버스킹','녹산 문화거리에서 감성적인 공연.','녹산'),(35.0853,128.8412,'2025-02-21 21:00:00.000000','2025-02-11 17:00:00.000000',7,336,'2025-02-11 17:30:00.000000','녹산 호수공원 공연','자연과 함께하는 힐링 라이브 공연.','녹산'),(35.0905,128.8518,'2025-02-21 20:30:00.000000','2025-02-11 18:00:00.000000',6,337,'2025-02-11 18:30:00.000000','녹산 도서관 앞 버스킹','녹산 도서관 앞에서 펼쳐지는 조용한 감성 무대.','녹산'),(35.0999,128.8599,'2025-02-21 22:00:00.000000','2025-02-11 19:00:00.000000',4,338,'2025-02-11 19:30:00.000000','녹산 야경 속 거리공연','야경을 배경으로 펼쳐지는 낭만적인 버스킹.','녹산');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-21  0:03:59

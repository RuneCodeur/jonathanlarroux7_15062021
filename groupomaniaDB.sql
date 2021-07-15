-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `list_forum`
--

DROP TABLE IF EXISTS `list_forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_forum` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `nom_forum` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_forum`
--

LOCK TABLES `list_forum` WRITE;
/*!40000 ALTER TABLE `list_forum` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_msg`
--

DROP TABLE IF EXISTS `list_msg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_msg` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `id_user` smallint DEFAULT NULL,
  `message` text,
  `media` text,
  `date` datetime NOT NULL,
  `id_forum` smallint NOT NULL,
  `id_sujet` smallint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `newest_index` (`date`),
  KEY `fk_sujet` (`id_sujet`),
  KEY `fk_forum` (`id_forum`),
  KEY `fk_creator` (`id_user`),
  CONSTRAINT `fk_forum` FOREIGN KEY (`id_forum`) REFERENCES `list_forum` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_creator` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_sujet` FOREIGN KEY (`id_sujet`) REFERENCES `list_sujet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_msg`
--

LOCK TABLES `list_msg` WRITE;
/*!40000 ALTER TABLE `list_msg` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_msg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list_sujet`
--

DROP TABLE IF EXISTS `list_sujet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list_sujet` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `nom_sujet` tinytext NOT NULL,
  `id_forum` smallint DEFAULT NULL,
  `id_user` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_creator_sujet` (`id_user`),
  KEY `fk_forum_sujet` (`id_forum`),
  CONSTRAINT `fk_forum_sujet` FOREIGN KEY (`id_forum`) REFERENCES `list_forum` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_creator_sujet` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list_sujet`
--

LOCK TABLES `list_sujet` WRITE;
/*!40000 ALTER TABLE `list_sujet` DISABLE KEYS */;
/*!40000 ALTER TABLE `list_sujet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) DEFAULT '0',
  `pseudo` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `mdp` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pseudo` (`pseudo`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-16 16:18:44

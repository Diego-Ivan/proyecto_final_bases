-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: proyecto_final
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
-- Table structure for table `conexiones`
--

DROP TABLE IF EXISTS `conexiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conexiones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `edificio_origen` int NOT NULL,
  `edificio_destino` int NOT NULL,
  `distancia` float NOT NULL,
  PRIMARY KEY (`edificio_origen`,`edificio_destino`),
  UNIQUE KEY `id` (`id`),
  KEY `edificio_destino` (`edificio_destino`),
  CONSTRAINT `conexiones_ibfk_1` FOREIGN KEY (`edificio_origen`) REFERENCES `edificios` (`id`),
  CONSTRAINT `conexiones_ibfk_2` FOREIGN KEY (`edificio_destino`) REFERENCES `edificios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conexiones`
--

LOCK TABLES `conexiones` WRITE;
/*!40000 ALTER TABLE `conexiones` DISABLE KEYS */;
INSERT INTO `conexiones` VALUES (1,1,3,152.51),(2,1,5,169.1),(3,1,7,95),(4,1,14,120.51),(5,3,2,55.95),(6,4,1,50.63),(7,4,3,160.65),(8,4,7,65.55),(9,5,3,146.36),(10,7,3,108.44),(11,8,4,94.81),(12,8,7,125.32),(13,8,9,122.33),(14,8,21,237.41),(15,9,1,104.38),(16,9,4,97.26),(17,9,14,134.38),(18,10,4,94.81),(19,10,8,87.82),(20,10,9,57.21),(21,10,21,267.86),(22,11,2,140.93),(23,11,24,113.66),(24,12,9,70.23),(25,12,10,81.23),(26,12,13,130.91),(27,13,16,96.6),(28,13,21,218.52),(29,14,5,161.5),(30,14,20,263.56),(31,16,17,138.52),(32,17,18,115.95),(33,17,19,109.55),(34,17,23,95.93),(35,19,18,55.5),(36,20,12,233.61),(37,23,18,41.5),(38,23,22,134.77);
/*!40000 ALTER TABLE `conexiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edificios`
--

DROP TABLE IF EXISTS `edificios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edificios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `abreviacion` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edificios`
--

LOCK TABLES `edificios` WRITE;
/*!40000 ALTER TABLE `edificios` DISABLE KEYS */;
INSERT INTO `edificios` VALUES (1,'Ciencias e Ingenierías','CN'),(2,'Humanidades','HU'),(3,'Ágora','AG'),(4,'Auditorio Guillermo y Sofía Jenkins','AU'),(5,'Laboratorios A','LA'),(7,'Hacienda','HA'),(8,'Ciencias Sociales y Negocios','CS'),(9,'Biblioteca','BI'),(10,'Centro Estudiantil','CE'),(11,'Colegio Ignacio Bernal','Bernal'),(12,'Colegio Cain Murray','Cain'),(13,'Colegio Ray Lindley','Ray'),(14,'Servicios Escolares','SE'),(16,'Ciencias de la Salud','SL'),(17,'Gimnasio Morris \"Moe\" Williams','MOE'),(18,'Gimnasio Aztecas','GA'),(19,'Gimnasio Luis \"Luisón\" Gómez','GL'),(20,'Entrada Recta a Cholula','Recta'),(21,'Entrada Colegio José Gaos','Gaos'),(22,'Entrada Gimnasio','EG'),(23,'Dominica 19','DOM'),(24,'Entrada del Periférico','PE');
/*!40000 ALTER TABLE `edificios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_conexiones`
--

DROP TABLE IF EXISTS `vista_conexiones`;
/*!50001 DROP VIEW IF EXISTS `vista_conexiones`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_conexiones` AS SELECT 
 1 AS `id_conexion`,
 1 AS `edificio_origen`,
 1 AS `edificio_destino`,
 1 AS `distancia`,
 1 AS `nombre_origen`,
 1 AS `nombre_destino`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vista_conexiones`
--

/*!50001 DROP VIEW IF EXISTS `vista_conexiones`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_conexiones` AS select `c`.`id` AS `id_conexion`,`c`.`edificio_origen` AS `edificio_origen`,`c`.`edificio_destino` AS `edificio_destino`,`c`.`distancia` AS `distancia`,`e_origen`.`nombre` AS `nombre_origen`,`e_destino`.`nombre` AS `nombre_destino` from ((`conexiones` `c` join `edificios` `e_origen` on((`c`.`edificio_origen` = `e_origen`.`id`))) join `edificios` `e_destino` on((`c`.`edificio_destino` = `e_destino`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-04 21:37:04

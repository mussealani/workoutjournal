-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 02, 2025 at 08:25 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workoutdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

DROP TABLE IF EXISTS `workouts`;
CREATE TABLE IF NOT EXISTS `workouts` (
  `workout_id` bigint NOT NULL AUTO_INCREMENT,
  `workout_date` date NOT NULL,
  `workout_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `workout_length_total` int NOT NULL DEFAULT '0',
  `workout_comment` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`workout_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`workout_id`, `workout_date`, `workout_name`, `workout_length_total`, `workout_comment`) VALUES
(1, '2025-04-16', 'Onsdagspasset', 0, 'Min första registrering av fotbollträning'),
(2, '2025-04-17', 'Torsdagspasset', 0, 'Min första registrering av ishockeyträning'),
(3, '2025-04-18', 'Fredagspasset', 0, 'Min första registrering av löpträning'),
(4, '2025-04-20', 'Lördagspasset', 0, 'Min första registrering av friidrott'),
(5, '2025-04-21', 'Söndagspasset', 0, 'Min första registrering av handbollträning');

-- --------------------------------------------------------

--
-- Table structure for table `workoutsessions`
--

DROP TABLE IF EXISTS `workoutsessions`;
CREATE TABLE IF NOT EXISTS `workoutsessions` (
  `workoutsession_id` bigint NOT NULL AUTO_INCREMENT,
  `workoutsession_time` int NOT NULL,
  `workouttype_id` bigint DEFAULT NULL,
  `workout_id` bigint DEFAULT NULL,
  PRIMARY KEY (`workoutsession_id`),
  KEY `workouttype_id` (`workouttype_id`),
  KEY `workout_id` (`workout_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workouttypes`
--

DROP TABLE IF EXISTS `workouttypes`;
CREATE TABLE IF NOT EXISTS `workouttypes` (
  `workouttype_id` bigint NOT NULL AUTO_INCREMENT,
  `workouttype_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`workouttype_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workouttypes`
--

INSERT INTO `workouttypes` (`workouttype_id`, `workouttype_name`) VALUES
(1, 'Fotboll'),
(2, 'Handboll'),
(3, 'Ishockey'),
(4, 'Löpträning'),
(5, 'Friidrott');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

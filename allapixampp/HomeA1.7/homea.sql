-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 04:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homea`
--

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

CREATE TABLE `bids` (
  `BidID` int(11) NOT NULL,
  `PropertyID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `BidAmount` int(10) NOT NULL,
  `BidTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `bids`
--

INSERT INTO `bids` (`BidID`, `PropertyID`, `UserID`, `BidAmount`, `BidTime`) VALUES
(1, 1, 1, 1100, '2024-01-25 12:30:00'),
(2, 2, 2, 1600, '2024-01-25 15:30:00'),
(3, 3, 3, 1300, '2024-01-26 11:45:00'),
(4, 4, 4, 1900, '2024-01-27 10:15:00'),
(5, 5, 5, 2200, '2024-01-28 16:45:00'),
(6, 6, 6, 1800, '2024-01-29 12:20:00'),
(7, 7, 7, 1500, '2024-01-30 14:30:00'),
(8, 8, 8, 1800, '2024-01-31 17:20:00'),
(9, 9, 9, 1400, '2024-02-01 09:30:00'),
(10, 10, 10, 2000, '2024-02-02 13:45:00');

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `PropertyID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `PropertyName` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Province` varchar(50) NOT NULL,
  `District` varchar(50) NOT NULL,
  `CurrentBid` int(10) DEFAULT NULL,
  `StartTime` datetime NOT NULL,
  `EndTime` datetime NOT NULL,
  `ImageLink` varchar(255) DEFAULT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`PropertyID`, `UserID`, `PropertyName`, `Description`, `Province`, `District`, `CurrentBid`, `StartTime`, `EndTime`, `ImageLink`, `status`) VALUES
(1, 1, 'Property 1', 'Description 1', 'Province 1', 'District 1', 1000, '2024-01-25 12:00:00', '2024-01-30 18:00:00', 'image1.jpg', 0),
(2, 2, 'Property 2', 'Description 2', 'Province 2', 'District 2', 1500, '2024-01-25 14:00:00', '2024-01-31 18:00:00', 'image2.jpg', 0),
(3, 3, 'Property 3', 'Description 3', 'Province 3', 'District 3', 1200, '2024-01-26 10:00:00', '2024-02-01 18:00:00', 'image3.jpg', 0),
(4, 4, 'Property 4', 'Description 4', 'Province 4', 'District 4', 1800, '2024-01-27 09:00:00', '2024-02-02 18:00:00', 'image4.jpg', 0),
(5, 5, 'Property 5', 'Description 5', 'Province 5', 'District 5', 2000, '2024-01-28 15:00:00', '2024-02-03 18:00:00', 'image5.jpg', 0),
(6, 6, 'Property 6', 'Description 6', 'Province 6', 'District 6', 1600, '2024-01-29 11:00:00', '2024-02-04 18:00:00', 'image6.jpg', 0),
(7, 7, 'Property 7', 'Description 7', 'Province 7', 'District 7', 1400, '2024-01-30 13:00:00', '2024-02-05 18:00:00', 'image7.jpg', 0),
(8, 8, 'Property 8', 'Description 8', 'Province 8', 'District 8', 1700, '2024-01-31 16:00:00', '2024-02-06 18:00:00', 'image8.jpg', 0),
(9, 9, 'Property 9', 'Description 9', 'Province 9', 'District 9', 1300, '2024-02-01 08:00:00', '2024-02-07 18:00:00', 'image9.jpg', 0),
(10, 10, 'Property 10', 'Description 10', 'Province 10', 'District 10', 1900, '2024-02-02 12:00:00', '2024-02-08 18:00:00', 'image10.jpg', 0),
(11, 9, '99', '', '99', '99', 99, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'https://th.bing.com/th/id/OIP.PEXE9_avnOctMwrzN-phXwHaE9?rs=1&pid=ImgDetMain', 0),
(12, 9, '99', 'dd', '99', '99', 99, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'https://th.bing.com/th/id/OIP.PEXE9_avnOctMwrzN-phXwHaE9?rs=1&pid=ImgDetMain', 0),
(13, 1, '11', '', '11', '11', 111, '2024-01-25 11:05:00', '2024-01-25 12:05:00', '<div className=\"fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 flex items-center justify-center\">     <div className=\"bg-white p-8 rounded-lg max-w-md w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl flex flex-col\">', 0),
(14, 1, '11', '', '11', '11', 111, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'https://th.bing.com/th/id/OIP.wmyY-bfakO7dLxsF8zCOHwHaDt?rs=1&pid=ImgDetMain', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `status` int(2) NOT NULL,
  `permission` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Email`, `status`, `permission`) VALUES
(1, 'user1', 'passwordAA', 'aaa1@gmail.com', 0, 1),
(2, 'user2', 'password2', 'user2@example.com', 0, 0),
(3, 'user3', 'password3', 'user3@example.com', 0, 0),
(4, 'user4', 'password4', 'user4@example.com', 0, 0),
(5, 'user5', 'password5', 'user5@example.com', 0, 0),
(6, 'user6', 'password6', 'user6@example.com', 0, 0),
(7, 'user7', 'password7', 'user7@example.com', 0, 0),
(8, 'user8', 'password8', 'user8@example.com', 0, 0),
(9, 'user9', 'password9', 'user9@example.com', 0, 0),
(10, 'user10', 'password10', 'user10@example.com', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`BidID`),
  ADD KEY `PropertyID` (`PropertyID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`PropertyID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bids`
--
ALTER TABLE `bids`
  ADD CONSTRAINT `bids_ibfk_1` FOREIGN KEY (`PropertyID`) REFERENCES `properties` (`PropertyID`),
  ADD CONSTRAINT `bids_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-01-13 12:15:35
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `homea`
--

-- --------------------------------------------------------

--
-- 表的结构 `bids`
--

CREATE TABLE `bids` (
  `BidID` int(11) NOT NULL,
  `PropertyID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `BidAmount` decimal(18,2) NOT NULL,
  `BidTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 转存表中的数据 `bids`
--

INSERT INTO `bids` (`BidID`, `PropertyID`, `UserID`, `BidAmount`, `BidTime`) VALUES
(1, 1001, 101, 1500.00, '2024-01-07 12:00:00'),
(2, 1002, 102, 1800.50, '2024-01-07 12:15:00'),
(3, 1003, 103, 1200.75, '2024-01-07 12:30:00'),
(4, 1004, 104, 2100.25, '2024-01-07 12:45:00'),
(5, 1005, 105, 1600.50, '2024-01-07 13:00:00'),
(6, 1006, 106, 1900.75, '2024-01-07 13:15:00'),
(7, 1007, 107, 1750.25, '2024-01-07 13:30:00'),
(8, 1008, 108, 2000.00, '2024-01-07 13:45:00'),
(9, 1009, 109, 2200.50, '2024-01-07 14:00:00'),
(10, 1010, 110, 2000.75, '2024-01-07 14:30:00');

-- --------------------------------------------------------

--
-- 表的结构 `properties`
--

CREATE TABLE `properties` (
  `PropertyID` int(11) NOT NULL,
  `PropertyName` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Province` varchar(50) NOT NULL,
  `District` varchar(50) NOT NULL,
  `CurrentBid` decimal(18,2) DEFAULT NULL,
  `StartTime` datetime NOT NULL,
  `EndTime` datetime NOT NULL,
  `ImageLink` varchar(255) DEFAULT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 转存表中的数据 `properties`
--

INSERT INTO `properties` (`PropertyID`, `PropertyName`, `Description`, `Province`, `District`, `CurrentBid`, `StartTime`, `EndTime`, `ImageLink`, `status`) VALUES
(1001, 'Property A', 'Description A', 'เชียงราย', 'District A', 1500.00, '2024-01-07 12:00:00', '2024-01-07 14:00:00', 'https://www.lalinproperty.com/wp-content/uploads/2023/08/Lalin-Town-Lanceo-Crib-%E0%B8%A7%E0%B8%87%E0%B9%81%E0%B8%AB%E0%B8%A7%E0%B8%99%E0%B8%AF-%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%A1-2-cannes-1024x645.jpg', 0),
(1002, 'Property B', 'Description B', 'Province B', 'District B', 1800.50, '2024-01-07 12:15:00', '2024-01-07 14:15:00', 'https://www.black-beam.com/plans/BB-H2-60002.15_3d1.jpg', 0),
(1003, 'Property C', 'Description C', 'Province C', 'District C', 1200.75, '2024-01-07 12:30:00', '2024-01-07 14:30:00', '', 0),
(1004, 'Property D', 'Description D', 'Province D', 'District D', 2100.25, '2024-01-07 12:45:00', '2024-01-07 14:45:00', '', 0),
(1005, 'Property E', 'Description E', 'เชียงราย', 'District E', 1600.50, '2024-01-07 13:00:00', '2024-01-07 15:00:00', '', 0),
(1006, 'Property F', 'Description F', 'Province F', 'District F', 1900.75, '2024-01-07 13:15:00', '2024-01-07 15:15:00', '', 0),
(1007, 'Property G', 'Description G', 'Province G', 'District G', 1750.25, '2024-01-07 13:30:00', '2024-01-07 15:30:00', '', 0),
(1008, 'Property H', 'Description H', 'Province H', 'District H', 2000.00, '2024-01-07 13:45:00', '2024-01-07 15:45:00', 'https://www.black-beam.com/plans/BB-H2-60002.15_3d1.jpg', 0),
(1009, 'Property I', 'Description I', 'Province I', 'District I', 2200.50, '2024-01-07 14:00:00', '2024-01-07 16:00:00', '', 0),
(1010, 'Property J', 'Description J', 'Province J', 'District J', 2000.75, '2024-01-07 14:30:00', '2024-01-07 16:30:00', '', 0),
(1011, '', NULL, '', '', NULL, '2024-01-13 08:12:56', '2024-01-13 08:12:56', NULL, 0);

-- --------------------------------------------------------

--
-- 表的结构 `users`
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
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Email`, `status`, `permission`) VALUES
(101, 'A', 'passwordA', 'userA@email.com', 1, 0),
(102, 'UserB', 'passwordB', 'userB@email.com', 1, 0),
(103, 'UserC', 'passwordC', 'userC@email.com', 0, 0),
(104, 'UserD', 'passwordD', 'userD@email.com', 0, 0),
(105, 'UserE', 'passwordE', 'userE@email.com', 0, 0),
(106, 'UserF', 'passwordF', 'userF@email.com', 0, 0),
(107, 'UserG', 'passwordG', 'userG@email.com', 0, 0),
(108, 'UserH', 'passwordH', 'userH@email.com', 0, 0),
(109, 'UserI', 'passwordI', 'userI@email.com', 0, 0),
(110, 'UserJ', 'passwordJ', 'userJ@email.com', 0, 0),
(111, '111 ', '111', '111@gmail.com', 1, 0);

--
-- 转储表的索引
--

--
-- 表的索引 `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`BidID`),
  ADD KEY `PropertyID` (`PropertyID`),
  ADD KEY `UserID` (`UserID`);

--
-- 表的索引 `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`PropertyID`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- 限制导出的表
--

--
-- 限制表 `bids`
--
ALTER TABLE `bids`
  ADD CONSTRAINT `bids_ibfk_1` FOREIGN KEY (`PropertyID`) REFERENCES `properties` (`PropertyID`),
  ADD CONSTRAINT `bids_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- TrueSelf Competition Database Schema for MySQL
-- Run this in your DirectAdmin MySQL database

-- Create entries table
CREATE TABLE IF NOT EXISTS `entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `social_media` varchar(255) DEFAULT NULL,
  `selfie_url` text NOT NULL,
  `caption` text DEFAULT NULL,
  `payment_id` varchar(255) NOT NULL UNIQUE,
  `payment_status` enum('pending','completed','failed') DEFAULT 'pending',
  `is_winner` tinyint(1) DEFAULT 0,
  `is_finalist` tinyint(1) DEFAULT 0,
  `admin_notes` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_payment_id` (`payment_id`),
  KEY `idx_email` (`email`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_payment_status` (`payment_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create admin_users table for admin authentication
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (replace with your actual credentials)
-- Password will be: your_admin_password (you should change this)
INSERT INTO `admin_users` (`email`, `password_hash`, `name`) VALUES 
('admin@trueselfgiveback.com', 'Admin@trueself01', 'Admin User')
ON DUPLICATE KEY UPDATE `email` = `email`;

-- Create indexes for better performance
CREATE INDEX `idx_entries_payment_status` ON `entries` (`payment_status`);
CREATE INDEX `idx_entries_created_at` ON `entries` (`created_at`);
CREATE INDEX `idx_entries_is_winner` ON `entries` (`is_winner`);
CREATE INDEX `idx_entries_is_finalist` ON `entries` (`is_finalist`);

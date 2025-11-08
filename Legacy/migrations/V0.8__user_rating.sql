CREATE TABLE IF NOT EXISTS `user_ratings` (
  `id` VARCHAR(26) NOT NULL,
  `submitter_id` VARCHAR(26) NOT NULL,
  `reciever_id` VARCHAR(26) NOT NULL,
  `contract_id` VARCHAR(26) NOT NULL,
  `rating_type` VARCHAR(32),
  `rating_value` DOUBLE NOT NULL,
  `comment` TEXT,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_ratings_ibfk_1` FOREIGN KEY (`submitter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_ratings_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_ratings_ibfk_3` FOREIGN KEY (`contract_id`) REFERENCES `contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
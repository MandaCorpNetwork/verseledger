CREATE TABLE IF NOT EXISTS `chat` (
  `id` VARCHAR(26) NOT NULL,
  `sender_id` VARCHAR(26) NOT NULL,
  `reciever_id` VARCHAR(26) NULL,
  `channel_id` VARCHAR(26) NULL,
  `message` TEXT,
  `read` BOOLEAN NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO `users` (
    `id`,
    `handle`,
    `displayName`,
    `discord_id`,
    `pfp`,
    `verified`
  )
VALUES (
    'U-000000000000000000000000',
    'VerseLedger',
    'SYSTEM',
    NULL,
    '/Assets/media/VLLogo_LargeSquare.png',
    '1'
  );

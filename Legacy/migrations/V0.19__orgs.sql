CREATE TABLE IF NOT EXISTS `organization_invite` (
  `id` VARCHAR(26) NOT NULL,
  `organization_id` VARCHAR(26) NOT NULL,
  `user_id` VARCHAR(26) NOT NULL,
  `application_handler` VARCHAR(26) NOT NULL,
  `status` ENUM(
    'PENDING',
    'ACCEPTED',
    'REJECTED',
    'INVITED',
    'DECLINED',
    'EXPIRED',
    'DISMISSED',
    'WITHDRAWN'
  ) NOT NULL DEFAULT 'PENDING',
  `application_message` TEXT NULL,
  `application_response` TEXT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`application_handler`) REFERENCES `users` (`id`) ON DELETE CASCADE
);
RENAME TABLE `organization_members` TO `organization_member`;
ALTER TABLE `organization_member`
ADD COLUMN `joined` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `organizations` CHANGE `title` `title` varchar(50);

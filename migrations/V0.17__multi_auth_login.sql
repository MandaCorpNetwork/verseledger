CREATE TABLE `user_auth` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(32) NOT NULL,
  `type` ENUM('DISCORD', 'GOOGLE') NOT NULL,
  `identifier` VARCHAR(32) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_auth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO `user_auth` (user_id, type, identifier)
SELECT user.id,
  'DISCORD',
  user.discord_id
FROM `users` user
WHERE user.discord_id IS NOT NULL;
ALTER TABLE `users` DROP COLUMN `discord_id`;

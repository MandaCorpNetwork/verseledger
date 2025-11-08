CREATE TABLE IF NOT EXISTS `organization_role` (
  `id` VARCHAR(26) NOT NULL,
  `org_id` VARCHAR(26) NOT NULL,
  `role_name` VARCHAR(32) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`org_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
);

ALTER TABLE `organization_member`
CHANGE `role` `role_id` varchar(26),
ADD FOREIGN KEY (`role_id`) REFERENCES `organization_role` (`id`);

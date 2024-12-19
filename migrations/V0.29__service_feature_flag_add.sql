INSERT INTO `feature_flags` (`id`, `name`, `description`, `enabled`, `percentageOfUsers`, `settingName`, `settingValue`, `createdAt`, `updatedAt`)
VALUES ('F-services', 'Service Hub Beta', 'Contracting App for Ship Services', 
'1', '1', 'feature_Services', '1', now(), now());
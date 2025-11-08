ALTER TABLE `organization_member` CHANGE `role_id` `rank_id` varchar(26) COLLATE 'utf8mb4_0900_ai_ci' NULL
AFTER `org_id`;
ALTER TABLE `organization_role` CHANGE `role_name` `rank_name` varchar(32) COLLATE 'utf8mb4_0900_ai_ci' NOT NULL
AFTER `org_id`;

RENAME TABLE `organization_role` TO `organization_rank`;

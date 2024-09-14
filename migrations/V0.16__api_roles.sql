ALTER TABLE `api_tokens`
ADD COLUMN `roles` JSON;
ALTER TABLE `notifications`
MODIFY COLUMN `action` JSON NULL;

DELIMITER ;;
CREATE EVENT `purge_expired_tokens`
ON SCHEDULE EVERY '1' HOUR ON COMPLETION PRESERVE
ENABLE COMMENT '' DO
DELETE FROM `invalid_tokens` WHERE `expires` > NOW();;
DELETE FROM `user_validation` WHERE `expiresAt` > NOW();;
DELIMITER ;


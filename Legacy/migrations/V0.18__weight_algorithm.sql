# See R__calculate_user_rating.sql
ALTER TABLE `users`
  ADD COLUMN `total_ratings` INT NOT NULL DEFAULT 0,
  ADD COLUMN `display_rating` DOUBLE NOT NULL DEFAULT -1,
  ADD COLUMN `weighted_rating` DOUBLE NOT NULL DEFAULT -1;

UPDATE `user_ratings` SET
`rating_value` = -2
WHERE `rating_value` = 1;
UPDATE `user_ratings` SET
`rating_value` = -1
WHERE `rating_value` = 2;
UPDATE `user_ratings` SET
`rating_value` = 1
WHERE `rating_value` = 3;
UPDATE `user_ratings` SET
`rating_value` = 2
WHERE `rating_value` = 4;
UPDATE `user_ratings` SET
`rating_value` = 3
WHERE `rating_value` = 5;

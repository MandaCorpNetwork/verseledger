# See R__calculate_user_rating.sql
ALTER TABLE `users`
  ADD COLUMN `total_ratings` INT NOT NULL DEFAULT 0,
  ADD COLUMN `display_rating` DOUBLE NOT NULL DEFAULT -1,
  ADD COLUMN `weighted_rating` DOUBLE NOT NULL DEFAULT -1;

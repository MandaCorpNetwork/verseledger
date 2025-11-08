DROP PROCEDURE IF EXISTS calculate_user_rating;

DELIMITER //
CREATE PROCEDURE calculate_user_rating (IN `user_id` VARCHAR(26))
BEGIN
  DECLARE weighted_rating DOUBLE DEFAULT 0;
  DECLARE display_rating DOUBLE DEFAULT 0;
  DECLARE total_ratings INT DEFAULT 0;
  DECLARE total_positive INT DEFAULT 0;
  DECLARE total_negative INT DEFAULT 0;

  DECLARE rating_minus_one INT DEFAULT 0;
  DECLARE rating_minus_two INT DEFAULT 0;
  DECLARE rating_minus_three INT DEFAULT 0;
  DECLARE rating_one INT DEFAULT 0;
  DECLARE rating_two INT DEFAULT 0;
  DECLARE rating_three INT DEFAULT 0;

  SELECT COUNT (id) INTO rating_minus_one FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = -1;
  SELECT COUNT (id) INTO rating_minus_two FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = -2;
  SELECT COUNT (id) INTO rating_minus_three FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = -3;
  SELECT COUNT (id) INTO rating_one FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = 1;
  SELECT COUNT (id) INTO rating_two FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = 2;
  SELECT COUNT (id) INTO rating_three FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = 3;

  SET total_positive = rating_one + (rating_two * 2) + (rating_three * 3);
  SET total_negative = rating_minus_one + (rating_minus_two * 2) + (rating_minus_three * 3) ;
  SET total_ratings = total_positive + total_negative;

  SET display_rating = total_positive / total_ratings;

  SET weighted_rating = ((total_positive + 1.9208) / (display_rating) -
                   1.96 * SQRT((total_positive * total_negative) / (display_rating) + 0.9604) /
                    (display_rating)) / (1 + 3.8416 / (display_rating));

  SELECT weighted_rating;
  SELECT display_rating;
  SELECT (rating_minus_one + rating_minus_two + rating_minus_three + rating_one + rating_two + rating_three) AS total_rating;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS calculate_user_rating;

DELIMITER //
CREATE PROCEDURE calculate_user_rating (IN `user_id` VARCHAR(26))
BEGIN
  DECLARE weighted_rating DOUBLE DEFAULT 0;
  DECLARE display_rating DOUBLE DEFAULT 0;
  DECLARE total_ratings INT DEFAULT 0;
  DECLARE total_positive INT DEFAULT 0;
  DECLARE total_negative INT DEFAULT 0;

  DECLARE rating_one INT DEFAULT 0;
  DECLARE rating_two INT DEFAULT 0;
  DECLARE rating_three INT DEFAULT 0;
  DECLARE rating_four INT DEFAULT 0;
  DECLARE rating_five INT DEFAULT 0;

  SELECT COUNT (id) INTO rating_one FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = 1;
  SELECT COUNT (id) INTO rating_two FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = 2;
  SELECT COUNT (id) INTO rating_four FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = 4;
  SELECT COUNT (id) INTO rating_five FROM `user_ratings` WHERE `reciever_id` = `user_id` AND `rating_value` = 5;

  SET total_positive = rating_four + (rating_five * 2);
  SET total_negative = (rating_one * 2) + rating_two ;
  SET total_ratings = total_positive + total_negative;

  SET display_rating = total_positive / total_ratings;

  SET weighted_rating = ((total_positive + 1.9208) / (total_positive + total_negative) -
                   1.96 * SQRT((total_positive * total_negative) / (total_positive + total_negative) + 0.9604) /
                          (total_positive + total_negative)) / (1 + 3.8416 / (total_positive + total_negative));

  SELECT weighted_rating;
  SELECT display_rating;
  SELECT (rating_one+rating_two+rating_four+rating_five) AS total_rating;
END//
DELIMITER ;


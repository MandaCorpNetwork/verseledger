-- SQLINES DEMO *** QL 8.4.2 dump

/* SET NAMES utf8; */
time_zone := '+00:00';
/* SET foreign_key_checks = 0; */

/* SET NAMES utf8mb4; */

DELIMITER ;;

DROP PROCEDURE IF EXISTS calculate_user_rating;;
;;

DROP EVENT IF EXISTS purge_expired_api_tokens;;
CREATE  EVENT purge_expired_api_tokens ON SCHEDULE EVERY 5 MINUTE STARTS '2024-09-04 03:26:30' ON COMPLETION PRESERVE ENABLE DO DELETE FROM api_tokens
WHERE expiresAt < NOW();;

DROP EVENT IF EXISTS purge_expired_validation;;
CREATE  EVENT purge_expired_validation ON SCHEDULE EVERY 1 HOUR STARTS '2024-09-04 03:26:30' ON COMPLETION PRESERVE ENABLE DO DELETE FROM user_validation
WHERE expiresAt < NOW();;

DELIMITER ;

DROP TABLE IF EXISTS announcements;
-- SQLINES FOR EVALUATION USE ONLY (14 DAYS)
CREATE TABLE announcements (
  id varchar(26) NOT NULL,
  content text NOT NULL,
  actions json DEFAULT NULL,
  expireAt timestamp(0) DEFAULT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
) ;


DROP TABLE IF EXISTS api_tokens;
CREATE TABLE api_tokens (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  token_id varchar(26) NOT NULL,
  type varchar(30) check (type in ('access','refresh','api')) NOT NULL,
  name varchar(32) NOT NULL DEFAULT 'USER TOKEN',
  expiresAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  roles json DEFAULT NULL,
  PRIMARY KEY (id)
,
  CONSTRAINT api_tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX api_tokens_ibfk_1 ON api_tokens (user_id);


DROP TABLE IF EXISTS chat;
CREATE TABLE chat (
  id varchar(26) NOT NULL,
  sender_id varchar(26) NOT NULL,
  reciever_id varchar(26) DEFAULT NULL,
  channel_id varchar(26) DEFAULT NULL,
  message text,
  read smallint NOT NULL DEFAULT '0',
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT chat_ibfk_1 FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT chat_ibfk_2 FOREIGN KEY (reciever_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX chat_ibfk_1 ON chat (sender_id);
CREATE INDEX chat_ibfk_2 ON chat (reciever_id);


DROP TABLE IF EXISTS contract_bids;
CREATE TABLE contract_bids (
  id varchar(26) NOT NULL,
  contract_id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  status varchar(30) check (status in ('PENDING','ACCEPTED','REJECTED','INVITED','DECLINED','EXPIRED','DISMISSED','WITHDRAWN')) NOT NULL DEFAULT 'PENDING',
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  amount double precision NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
,
  CONSTRAINT contract_bids_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT contract_bids_ibfk_2 FOREIGN KEY (contract_id) REFERENCES contracts (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX contract_bids_ibfk_1 ON contract_bids (user_id);
CREATE INDEX contract_bids_ibfk_2 ON contract_bids (contract_id);


DROP TABLE IF EXISTS contract_locations;
CREATE TABLE contract_locations (
  contract_id varchar(26) NOT NULL,
  location_id varchar(26) NOT NULL,
  tag varchar(32) NOT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */
,
  CONSTRAINT contract_locations_ibfk_1 FOREIGN KEY (contract_id) REFERENCES contracts (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT contract_locations_ibfk_2 FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX contract_locations_ibfk_1 ON contract_locations (contract_id);
CREATE INDEX contract_locations_ibfk_2 ON contract_locations (location_id);


DROP TABLE IF EXISTS contracts;
CREATE TABLE contracts (
  id varchar(26) NOT NULL,
  title varchar(32) NOT NULL,
  subtype varchar(32) DEFAULT NULL,
  briefing text NOT NULL,
  owner_org_id varchar(26) DEFAULT NULL,
  owner_user_id varchar(26) DEFAULT NULL,
  bidDate timestamp(0) DEFAULT NULL,
  startDate timestamp(0) DEFAULT NULL,
  endDate timestamp(0) DEFAULT NULL,
  isEmergency smallint NOT NULL DEFAULT '0',
  ratingLimit double precision DEFAULT NULL,
  contractorLimit smallint check (contractorLimit > 0) DEFAULT NULL,
  payStructure varchar(32) NOT NULL,
  isBargaining smallint NOT NULL DEFAULT '0',
  isBonusPay smallint NOT NULL DEFAULT '0',
  defaultPay double precision NOT NULL DEFAULT '0',
  status varchar(30) check (status in ('BIDDING','PENDING','INPROGRESS','COMPLETED','CANCELED')) NOT NULL DEFAULT 'PENDING',
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT contracts_ibfk_1 FOREIGN KEY (owner_user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT contracts_ibfk_2 FOREIGN KEY (owner_org_id) REFERENCES organizations (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX contracts_ibfk_1 ON contracts (owner_user_id);
CREATE INDEX contracts_ibfk_2 ON contracts (owner_org_id);


DROP TABLE IF EXISTS donations;
CREATE TABLE donations (
  id varchar(26) NOT NULL,
  display_name varchar(128) NOT NULL,
  cents int NOT NULL,
  message text,
  donation_id varchar(128) DEFAULT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
) ;


DROP TABLE IF EXISTS feature_flags;
CREATE TABLE feature_flags (
  id varchar(26) NOT NULL,
  name varchar(32) NOT NULL,
  description text CHARACTER SET utf8mb4 NOT NULL,
  enabled smallint NOT NULL DEFAULT '0',
  percentageOfUsers varchar(26) DEFAULT NULL,
  settingName varchar(128) DEFAULT NULL,
  settingValue varchar(255) DEFAULT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id),
  CONSTRAINT name UNIQUE  (name)
) ;


DROP TABLE IF EXISTS flyway_schema_history;
CREATE TABLE flyway_schema_history (
  installed_rank int NOT NULL,
  version varchar(50) DEFAULT NULL,
  description varchar(200) NOT NULL,
  type varchar(20) NOT NULL,
  script varchar(1000) NOT NULL,
  checksum int DEFAULT NULL,
  installed_by varchar(100) NOT NULL,
  installed_on timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  execution_time int NOT NULL,
  success smallint NOT NULL,
  PRIMARY KEY (installed_rank)
) ;

CREATE INDEX flyway_schema_history_s_idx ON flyway_schema_history (success);


DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
  id varchar(26) NOT NULL,
  version varchar(128) NOT NULL,
  name varchar(64) NOT NULL,
  category varchar(64) NOT NULL,
  parent varchar(64) DEFAULT NULL,
  short_name varchar(64) NOT NULL,
  waypoint_name varchar(64) DEFAULT NULL,
  time_index varchar(64) DEFAULT NULL,
  x double precision NOT NULL,
  y double precision NOT NULL,
  z double precision NOT NULL,
  QT smallint NOT NULL DEFAULT '0',
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
) ;


DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  read smallint NOT NULL DEFAULT '0',
  message text NOT NULL,
  action json DEFAULT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT notifications_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX notifications_ibfk_1 ON notifications (user_id);


DROP TABLE IF EXISTS organization_invite;
CREATE TABLE organization_invite (
  id varchar(26) NOT NULL,
  organization_id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  application_handler varchar(26) NOT NULL,
  status varchar(30) check (status in ('PENDING','ACCEPTED','REJECTED','INVITED','DECLINED','EXPIRED','DISMISSED','WITHDRAWN')) NOT NULL DEFAULT 'PENDING',
  application_message text,
  application_response text,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT organization_invite_ibfk_1 FOREIGN KEY (organization_id) REFERENCES organizations (id) ON DELETE CASCADE,
  CONSTRAINT organization_invite_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT organization_invite_ibfk_3 FOREIGN KEY (application_handler) REFERENCES users (id) ON DELETE CASCADE
) ;

CREATE INDEX organization_id ON organization_invite (organization_id);
CREATE INDEX user_id ON organization_invite (user_id);
CREATE INDEX application_handler ON organization_invite (application_handler);


DROP TABLE IF EXISTS organization_member;
CREATE TABLE organization_member (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  org_id varchar(26) NOT NULL,
  rank_id varchar(26) CHARACTER SET utf8mb4 DEFAULT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  joined timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  primary smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
,
  CONSTRAINT organization_member_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT organization_member_ibfk_2 FOREIGN KEY (org_id) REFERENCES organizations (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT organization_member_ibfk_3 FOREIGN KEY (rank_id) REFERENCES organization_rank (id)
) ;

CREATE INDEX organization_members_ibfk_1 ON organization_member (user_id);
CREATE INDEX organization_members_ibfk_2 ON organization_member (org_id);
CREATE INDEX role_id ON organization_member (rank_id);


DROP TABLE IF EXISTS organization_rank;
CREATE TABLE organization_rank (
  id varchar(26) NOT NULL,
  org_id varchar(26) NOT NULL,
  rank_name varchar(32) CHARACTER SET utf8mb4 NOT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT organization_rank_ibfk_1 FOREIGN KEY (org_id) REFERENCES organizations (id) ON DELETE CASCADE
) ;

CREATE INDEX org_id ON organization_rank (org_id);


DROP TABLE IF EXISTS organizations;
CREATE TABLE organizations (
  id varchar(26) NOT NULL,
  title varchar(50) DEFAULT NULL,
  rsi_handle varchar(32) NOT NULL COMMENT 'robertspaceindustries organization community id',
  owner_id varchar(26) NOT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT organizations_ibfk_1 FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX organizations_ibfk_1 ON organizations (owner_id);


DROP TABLE IF EXISTS subscriptions;
CREATE TABLE subscriptions (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  endpoint varchar(255) NOT NULL,
  auth varchar(255) NOT NULL,
  p256dh varchar(255) NOT NULL,
  expiration_time int check (expiration_time > 0) NOT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT subscriptions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ;

CREATE INDEX user_id ON subscriptions (user_id);


DROP TABLE IF EXISTS user_auth;
CREATE TABLE user_auth (
  id int check (id > 0) NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id varchar(32) NOT NULL,
  type varchar(30) check (type in ('DISCORD','GOOGLE')) NOT NULL,
  identifier varchar(32) NOT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT user_auth_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX user_auth_ibfk_1 ON user_auth (user_id);


DROP TABLE IF EXISTS user_ratings;
CREATE TABLE user_ratings (
  id varchar(26) NOT NULL,
  submitter_id varchar(26) NOT NULL,
  reciever_id varchar(26) NOT NULL,
  contract_id varchar(26) NOT NULL,
  rating_type varchar(32) DEFAULT NULL,
  rating_value double precision NOT NULL,
  comment text,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT user_ratings_ibfk_1 FOREIGN KEY (submitter_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_ratings_ibfk_2 FOREIGN KEY (reciever_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_ratings_ibfk_3 FOREIGN KEY (contract_id) REFERENCES contracts (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX user_ratings_ibfk_1 ON user_ratings (submitter_id);
CREATE INDEX user_ratings_ibfk_2 ON user_ratings (reciever_id);
CREATE INDEX user_ratings_ibfk_3 ON user_ratings (contract_id);


DROP TABLE IF EXISTS user_settings;
CREATE TABLE user_settings (
  id varchar(255) NOT NULL,
  user_id varchar(26) NOT NULL,
  key varchar(128) NOT NULL,
  value varchar(255) DEFAULT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT user_settings_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX user_settings_ibfk_1 ON user_settings (user_id);


DROP TABLE IF EXISTS user_validation;
CREATE TABLE user_validation (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  handle varchar(32) DEFAULT NULL,
  pfp text COMMENT 'robertspaceindustries community pfp',
  expiresAt timestamp(0) NOT NULL,
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  PRIMARY KEY (id)
,
  CONSTRAINT user_validation_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ;

CREATE INDEX user_validation_ibfk_1 ON user_validation (user_id);


DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id varchar(26) NOT NULL,
  handle varchar(32) DEFAULT NULL,
  displayName varchar(32) DEFAULT NULL,
  pfp text COMMENT 'profile picture url',
  verified smallint DEFAULT '0',
  createdAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP /* ON UPDATE CURRENT_TIMESTAMP */,
  total_ratings int NOT NULL DEFAULT '0',
  display_rating double precision NOT NULL DEFAULT '-1',
  weighted_rating double precision NOT NULL DEFAULT '-1',
  last_login timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ;

DROP PROCEDURE IF EXISTS calculate_user_rating;

DELIMITER //
-- SQLINES FOR EVALUATION USE ONLY (14 DAYS)
CREATE OR REPLACE PROCEDURE calculate_user_rating (IN user_id VARCHAR(26), IN OUT cur REFCURSOR, IN OUT cur2 REFCURSOR, IN OUT cur3 REFCURSOR)
AS $$

  DECLARE weighted_rating DOUBLE PRECISION DEFAULT 0;
  display_rating DOUBLE PRECISION DEFAULT 0;
  total_ratings INT DEFAULT 0;
  total_positive INT DEFAULT 0;
  total_negative INT DEFAULT 0;

  rating_minus_one INT DEFAULT 0;
  rating_minus_two INT DEFAULT 0;
  rating_minus_three INT DEFAULT 0;
  rating_one INT DEFAULT 0;
  rating_two INT DEFAULT 0;
  rating_three INT DEFAULT 0;
BEGIN

  SELECT COUNT (id) INTO rating_minus_one FROM user_ratings WHERE reciever_id = user_id AND rating_value = -1;
  SELECT COUNT (id) INTO rating_minus_two FROM user_ratings WHERE reciever_id = user_id AND rating_value = -2;
  SELECT COUNT (id) INTO rating_minus_three FROM user_ratings WHERE reciever_id = user_id AND rating_value = -3;
  SELECT COUNT (id) INTO rating_one FROM user_ratings WHERE reciever_id = user_id AND rating_value = 1;
  SELECT COUNT (id) INTO rating_two FROM user_ratings WHERE reciever_id = user_id AND rating_value = 2;
  SELECT COUNT (id) INTO rating_three FROM user_ratings WHERE reciever_id = user_id AND rating_value = 3;

  total_positive := rating_one + (rating_two * 2) + (rating_three * 3);
  total_negative := rating_minus_one + (rating_minus_two * 2) + (rating_minus_three * 3) ;
  total_ratings := total_positive + total_negative;

  display_rating := total_positive / total_ratings;

  weighted_rating := ((total_positive + 1.9208) / (display_rating) -
                   1.96 * SQRT((total_positive * total_negative) / (display_rating) + 0.9604) /
                    (display_rating)) / (1 + 3.8416 / (display_rating));

  OPEN cur FOR SELECT weighted_rating;
  OPEN cur2 FOR SELECT display_rating;
  OPEN cur3 FOR SELECT (rating_minus_one + rating_minus_two + rating_minus_three + rating_one + rating_two + rating_three) AS total_rating;
END;
$$ LANGUAGE plpgsql;
DELIMITER ;

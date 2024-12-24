CREATE TABLE users (
  id varchar(26) NOT NULL,
  handle varchar(32) DEFAULT NULL,
  display_name varchar(32) DEFAULT NULL,
  pfp text,
  verified BOOLEAN DEFAULT 'f',
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_ratings int NOT NULL DEFAULT '0',
  display_rating double precision NOT NULL DEFAULT '-1',
  weighted_rating double precision NOT NULL DEFAULT '-1',
  last_login timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE announcements (
  id varchar(26) NOT NULL,
  content text NOT NULL,
  actions json DEFAULT NULL,
  expireAt timestamp(0) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE chat (
  id varchar(26) NOT NULL,
  sender_id varchar(26) NOT NULL,
  reciever_id varchar(26) DEFAULT NULL,
  channel_id varchar(26) DEFAULT NULL,
  message text,
  read BOOLEAN NOT NULL DEFAULT 'f',
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT chat_ibfk_1 FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT chat_ibfk_2 FOREIGN KEY (reciever_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE organizations (
  id varchar(26) NOT NULL,
  title varchar(50) DEFAULT NULL,
  rsi_handle varchar(32) NOT NULL,
  owner_id varchar(26) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT organizations_ibfk_1 FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
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
  isEmergency BOOLEAN NOT NULL DEFAULT 'f',
  ratingLimit double precision DEFAULT NULL,
  contractorLimit smallint check (contractorLimit > 0) DEFAULT NULL,
  payStructure varchar(32) NOT NULL,
  isBargaining BOOLEAN NOT NULL DEFAULT 'f',
  isBonusPay BOOLEAN NOT NULL DEFAULT 'f',
  defaultPay double precision NOT NULL DEFAULT '0',
  status varchar(30) check (
    status in (
      'BIDDING',
      'PENDING',
      'INPROGRESS',
      'COMPLETED',
      'CANCELED'
    )
  ) NOT NULL DEFAULT 'PENDING',
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT contracts_ibfk_1 FOREIGN KEY (owner_user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT contracts_ibfk_2 FOREIGN KEY (owner_org_id) REFERENCES organizations (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE contract_bids (
  id varchar(26) NOT NULL,
  contract_id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  status varchar(30) check (
    status in (
      'PENDING',
      'ACCEPTED',
      'REJECTED',
      'INVITED',
      'DECLINED',
      'EXPIRED',
      'DISMISSED',
      'WITHDRAWN'
    )
  ) NOT NULL DEFAULT 'PENDING',
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  amount double precision NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  CONSTRAINT contract_bids_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT contract_bids_ibfk_2 FOREIGN KEY (contract_id) REFERENCES contracts (id) ON DELETE CASCADE ON UPDATE CASCADE
);
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
  QT BOOLEAN NOT NULL DEFAULT 'f',
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE contract_locations (
  contract_id varchar(26) NOT NULL,
  location_id varchar(26) NOT NULL,
  tag varchar(32) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT contract_locations_ibfk_1 FOREIGN KEY (contract_id) REFERENCES contracts (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT contract_locations_ibfk_2 FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE donations (
  id varchar(26) NOT NULL,
  display_name varchar(128) NOT NULL,
  cents int NOT NULL,
  message text,
  donation_id varchar(128) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE feature_flags (
  id varchar(26) NOT NULL,
  name varchar(32) NOT NULL,
  description text NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT 'f',
  percentageOfUsers varchar(26) DEFAULT NULL,
  settingName varchar(128) DEFAULT NULL,
  settingValue varchar(255) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT name UNIQUE (name)
);
CREATE TABLE notifications (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  read BOOLEAN NOT NULL DEFAULT 'f',
  message text NOT NULL,
  action json DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT notifications_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE organization_invite (
  id varchar(26) NOT NULL,
  organization_id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  application_handler varchar(26) NOT NULL,
  status varchar(30) check (
    status in (
      'PENDING',
      'ACCEPTED',
      'REJECTED',
      'INVITED',
      'DECLINED',
      'EXPIRED',
      'DISMISSED',
      'WITHDRAWN'
    )
  ) NOT NULL DEFAULT 'PENDING',
  application_message text,
  application_response text,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT organization_invite_ibfk_1 FOREIGN KEY (organization_id) REFERENCES organizations (id) ON DELETE CASCADE,
  CONSTRAINT organization_invite_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT organization_invite_ibfk_3 FOREIGN KEY (application_handler) REFERENCES users (id) ON DELETE CASCADE
);
CREATE TABLE organization_rank (
  id varchar(26) NOT NULL,
  org_id varchar(26) NOT NULL,
  rank_name varchar(32) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT organization_rank_ibfk_1 FOREIGN KEY (org_id) REFERENCES organizations (id) ON DELETE CASCADE
);
CREATE TABLE organization_member (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  org_id varchar(26) NOT NULL,
  rank_id varchar(26) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  joined timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  isPrimary BOOLEAN NOT NULL DEFAULT 'f',
  PRIMARY KEY (id),
  CONSTRAINT organization_member_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT organization_member_ibfk_2 FOREIGN KEY (org_id) REFERENCES organizations (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT organization_member_ibfk_3 FOREIGN KEY (rank_id) REFERENCES organization_rank (id)
);
CREATE TABLE subscriptions (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  endpoint varchar(255) NOT NULL,
  auth varchar(255) NOT NULL,
  p256dh varchar(255) NOT NULL,
  expiration_time int check (expiration_time > 0) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT subscriptions_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE TABLE user_auth (
  id int check (id > 0) NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id varchar(32) NOT NULL,
  type varchar(30) check (
    type in (
      'DISCORD',
      'GOOGLE'
    )
  ) NOT NULL,
  identifier varchar(32) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_auth_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE user_ratings (
  id varchar(26) NOT NULL,
  submitter_id varchar(26) NOT NULL,
  reciever_id varchar(26) NOT NULL,
  contract_id varchar(26) NOT NULL,
  rating_type varchar(32) DEFAULT NULL,
  rating_value double precision NOT NULL,
  comment text,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_ratings_ibfk_1 FOREIGN KEY (submitter_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_ratings_ibfk_2 FOREIGN KEY (reciever_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT user_ratings_ibfk_3 FOREIGN KEY (contract_id) REFERENCES contracts (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE user_settings (
  id varchar(255) NOT NULL,
  user_id varchar(26) NOT NULL,
  key varchar(128) NOT NULL,
  value varchar(255) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_settings_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE user_validation (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  handle varchar(32) DEFAULT NULL,
  pfp text,
  expiresAt timestamp(0) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_validation_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE user_settings (
  id varchar(255) NOT NULL,
  user_id varchar(26) NOT NULL,
  key varchar(128) NOT NULL,
  value varchar(255) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE audit (
  id VARCHAR(26) NOT NULL,
  token VARCHAR(26) NOT NULL
);
CREATE TABLE files (
  name TEXT PRIMARY KEY,
  mime_type TEXT NOT NULL,
  data BYTEA NOT NULL
);
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
CREATE TABLE user_auth (
  id int check (id > 0) NOT NULL GENERATED ALWAYS AS IDENTITY,
  user_id varchar(32) NOT NULL,
  token_type varchar(30) check (token_type in ('DISCORD', 'GOOGLE')) NOT NULL,
  identifier varchar(32) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT user_auth_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
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
CREATE TABLE user_settings (
  id varchar(255) NOT NULL,
  user_id varchar(26) NOT NULL,
  key varchar(128) NOT NULL,
  value varchar(255) DEFAULT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
CREATE TABLE waypoints (
  id VARCHAR(26) PRIMARY KEY,
  owner_id VARCHAR(26),
  parent_id VARCHAR(26) NULL,
  name VARCHAR(64) NOT NULL,
  category VARCHAR(64) NULL,
  x DOUBLE PRECISION DEFAULT 0,
  y DOUBLE PRECISION DEFAULT 0,
  z DOUBLE PRECISION DEFAULT 0
);
CREATE TABLE api_tokens (
  id varchar(26) NOT NULL,
  user_id varchar(26) NOT NULL,
  token_id varchar(26) NOT NULL,
  token_type varchar(30) check (
    token_type in (
      'access',
      'refresh',
      'api'
    )
  ) NOT NULL,
  token_location text NULL,
  token_browser text NULL,
  token_name varchar(32) NOT NULL DEFAULT 'USER TOKEN',
  expires_at timestamp(0) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_used_at timestamp(0) NULL,
  roles json DEFAULT NULL,
  PRIMARY KEY (id)
);
CREATE INDEX api_tokens_id_index ON api_tokens (token_id);

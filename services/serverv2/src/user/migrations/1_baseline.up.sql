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

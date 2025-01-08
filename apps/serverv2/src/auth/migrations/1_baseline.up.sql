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
  token_name varchar(32) NOT NULL DEFAULT 'USER TOKEN',
  expires_at timestamp(0) NOT NULL,
  created_at timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_used_at timestamp(0) NULL,
  roles json DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX api_tokens_id_index ON api_tokens (token_id);

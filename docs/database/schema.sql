CREATE TABLE user(
  email varchar(30) PRIMARY KEY,
  password varchar(30),
  loggedIn BOOLEAN,
  token VARCHAR(32)
);

CREATE TABLE binary(
  id INTEGER PRIMARY KEY,
  user varchar(30),
  introduction BOOLEAN,
  shifting  BOOLEAN,
  bits BOOLEAN,
  signed BOOLEAN,
  ones BOOLEAN,
  twos BOOLEAN,
  summary  BOOLEAN,

  CONSTRAINT fk_user_binary
  FOREIGN KEY (user) references user(email)
);

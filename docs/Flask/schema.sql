CREATE TABLE user(
  email TEXT NOT NULL PRIMARY KEY,
  password TEXT NOT NULL,
  accountType TEXT NOT NULL,
  loggedIn BOOLEAN,
  token TEXT
);

CREATE TABLE lessons(
  id INTEGER PRIMARY KEY,
  chapter TEXT NOT NULL,
  subchapter TEXT NOT NULL,
  points INTEGER NOT NULL
);

CREATE TABLE solved(
  odah INTEGER PRIMARY KEY,
  lesson TEXT NOT NULL,
  user TEXT NOT NULL,
  points INTEGER NOT NULL CHECK(points >=0),
  passed INTEGER,

  CONSTRAINT fk_lessons_lesson
  FOREIGN KEY (lesson) REFERENCES lessons(id),

  CONSTRAINT fk_user_user
  FOREIGN KEY (user) REFERENCES user(email) -- ,

  -- PRIMARY KEY (lesson, user)
);

CREATE TABLE questions(
  id INTEGER PRIMARY KEY,
  subchapter TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,

  CONSTRAINT fk_lessons_questions
  FOREIGN KEY (subchapter) REFERENCES lessons(subchapter)
);

CREATE TABLE class(
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  key TEXT NOT NULL,
  admin TEXT NOT NULL,

  CONSTRAINT fk_class_lesson
  FOREIGN KEY (admin) REFERENCES user(email)
);

CREATE TABLE classroom(
  classID INTEGER NOT NULL,
  user TEXT NOT NULL,
  role TEXT NOT NULL,

  CONSTRAINT fk_classID_class
  FOREIGN KEY (classID) REFERENCES class(ID),

  CONSTRAINT fk_userclassroom_user
  FOREIGN KEY (user) REFERENCES user(email),

  PRIMARY KEY (classID, user)
);

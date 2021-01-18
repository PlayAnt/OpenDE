-- USERS ------------------------------------------

INSERT INTO user(email, password, loggedIn, token)
VALUES ("superman@jl.com", "lois", 0, 0);

INSERT INTO user(email, password, loggedIn, token)
VALUES ("batman@jl.com", "selena", 0, 0);

INSERT INTO user(email, password, loggedIn, token)
VALUES ("wonderwoman@jl.com", "steve", 0, 0);

-- BINARY -----------------------------------------

INSERT INTO binary(introduction, shifting, bits, signed, ones, twos, summary, user)
VALUES ("1", "1", "0", "0", "0", "0", "0", "superman@jl.com");

INSERT INTO binary(introduction, shifting, bits, signed, ones, twos, summary, user)
VALUES ("0", "0", "0", "0", "0", "0", "1", "batman@jl.com");

INSERT INTO binary(introduction, shifting, bits, signed, ones, twos, summary, user)
VALUES ("1", "1", "1", "1", "0", "0", "0", "wonderwoman@jl.com");

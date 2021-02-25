-- USERS ------------------------------------------

INSERT INTO user(email, password, accountType, loggedIn, token)
VALUES ("superman@jl.com", "lois", 1, 0, "0");

INSERT INTO user(email, password, accountType, loggedIn, token)
VALUES ("batman@jl.com", "selena", 2, 0, "0");

INSERT INTO user(email, password, accountType, loggedIn, token)
VALUES ("wonderwoman@jl.com", "steve", 0, 0, "0");

-- LESSONS-- --------------------------------------

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Binary", "Introduction to Binary", 10);

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Binary", "Bytes and Words", 5);

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Binary", "Shifting and Fractions", 5);

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Binary", "Signed", 5);

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Binary", "Ones Complement", 5);

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Binary", "Twos Complement", 5);

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Binary", "Binary Summary", 10);

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Hexadecimals", "Introduction to Hexadecimals", 10);

INSERT INTO lessons(chapter, subchapter, points)
VALUES ("Hexadecimals", "Binary-Hexadecimal-Conversion", 5);

-- QUESTIONS --------------------------------------

-- Introduction to Binary ------------------------------------------------------

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0000 in decimal?", "0");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0001 in decimal?", "1");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0010 in decimal?", "2");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0011 in decimal?", "3");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0100 in decimal?", "4");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0101 in decimal?", "5");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0110 in decimal?", "6");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0111 in decimal?", "7");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1000 in decimal?", "8");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1001 in decimal?", "9");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1010 in decimal?", "10");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1011 in decimal?", "11");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1100 in decimal?", "12");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1101 in decimal?", "13");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1110 in decimal?", "14");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1111 in decimal?", "15");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 0 in 4-bit binary??", "0000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 1 in 4-bit binary??", "0001");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 2 in 4-bit binary??", "0010");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 3 in 4-bit binary??", "0011");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 4 in 4-bit binary??", "0100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 5 in 4-bit binary??", "0101");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 6 in 4-bit binary??", "0110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 7 in 4-bit binary??", "0111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 8 in 4-bit binary??", "1000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 9 in 4-bit binary??", "1001");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 10 in 4-bit binary??", "1010");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 11 in 4-bit binary??", "1011");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 12 in 4-bit binary??", "1100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 13 in 4-bit binary??", "1101");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 14 in 4-bit binary??", "1110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Binary", "What is 15 in 4-bit binary??", "1111");


-- Introduction to Binary ------------------------------------------------------

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 0000 0000 in decimal?", "0");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 1111 1111 in decimal?", "255");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 0010 1010 in decimal?", "42");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 1001 1001 in decimal?", "153");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 1101 1101 in decimal?", "221");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 32 in 8-bit binary?", "0010 0000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 127 in 8-bit binary?", "0111 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 54 in 8-bit binary?", "0011 0110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 77 in 8-bit binary?", "0100 1101");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "What is 4 in 8-bit binary?", "0000 0100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "How many bits do you need to represent 411 in binary?", "9");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "How many bits do you need to represent 1024 in binary?", "11");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Bytes and Words", "How many bits do you need to represent 37 in binary?", "6");

-- Shifitng and Fractions ------------------------------------------------------

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 1101.1100 in decimal?", "13.75");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 1001.0011 in decimal?", "9.1875");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 1001.0011 in decimal?", "12.5625");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 5.875 in binary?", "101.111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 3.25 in binary?", "11.01");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 6.125 in binary?", "110.001");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 0011 0101 left shifted twice in 8-bit binary?", "1101 0100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 1110 1101 left shifted twice in 8-bit binary?", "1011 0100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 0011 0101 right shifted twice in 8-bit binary?", "0000 1101");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "What is 1110 1101 right shifted twice in 8-bit binary?", "0011 1011");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "Is 0011 0101 right shifted once a true division with 2? Y/N", "N");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Shifting and Fractions", "Is 0011 0100 right shifted once a true division with 2? Y/N", "Y");

-- Signed ----------------------------------------------------------------------

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is -27 in an 8-bit signed binary?", "1001 1011");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is -127 in an 8-bit signed binary?", "1111 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is -5 in an 8-bit signed binary?", "1000 0101");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is 0000 0000 in decimal?", "0");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is 1000 0000 in decimal?", "-0");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is 42 in signed binary?", "0010 1010");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is 110 in an 8-bit signed binary?", "0110 1110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is 127 in an 8-bit signed binary?", "0111 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is -92 in an 8-bit signed binary?", "1101 1100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Signed", "What is 27 in an 8-bit signed binary?", "0001 1011");

-- One's Complement ------------------------------------------------------------

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is 127 in an one's complement binary?", "0111 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is -127 in an one's complement binary?", "1000 0000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is 0 in an one's complement binary?", "0000 0000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is -0 in an one's complement binary?", "1111 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is -19 in an one's complement binary?", "1110 1100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is 35 in an one's complement binary?", "0010 0011");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is -113 in an one's complement binary?", "1000 1110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is -97 in an one's complement binary?", "1001 1110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is one's complement 1101 1011 in decimal?", "-36");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is one's complement 1001 0010 in decimal?", "-109");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is one's complement 0011 1010 in decimal?", "58");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Ones Complement", "What is one's complement 1111 0000 in decimal?", "-15");

-- Two's Complement ------------------------------------------------------------

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is 127 in an two's complement binary?", "0111 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is -128 in an two's complement binary?", "1000 0000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is -127 in an two's complement binary?", "1000 0001");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is 0 in an two's complement binary?", "0000 0000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is -1 in an two's complement binary?", "1111 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is -19 in an two's complement binary?", "1110 1101");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is 35 in an two's complement binary?", "0010 0011");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is -113 in an two's complement binary?", "1000 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is -97 in an two's complement binary?", "1001 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is two's complement 1101 1011 in decimal?", "-37");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is two's complement 1001 0010 in decimal?", "-110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is two's complement 0011 1010 in decimal?", "58");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Twos Complement", "What is one's complement 1111 0000 in decimal?", "-16");

-- Binary Summary --------------------------------------------------------------
INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is 1101.1100 in decimal?", "13.75");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is 1001.0011 in decimal?", "9.1875");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is 0011 0101 left shifted twice?", "1101 0100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "Is 0011 0101 right shifted once a true division with 2? Y/N", "N");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is 1000 0000 in decimal?", "-0");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is 42 in signed binary?", "0010 1010");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is 110 in an 8-bit signed binary?", "0110 1110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is -127 in an one's complement binary?", "1000 0000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is -113 in an one's complement binary?", "1000 1110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is -97 in an one's complement binary?", "1001 1110");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is one's complement 1101 1011 in decimal?", "-36");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is one's complement 1001 0010 in decimal?", "-109");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is -113 in an two's complement binary?", "1000 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is -97 in an two's complement binary?", "-1001 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is two's complement 1101 1011 in decimal?", "-37");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary Summary", "What is two's complement 1001 0010 in decimal?", "-110");

-- Introduction to Hexadecimals-------------------------------------------------

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 2A in decimal?", "42");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is B7 in decimal?", "183");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is FF in decimal?", "255");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is AF in decimal?", "175");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 45 in decimal?", "69");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is BC in decimal?", "188");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 13 in decimal?", "19");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 07 in decimal?", "7");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is E0 in decimal?", "224");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is D4 in decimal?", "212");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 39 in hexadecimal?", "27");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 187 in hexadecimal?", "B7");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 16 in hexadecimal?", "10");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 8 in hexadecimal?", "08");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 24 in hexadecimal?", "18");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 254 in hexadecimal?", "FE");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 84 in hexadecimal?", "54");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 120 in hexadecimal?", "78");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 56 in hexadecimal?", "38");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Introduction to Hexadecimals", "What is 5 in hexadecimal?", "05");

-- Introduction to Hexadecimals-------------------------------------------------

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 2A in binary?", "0010 1010");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is E4 in binary?", "1110 0100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 7C in binary?", "0111 1100");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is BD in binary?", "1011 1101");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 8A in binary?", "1000 1010");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 47 in binary?", "0100 0111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 5F in binary?", "0101 1111");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is C9 in binary?", "1100 1001");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is A8 in binary?", "1010 1000");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is AA in binary?", "1010 1010");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 0010 1010 in hexadecimal?", "2A");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 1110 0100 in hexadecimal?", "E4");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 0111 1100 in hexadecimal?", "7C");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 1011 1101 in hexadecimal?", "BD");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 1000 1010 in hexadecimal?", "8A");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 0100 0111 in hexadecimal?", "47");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 0101 1111 in hexadecimal?", "5F");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 1100 1001 in hexadecimal?", "C9");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 1010 1000 in hexadecimal?", "A8");

INSERT INTO questions(subchapter, question, answer)
VALUES ("Binary-Hexadecimal-Conversion", "What is 1010 1010 in hexadecimal?", "AA");

-- CLASSROOM -------------------------------------------------------------------
-- INSERT INTO classroom(classID, user, role)
-- VALUES (1, "Chris Pratt", "For Student");
--
-- INSERT INTO classroom(classID, user, role)
-- VALUES (1, "Chris Evans", "For Student");
--
-- INSERT INTO classroom(classID, user, role)
-- VALUES (1, "Chris Hemsworth", "For Student");

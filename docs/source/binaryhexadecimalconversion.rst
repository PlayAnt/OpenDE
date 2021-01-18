Binary/Hexadecimal Conversion
=============================

Lesson
------

A hexadecimal digit can be represented with a four digit
binary number. Since a byte is eight bits long it can be
described with a two digit hexadecimal number. When
programming a code that directly interacts with hardware
it can be handy to use hexadecimal numbers instead of binary,
since it is shorter and more easily read.

The number 42 is stored as 00101010 in a byte but could be
typed as 2A in your code. To convert a binary number into a
hexadecimal number one only needs to split the binary number
into chunks of four digits/bits. Consider the previous example:

00101010 split into chunks of four digits is 0010 and 1010.

1010_2 = 10_10 = A_16

0010_2 = 2_10 = 2_16

Exercises
---------

Binary -> Hexadecimal

Hexadecimal -> Binary

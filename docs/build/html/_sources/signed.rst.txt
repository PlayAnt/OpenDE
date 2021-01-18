Signed
======

Lesson
------

To represent negative numbers is usually done with a '-' sign. Since computers
only use 1's and 0's another form of representation must be used. One way is to
use a sign bit, placed in the most significant bit of a word.

Usually if the sign bit is 0 it represents a positive number and a 1 would
represent a negative number. The amount would naturally be calculated as
usual, but this method is rarely used since it is complicated to use with
additions and subtractions. The table below shows some examples of positive and
negative numbers.

+------------------------+---------------+
| Binary Representations | Decimal Value |
+========================+===============+
| 0111 1111              | 127           |
+------------------------+---------------+
|      *                 |       *       |
+------------------------+---------------+
| 0101 0101              | 85            |
+------------------------+---------------+
|      *                 |       *       |
+------------------------+---------------+
| 0000 0001              | 1             |
+------------------------+---------------+
| 0000 0000              | 0             |
+------------------------+---------------+
| 1000 0000              | 0             |
+------------------------+---------------+
| 1000 0001              | -1            |
+------------------------+---------------+
|      *                 |       *       |
+------------------------+---------------+
| 1101 0101              | -85           |
+------------------------+---------------+
|      *                 |       *       |
+------------------------+---------------+
| 1111 1111              | -127          |
+------------------------+---------------+

Exercises
---------

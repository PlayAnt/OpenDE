Shifting and fractions
======================

Fractions
---------

Fractions in binary can be performed but is a bit more tricky. The numbers
after the dot in a fractional binary number represents the power of negative
numbers. See the table below for a simple visual explanation.

+----+----+----+----+----+--------+--------+--------+
| 2² | 2³ | 2² | 2¹ | 2⁰ | 2^(-1) | 2^(-2) | 2^(-3) |
+----+----+----+----+----+--------+--------+--------+
| 16 | 8  | 4  | 2  | 1  | 1/2    | 1/4    | 1/8    |
+----+----+----+----+----+--------+--------+--------+

The number 10001.101 in base-2 = 16  + 1 +1/2 + 1/8  = 17,625 in base-10

Shifting
--------

Multiplying a binary number by two is easy, to do so one only need to shift all
the digits a step to the left and adding a 0 where the first digit used to be.
This is called a left shift. For example:

01100110 multiplied with two =
11001100

Shifting to the right is basically a division by 2 and functions in a very similar
way, shift all the digits to the right and adding a zero on the left side.
For example:

01100110 divided by two =
00110011

Unless you use fractions he decimal will be lost and a true division by two
will not give the true answer when you right shift odd numbers.

00110011 divided by two =
00011001

Introduction to Binary
======================

Binary is a counting system that is of the base-2 in difference from the normal
decimal (base-10) system that you are probably most used to.

Instead of using all the 10 digits in different combinations to represent
numbers it uses only ones and zeros.

In a binary number each digit represents a 2^x where x is the position - one
from the right. The first digit from right therefore represent the number 1,
the second represents 2 etc.

Binary numbers are often represented with 8 or 16 digits, for reasons explained
in the "Bits and words" sub-chapter.

The table below simplifies what is written.

+---------+---+---+---+---+---+---+---+---+
| Position| 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 |
+---------+---+---+---+---+---+---+---+---+
|         | 2⁷| 2⁶| 2⁵| 2⁴| 2³| 2²| 2¹| 2⁰|
+---------+---+---+---+---+---+---+---+---+
|         |128| 64| 32| 16|  8|  4|  2|  1|
+---------+---+---+---+---+---+---+---+---+

The number 00110011 is therefore:

0*2⁷ + 0*2⁶ + 1*2⁵ + 1*2⁴ + 0*2³ + 0*2² + 1*2¹ + 1*2⁰ =

2⁵ + 2⁴ + 2¹ + 2⁰ =

32 + 16 + 2 + 1 =

51

import sqlite3
import sys
import os
import json

def getHash(email):
    conn = sqlite3.connect('database.db')
    hash = ''
    for row in conn.execute("SELECT password FROM user WHERE email = ?",(email, )):
        hash = row[0]
        break
    conn.close()

    return hash

def getHashClass(name):
    conn = sqlite3.connect('database.db')
    hash = ''
    for row in conn.execute("SELECT key FROM class WHERE name = ?",(name, )):
        hash = row[0]
        break
    conn.close()

    return hash


def createUser(user):
    conn = sqlite3.connect('database.db')

    conn.execute("INSERT INTO user (email, password, accountType, loggedIn) \
    VALUES (?, ?, ?, ?)",(user["email"],user["password"],user["accountType"], "0"));

    conn.commit()
    conn.close()
    return 0

def addUserToCourse(user, course):
    conn = sqlite3.connect('database.db')

    if course["binary"] == "true":
        addUserToBinary(user)

    if course["hexadecimal"] == "true":
        addUserToHexadecimal(user)

    if course["simpleLogicGates"] == "true":
        addUserToSimpleLogicGates(user)

    conn.commit()
    conn.close()
    return 0

def addCourseToClass(data, admin):
    conn = sqlite3.connect('database.db')

    id = ""

    id = validateClassByToken(data['name'], admin)

    if data["binary"] == "true":
        addUserToBinary(id)

    if data["hexadecimal"] == "true":
        addUserToHexadecimal(id)

    if data["simpleLogicGates"] == "true":
        addUserToSimpleLogicGates(id)

    conn.commit()
    conn.close()
    return 0

def checkExistingUser(user, course):
    conn = sqlite3.connect('database.db')
    status = ''
    for row in conn.execute("SELECT * FROM solved WHERE \
    user = ? AND lesson = ?", (user, course)):
        status = row[0]
        break

    if status != '':
        return 1

    return 0

def addUserToBinary(user):
    conn = sqlite3.connect('database.db')
    if (checkExistingUser(user, "Introduction to Binary") == 0) :

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Introduction to Binary', ?, 0, 0)", (user,));

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Bytes and Words', ?, 0, 0)", (user,));

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Shifting and Fractions', ?, 0, 0)", (user,));

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Bits and Words', ?, 0, 0)", (user,));

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Signed', ?, 0, 0)", (user,));

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Ones Complement', ?, 0, 0)", (user,));

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Twos Complement', ?, 0, 0)", (user,));

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Binary Summary', ?, 0, 0)", (user,));

        conn.commit()
        conn.close()

        return 0
    conn.close()
    print("user is already added to this course")
    return 1

def addUserToHexadecimal(user):
    conn = sqlite3.connect('database.db')

    if (checkExistingUser(user, "Introduction to Hexadecimals") == 0) :
        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Introduction to Hexadecimals', ?, 0, 0)", (user,));

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Binary-Hexadecimal-Conversion', ?, 0, 0)", (user,));

        conn.commit()
        conn.close()
        return 0

    conn.close()
    print("user is already added to this course")
    return 1

def addUserToSimpleLogicGates(user):
    conn = sqlite3.connect('database.db')

    if (checkExistingUser(user, "Introduction to Simple Logic Gates") == 0) :

        conn.execute("INSERT INTO solved(lesson, user, points, passed) \
        VALUES ('Introduction to Simple Logic Gates', ?, 0, 0)", (user,));

        conn.commit()
        conn.close()
        return 0

    conn.close()
    print("user is already added to this course")
    return 1

def validatePassword(token, password):
    conn = sqlite3.connect('database.db')

    for row in conn.execute("SELECT email FROM user WHERE token = ?", (token,)):
        email = row[0]
        break
    else:
        conn.close()
        return 0

    conn.close()

    return confirmPassword(email, password)

def replacePassword(token, newPassword):
    conn = sqlite3.connect('database.db')

    conn.execute("UPDATE user SET password = ? WHERE token = ?", (newPassword, token));

    conn.commit()
    conn.close()
    return 0

def confirmPassword(email, password):
    conn = sqlite3.connect('database.db')

    confirmPassword = ""

    for row in conn.execute("SELECT password FROM user WHERE email = ?", (email,)):
        confirmPassword = row[0]
        break

    if password == confirmPassword:
        conn.close()
        return 1
    else:
        conn.close()
        return 0
    conn.close()
    return 0

def validateEmail(email, accountType):
    conn = sqlite3.connect('database.db')

    confirmEmail = ""
    confirmAccountType = ""

    for row in conn.execute("SELECT email FROM user WHERE email = ?", (email,)):
        confirmEmail = row[0]
        break

    if confirmEmail == email:
        for row in conn.execute("SELECT accountType FROM user WHERE email = ?", (email,)):
            confirmAccountType = row[0]
            break

        if confirmAccountType == accountType:
            conn.close()
            return 1
        else:
            conn.close()
            return 0

    else:
        conn.close()
        return 0

    conn.close()
    return 0

def setLoggedIn(email):
    conn = sqlite3.connect('database.db')

    conn.execute("UPDATE user SET loggedIn = 1 WHERE email = ?", (email,));

    conn.commit()
    conn.close()
    return 0

def setToken(token, email):
    conn = sqlite3.connect('database.db')

    conn.execute("UPDATE user SET token = ? WHERE email = ?", (token, email));

    conn.commit()
    conn.close()
    return 0

def setLoggedOut(token):
    print("setLoggedOut")
    conn = sqlite3.connect('database.db')

    conn.execute("UPDATE user SET loggedIn = 0, token = 0 WHERE token = ?", (token,));

    conn.commit()
    conn.close()
    return 0

def selectUser(token):
    return tokenToEmail(token)
    # email = tokenToEmail(token)
    # return selectUserByEmail(token, email)

# def selectUserByEmail(token, email):
#     if validateToken(token) == 1:
#         conn = sqlite3.connect('database.db')
#
#         for row in conn.execute("SELECT * FROM user WHERE email = ?", (email,)):
#             data = {
#             'email': row[0],
#             'firstName' : row[2],
#             'familyName' : row[3],
#             'gender' : row[4],
#             'city' : row[5],
#             'country' : row[6]
#             }
#             break
#         else:
#             conn.close()
#             return 0
#         conn.close()
#         return data
#     else:
#         return -1

def validateToken(token):
    conn = sqlite3.connect('database.db')

    for row in conn.execute("SELECT token FROM user WHERE token = ?", (token,)):
        if row[0] == '0':
            conn.close()
            return 0
        else:
            conn.close()
            return 1
    conn.close()
    return 0

def tokenToEmail(token):
    conn = sqlite3.connect('database.db')
    for row in conn.execute("SELECT email FROM user WHERE token = ?", (token,)):
        email = row[0]
        break
    else:
        conn.close()
        return 0

    conn.close()
    return email

# def insertGrade(email, chapter, subchapter):
#     conn = sqlite3.connect('database.db')
#
#     confirmEmail = ""
#
#     for row in conn.execute("SELECT id FROM ? WHERE email = ?", (chapter, email,)):
#         confirmEmail = row[0]
#         break
#
#     if confirmEmail == email:
#         conn.execute("UPDATE ? SET ?=1 WHERE email=?", (chapter, subchapter, email,)):
#         conn.commit()
#         conn.close()
#         return 1
#
#     else:
#         conn.close()
#         return 0
#
#     conn.close()
#     return 0


def getQuestion(subchapter):
    conn = sqlite3.connect('database.db')
    # WHERE id = 1
    for row in conn.execute("SELECT question FROM questions WHERE subchapter \
    = ? ORDER BY RANDOM()", (subchapter,)):
        question = row[0]
        break
    else:
        conn.close()
        return 0

    conn.close()

    return question

def checkAnswer(subchapter, question, answer):
    conn = sqlite3.connect('database.db')

    correctAnswer = ""

    for row in conn.execute("SELECT answer FROM questions WHERE question = ? AND subchapter = ?", (question, subchapter,)):
        correctAnswer = row[0]
        break

    if correctAnswer == answer:
        conn.close()
        return 1
    else:
        conn.close()
        return 0

    conn.close()

    return 0

def pointsReq(subchapter):
    conn = sqlite3.connect('database.db')

    points= ""

    for row in conn.execute("SELECT points FROM lessons WHERE subchapter = ?", (subchapter,)):
        points = row[0]
        break
    else:
        conn.close()
        return 0

    conn.close()
    return points

def addPoint(subchapter, user):
    conn = sqlite3.connect('database.db')

    maxPoints = ""

    for row in conn.execute("SELECT points FROM lessons WHERE subchapter = ?", (subchapter,)):
        maxPoints = row[0]

    if(readPoints(subchapter, user) < maxPoints):
        conn.execute("UPDATE solved SET points = points + 1 WHERE lesson= ? AND user = ?", (subchapter, user,));
        conn.commit()

    conn.close()

    return 0

def subtractPoint(subchapter, user):
    conn = sqlite3.connect('database.db')
    conn.execute("")

    points = ""

    for row in conn.execute("SELECT points FROM solved WHERE lesson = ? AND user = ?", (subchapter, user,)):
        points = row[0]
        break
    else:
        conn.close()
        return -1

    if (points > 0) :
        conn.execute("UPDATE solved SET points = points - 1 WHERE lesson= ? AND user = ?", (subchapter, user,));
        conn.commit()
        conn.close()
        return 0

    conn.close()
    return -1

def readPoints(subchapter, user):
    conn = sqlite3.connect('database.db')

    points = ""

    for row in conn.execute("SELECT points FROM solved WHERE lesson = ? AND user = ?", (subchapter, user,)):
        points = row[0]
        break
    else:
        conn.close()
        return -1

    conn.close()
    return points

def controlGrade(subchapter, user):
    conn = sqlite3.connect('database.db')

    received = ""

    for row in conn.execute("SELECT points FROM solved WHERE lesson = ? AND user = ?", (subchapter, user,)):
        received = row[0]
        break
    else:
        conn.close()
        return 0

    required= ""

    for row in conn.execute("SELECT points FROM lessons WHERE subchapter = ?", (subchapter,)):
        required = row[0]
        break
    else:
        conn.close()
        return 0

    if received>=required:
        conn.execute("UPDATE solved SET passed = 1 WHERE lesson= ? AND user = ?", (subchapter, user,));
        conn.commit()
        conn.close()
        return 1

    conn.close()
    return 0


def checkEnlisted(subchapter, user):
    conn = sqlite3.connect('database.db')

    dummy = ""

    for row in conn.execute("SELECT * FROM solved WHERE lesson = ? AND user = ?", (subchapter, user,)):
        dummy = row[0]
        break
    else:
        conn.close()
        return 0

    conn.close()
    return 1

def checkGrade(subchapter, user):
    conn = sqlite3.connect('database.db')

    grade = "0"

    for row in conn.execute("SELECT passed FROM solved WHERE lesson = ? AND user = ?", (subchapter, user,)):
        grade = row[0]
        break
    else:
        conn.close()
        return 0

    if grade == 1:
        conn.close()
        return 1

    conn.close()
    return 0

def createClass(name, key, admin):
    conn = sqlite3.connect('database.db')

    conn.execute("INSERT INTO class(name, key, admin) \
    VALUES (?, ?, ?)", (name, key, admin));

    conn.commit()
    conn.close()
    return 1

def joinClass(name, key, user):
    conn = sqlite3.connect('database.db')

    id = validateClass(name, key)
    status = ""

    if id != 0:
        for row in conn.execute("SELECT user FROM classroom WHERE user = ? and classID = ?", (user, id)):
            status = row[0]
            break

        conn.close()

        if status == "" :
            addToSolvedCaller(id, user)
            joinClassroom(id, user)
    else:
        return 0;

    return 1;

def addToSolvedCaller(id, user):
    conn = sqlite3.connect('database.db')

    conn.row_factory = lambda cursor, row: row[0]
    cursor = conn.cursor()

    cursor.execute("SELECT lesson FROM solved WHERE user = ?", (id,));
    lessons = cursor.fetchall()

    for lesson in lessons:
        addToSolved(lesson, user)

    conn.close()
    return 0

def addToSolved(lesson, user):
    conn = sqlite3.connect('database.db')

    conn.execute("INSERT INTO solved(lesson, user, points, passed) \
    VALUES (?, ?, 0, 0)", (lesson, user));

    conn.commit()
    conn.close()
    return 0

def validateClass(name, key):
    conn = sqlite3.connect('database.db')
    id = 0

    for row in conn.execute("SELECT id from class WHERE name = ?", (name,)):
        id = row[0]
        break

    conn.close()
    return id

def validateClassByToken(name, admin):
    conn = sqlite3.connect('database.db')
    id = 0

    for row in conn.execute("SELECT id FROM class WHERE name = ? AND admin = ?", (name, admin)):
        id = row[0]
        break

    conn.close()
    return id

def joinClassroom(id, user):
    conn = sqlite3.connect('database.db')

    conn.execute("INSERT INTO classroom (classID, user, role) \
    VALUES (?, ?, ?)", (id, user, "For Student"));

    conn.commit()
    conn.close()
    return 1

def loadStudents(option):
    conn = sqlite3.connect('database.db')
    id = ""

    for i in conn.execute("SELECT id FROM class WHERE name=?",(option,)):
        id = i[0]
        break

    conn.row_factory = lambda cursor, row: row[0]
    cursor = conn.cursor()

    cursor.execute("SELECT user FROM classroom WHERE classID = ?", (id,))
    names = cursor.fetchall()
    data_row = len(names)

    # points = []
    # for d in range(data_row):
    #     points.append(sumPoints(names[d]))
    #
    # passed = []
    # for d in range(data_row):
    #     passed.append(sumPassed(names[d]))

    cursor.execute("SELECT lesson FROM solved WHERE user = ?",(id,))
    courses = cursor.fetchall()

    data_width = len(courses)

    points = []
    list

    # for i in range(3):
    #     for j in range(3):
    #         print(i*3+j)

    for i in range(data_row):
        for j in range(data_width):
            cursor.execute("SELECT points FROM solved WHERE user = ? AND lesson = ?", (names[i], courses[j]))
            k = cursor.fetchone()

            points.append({'name': names[i], 'lesson': courses[j], 'points': k})


    data = {
    "names": names,
    "courses": courses,
    "points": points
    # "passed": passed,
    # "maxPoints": 45,
    # "maxPassed": 7
    }

    print(data)

    return data

def loadClassrooms(admin):
    conn = sqlite3.connect('database.db')
    conn.row_factory = lambda cursor, row: row[0]
    cursor = conn.cursor()

    cursor.execute("SELECT name FROM class WHERE admin = ?", (admin,))
    data = cursor.fetchall()

    return data

def loadClassroomsStudent(student):
    conn = sqlite3.connect('database.db')
    conn.row_factory = lambda cursor, row: row[0]
    cursor = conn.cursor()

    cursor.execute("""SELECT name
    FROM class
    INNER JOIN classroom
    ON classroom.classID = class.id
    WHERE classroom.user = ?""", (student,))

    data = cursor.fetchall()

    return data

def loadClasses(classes):
    conn = sqlite3.connect('database.db')

    conn.row_factory = lambda cursor, row: row[0]
    cursor = conn.cursor()

    cursor.execute("""SELECT lesson
    FROM solved
    INNER JOIN class
    ON solved.user = class.id
    WHERE class.name = ?""", (classes,))
    courses = cursor.fetchall()
    return courses

def sumPoints(user):
    conn = sqlite3.connect('database.db')

    for row in conn.execute("SELECT SUM(points) from solved where user = ?", (user,)):
        sum = row[0]

    conn.close()
    return sum

def sumPassed(user):
    conn = sqlite3.connect('database.db')

    for row in conn.execute("SELECT SUM(passed) from solved where user = ?", (user,)):
        sum = row[0]

    conn.close()
    return sum

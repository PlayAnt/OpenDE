#This file shall contain all the server​ side remote procedures, implemented using Python and Flask.
import json
import database_helper
from uuid import uuid4
# from flask import Flask
from flask import Flask , request, jsonify
from gevent.pywsgi import WSGIServer
from geventwebsocket.handler import WebSocketHandler
from flask_bcrypt import Bcrypt
import smtplib
import imghdr
from email.message import EmailMessage

# req( hash(payload + token), email, payload) ->
# gunicorn==20.0.4
# web: python server.py


socks = [{'email' : 'Trashmail', 'socket' : 0}]

app = Flask(__name__)
bcrypt = Bcrypt(app)

@app.route('/')
def home1():
    return app.send_static_file('home.html')

@app.route('/home', methods=['GET'])
def home():
    return app.send_static_file("home.html")

@app.route('/passwordRecovery/<email>/<token>', methods=['GET'])
def passwordRecovery(email, token):
    database_helper.setToken(token, email)
    return app.send_static_file("passwordRecovery.html")

@app.route('/testing', methods=['GET'])
def testing():
    return app.send_static_file("testing.html")

@app.route('/testing2', methods=['GET'])
def testing2():
    return app.send_static_file("testing2.html")

@app.route('/accountSetUp', methods=['GET'])
def accountSetUp():
    return app.send_static_file("accountSetUp.html")

@app.route('/classroomSetup', methods=['GET'])
def classroomSetup():
    return app.send_static_file("classroomSetup.html")

@app.route('/classroom', methods=['GET'])
def classroom():
    return app.send_static_file("classroom.html")

@app.route('/school', methods=['GET'])
def school():
    return app.send_static_file("school.html")

@app.route('/index', methods=['GET'])
def index():
    return app.send_static_file("index.html")

@app.route('/binary/introduction', methods=['GET'])
def binaryintroduction():
    return app.send_static_file("introductionToBinary.html")

@app.route('/binary/bytesandwords', methods=['GET'])
def bytesandwords():
    return app.send_static_file("bytesAndWords.html")

@app.route('/binary/shifting', methods=['GET'])
def shifting():
    return app.send_static_file("shifting.html")

@app.route('/binary/signed', methods=['GET'])
def signed():
    return app.send_static_file("signed.html")

@app.route('/binary/ones', methods=['GET'])
def ones():
    return app.send_static_file("ones.html")

@app.route('/binary/twos', methods=['GET'])
def twos():
    return app.send_static_file("twos.html")

@app.route('/binary/summary', methods=['GET'])
def binarysummary():
    return app.send_static_file("binarysummary.html")

@app.route('/hexadecimal/introduction', methods=['GET'])
def hexadecimalintroduction():
    return app.send_static_file("introductionToHexadecimals.html")

@app.route('/hexadecimal/conversion', methods=['GET'])
def hexaConversion():
    return app.send_static_file("binaryToDecimalConversion.html")

@app.route('/gates/and', methods=['GET'])
def AND_page():
    return app.send_static_file("AND.html")

@app.route('/gates/nand', methods=['GET'])
def NAND_page():
    return app.send_static_file("NAND.html")

@app.route('/gates/xor', methods=['GET'])
def XOR_page():
    return app.send_static_file("XOR.html")

@app.route('/boolean/introduction', methods=['GET'])
def boolean_page():
    return app.send_static_file("boolean.html")

@app.route('/boom', methods=['GET'])
def booms():
    print(socks)
    return "0"

@app.route('/socket', methods=['GET'])
def sockets():
    print(request.environ.get('wsgi.websocket'))
    if request.environ.get('wsgi.websocket'):
        ws = request.environ['wsgi.websocket']
        message = ws.receive()
        email = database_helper.tokenToEmail(message)
        if email != 0:
            bool = True
            for x in socks:
                if x['email'] == email:
                    x['socket'] = ws
                    bool = False
                    break
            if bool:
                a = {
                "email" : email,
                "socket": ws
                }
                socks.append(a.copy())
                print("Appended into Socks")
        else:
            print("Failed to find email")
    else:
        print("Failed to find Websocket")

    while True:
        try:
            response = ws.receive()
        except Exception as E:
            print(E)
            return "0"
    return "0"
    #
    # while True:
    #     try:
    #         response = ws.receive()
    #     except:
    #         print("I die :(")
    #         return "0"
    # return "0"

@app.route('/signin', methods=['POST'])
def sign_in():
    credentials = request.get_json()
    hash = bcrypt.check_password_hash(database_helper.getHash(credentials['email'], credentials['accountType']), credentials['password'])

    if hash and database_helper.validateEmail(credentials['email'], credentials['accountType']):
        i = 0
        for x in socks:
            if x['email'] == credentials['email']:
                x['socket'].send("logout")
                x['socket'].close()
                socks.pop(i)
                break
            i += 1

        database_helper.setLoggedIn(credentials['email'])
        token = uuid4().hex

        database_helper.setToken(token, credentials['email'])

        return jsonify({"success": "true", "message": "Successfully signed in.", "token": token})

    return jsonify({"success": "false", "message": "Wrong username or password." })

@app.route('/recoverPassword', methods=['POST'])
def recoverPassword():
    info = request.get_json()
    if database_helper.validateEmail(info['email'], info['accountType']):
        token = database_helper.recoverPassword(info['email'], info['accountType'])
        database_helper.setToken(info['email'], info['accountType'])

        EMAIL_ADDRESS = "margus058@gmail.com"
        EMAIL_PASSWORD = "qcuiayirgpbbscjs"

        msg = EmailMessage()
        msg['Subject'] = 'Password Recovery'
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = info['email']

        msg.set_content('Click on the link to recover password: http://127.0.0.1:8000/passwordRecovery/' + info['email'] + '/' + token)
        # msg-add_alternative("""
        # <!DOCTYPE html >""")

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)


        return jsonify({"success": "true", "message": "Successfully signed in." })

    return jsonify({"success": "false", "message": "Wrong username and/or type." })

@app.route('/addusertocourse', methods=['POST'])
def course():
    token = request.headers['authorization'][7:]
    user = database_helper.selectUser(token)
    course = request.get_json()

    database_helper.addUserToCourse(user, course)

    return jsonify({"success": "true", "message": "User added to course."})

@app.route('/addCourseToClass', methods=['POST'])
def addCourseToClass():
    token = request.headers['authorization'][7:]
    admin = database_helper.selectUser(token)
    data = request.get_json()

    database_helper.addCourseToClass(data, admin)

    return jsonify({"success": "true", "message": "User added to course."})

@app.route('/createClass', methods=['POST'])
def createClass():
    token = request.headers['authorization'][7:]

    data = request.get_json()

    key  = bcrypt.generate_password_hash(data['key'])
    admin = database_helper.tokenToEmail(token)

    status = database_helper.createClass(data['name'], key, admin)

    if status == 1:
        return jsonify({"success": "true", "message": "Class created."})
    else:
        return jsonify({"success": "false", "message": "Class not created."})

@app.route('/joinClass/<name>/<key>', methods=['GET'])
def joinClass(name, key):
    token = request.headers['authorization'][7:]
    user = database_helper.tokenToEmail(token)

    hash = bcrypt.check_password_hash(database_helper.getHashClass(name), key)

    if hash and database_helper.joinClass(name, hash, user):
        return jsonify({"success": "true", "message": "Class Joined."})
    else:
        return jsonify({"success": "false", "message": "Class not joined."})

@app.route('/signup', methods=['POST'])
def sign_up():
    print("Server")
    user = request.get_json()

    if (user['accountType']=="Choose..."):
        return jsonify({"success": "false", "message": "Invalid Account Type"})

    if not database_helper.validateEmail(user['email'], user['accountType']):
        if 'email' in user and \
        'password' in user and \
        'accountType' in user:
            pw_hash = bcrypt.generate_password_hash(user['password'])
            user['password'] = pw_hash
            database_helper.createUser(user);
            print("created user")
            return jsonify({"success": "true", "message": "Successfully created a new user."})

        else:
            print("form missing data")
            return jsonify({"success": "false", "message": "Form data missing or incorrect type."})

    else:
        print("user already exists")
        return jsonify({"success": "false", "message": "User already exists."})

@app.route('/signout', methods=['GET'])
def sign_out():
    print("/signout")
    token = request.headers.get('Authorization')[7:]

    if database_helper.validateToken(token):
        email = database_helper.tokenToEmail(token)
        i=0
        for x in socks:
            if x['email'] == email:
                x['socket'].close()
                socks.pop(i)
                break
            i += 1
        database_helper.setLoggedOut(token)
        return jsonify({"success": "true", "message": "Successfully signed out." })
    else:
        return jsonify({"success": "false", "message": "You are not signed in." })

@app.route('/getQuestion', methods=['POST'])
def getQuestion():
    req = request.get_json()
    data = database_helper.getQuestion(req['subchapter'])
    return jsonify({"success": "true" , "message": data})

@app.route('/getGatesQuestion', methods=['POST'])
def getGatesQuestion():
    req = request.get_json()
    data = database_helper.getGatesQuestion(req['subchapter'])
    return jsonify({"success": "true" , "message": data})

@app.route('/getKarnaughQuestion', methods=['POST'])
def getKarnaughQuestion():
    req = request.get_json()
    data = database_helper.getKarnaughQuestion(req['subchapter'])
    question = data['question']

    table = str.split(data['answer'])
    for index, value in enumerate(table):
        if int(value, 16) > 0:
            table[index] = 1

    return jsonify({"success": "true" , "question": question, "table": table})

@app.route('/pointsReq/<subchapter>', methods=['GET'])
def pointsReq(subchapter):
    req = request.get_json()
    data = database_helper.pointsReq(subchapter)

    if data != 0:
        return jsonify({"success": "true" , "message": data})
    else:
        print("failure")
        return jsonify({"success": "false", "message": "subchapter not found"})

@app.route('/checkAnswer', methods=['POST'])
def checkAnswer():
    req = request.get_json()
    status = database_helper.checkAnswer(req['subchapter'], req['question'], req['answer'])

    if status == 1:
        return ({"success": "true", "message": "correct answer"})
    else:
        return ({"success": "false", "message": "wrong answer"})

@app.route('/checkGatesAnswer', methods=['POST'])
def checkGatesAnswer():
    req = request.get_json()
    status = database_helper.checkGatesAnswer(req['subchapter'], req['question'], req['answer'], req['circuits'], req['truthTable'])

    if status == 1:
        return ({"success": "true", "message": "correct answer"})
    else:
        return ({"success": "false", "message": "wrong answer"})

@app.route('/checkKarnaughAnswer', methods=['POST'])
def checkKarnaughAnswer():
    req = request.get_json()
    status = database_helper.checkKarnaughAnswer(req['subchapter'], req['question'], req['answer'])

    if status == 1:
        return ({"success": "true", "message": "correct answer"})
    else:
        return ({"success": "false", "message": "wrong answer"})

@app.route('/addPoint/<subchapter>', methods=['GET'])
def addPoint(subchapter):
    token = request.headers['authorization'][7:]
    user = database_helper.selectUser(token)
    data = database_helper.addPoint(subchapter, user)

    if data == 0:
        return jsonify({"success": "true" , "message": "Point added"})
    else:
        return jsonify({"success": "false", "message": "Point not added, something whent wrong"})

@app.route('/subtractPoint/<subchapter>', methods=['GET'])
def subtractPoint(subchapter):
    token = request.headers['authorization'][7:]
    user = database_helper.selectUser(token)
    data = database_helper.subtractPoint(subchapter, user)

    if data == 0:
        return jsonify({"success": "true" , "message": "Point subtracted"})
    else:
        return jsonify({"success": "false", "message": "Point not subtracted, something whent wrong"})

@app.route('/readPoints/<subchapter>', methods=['GET'])
def readPoints(subchapter):
    token = request.headers['authorization'][7:]
    user = database_helper.selectUser(token)
    points = database_helper.readPoints(subchapter, user)


    if points != -1:
        return jsonify({"success": "true" , "message": "Point subtracted", "points": points})
    else:
        return jsonify({"success": "false", "message": "Point not subtracted, something whent wrong", "points": points})

@app.route('/controlGrade/<subchapter>', methods=['GET'])
def controlGrade(subchapter):
    token = request.headers['authorization'][7:]
    user = database_helper.selectUser(token)
    passed = database_helper.controlGrade(subchapter, user)

    if passed == 1:
        return jsonify({"success": "true" , "message": "Subchapter passed"})
    else:
        return jsonify({"success": "false", "message": "More points required"})


@app.route('/loadSetUp/<subchapter>', methods=['GET'])
def loadSetUp(subchapter):
    token = request.headers['authorization'][7:]
    user = database_helper.selectUser(token)
    enlisted = database_helper.checkEnlisted(subchapter, user)

    if enlisted == 1:
        return jsonify({"success": "true" , "message": "Enlisted"})
    else:
        return jsonify({"success": "false", "message": "Not Enlisted"})

@app.route('/checkGrade/<subchapter>', methods=['GET'])
def checkGrade(subchapter):
    token = request.headers['authorization'][7:]
    user = database_helper.selectUser(token)
    grade = database_helper.checkGrade(subchapter, user)

    if grade == 1:
        return jsonify({"success": "true" , "message": "Passed"})
    else:
        return jsonify({"success": "false", "message": "Not Passed"})

@app.route('/changePassword', methods=['POST'])
def changePassword():
    token = request.headers['authorization'][7:]
    req = request.get_json()

    key  = bcrypt.generate_password_hash(req['password'])

    if database_helper.validateToken(token):
        database_helper.replacePassword(token, key)
        return jsonify({"success": "true", "message": "Password Changed." })
    else:
        return jsonify({"success": "false", "message": "Wrong Token." })

@app.route('/getUserDataByToken', methods=['GET'])
def get_user_data_by_token():
    token = request.headers.get('Authorization')[7:]
    data = database_helper.selectUser(token)

    if data != -1:
        return jsonify({"success": "true", "message": "User data retrieved.", "data": data})
    else: #data == -1
        return jsonify({"success": "false", "message": "You are not signed in." })

@app.route('/getUserDataByEmail/<email>', methods=['GET'])
def get_user_data_by_email(email):
    token = request.headers['authorization'][7:]
    data = database_helper.selectUserByEmail(token, email)

    if data != 0 and data != -1:
        return jsonify({"success": "true", "message": "User data retrieved.", "data": data})
    elif data == 0:
        return jsonify({"success": "false", "message": "No such user."})
    else: #data == -1
        return jsonify({"success": "false", "message": "You are not signed in." })

    return "Failed to find user by Email"

@app.route('/loadStudents/<option>', methods=['GET'])
def loadStudents(option):
    token = request.headers['authorization'][7:]
    admin = database_helper.tokenToEmail(token)

    if admin != 0:
        data = database_helper.loadStudents(option);
        # print(data)
        return jsonify({"success": "true", "message": "Students loaded.", "data": data})
    else:
        print("failure")
        return jsonify({"success": "false", "message": "You are not signed in." })

    return "Failed to find user by Token"

@app.route('/loadClasses/<classes>', methods=['GET'])
def loadClasses(classes):
    token = request.headers['authorization'][7:]
    user = database_helper.tokenToEmail(token)
    links = []

    if user != 0:
        names = database_helper.loadClasses(classes)
        for entry in range(len(names)):
            links.append(database_helper.getLink(names[entry]))
        print(names)
        print(links)
        return jsonify({"success": "true", "message": "Classes loaded.", "names": names, "links": links})
    else:
        print("failure")
        return jsonify({"success": "false", "message": "You are not signed in." })

    return "Failed to find user by Token"

@app.route('/loadClassrooms/', methods=['GET'])
def loadClassrooms():
    token = request.headers['authorization'][7:]
    admin = database_helper.tokenToEmail(token)

    if admin != 0:
        data = database_helper.loadClassrooms(admin);
        return jsonify({"success": "true", "message": "Classrooms Loaded.", "data": data})
    else:
        print("failure")
        return jsonify({"success": "false", "message": "You are not signed in." })

    return "Failed to find user by Token"

@app.route('/loadClassroomsStudent/', methods=['GET'])
def loadClassroomsStudent():
    token = request.headers['authorization'][7:]
    student = database_helper.tokenToEmail(token)

    if student != 0:
        data = database_helper.loadClassroomsStudent(student);
        return jsonify({"success": "true", "message": "Classrooms Loaded.", "data": data})
    else:
        print("failure")
        return jsonify({"success": "false", "message": "You are not signed in." })

    return "Failed to find user by Token"

if __name__ == '__main__':
    http_server = WSGIServer(('127.0.0.1', 8080), app, handler_class = WebSocketHandler)
    http_server.serve_forever()
    # app.run()
    app.run(debug=True)


    # app.debug = True

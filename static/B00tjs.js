// window.onload = function(){
//   if(sessionStorage.getItem('token') != null){
//     var exampleSocket = new WebSocket("ws://127.0.0.1:8080/socket");
//     //var exampleSocket = new WebSocket("wss://twidder789.herokuapp.com/socket");
//     exampleSocket.onopen = function (event) {
//       console.log("Opened Socket!");
//       exampleSocket.send(sessionStorage.getItem('token'));
//     };
//
//     exampleSocket.onmessage = function (event) {
//       console.log("Message Received!", event.data);
//       forcedSignOut();
//     };
//
//     exampleSocket.onclose = function(event) {
//       console.log("Websocket Closed");
//     }
//   }
// };

function SignUpValidation(){
  var x = document.getElementById("signUpPassword");
  var y = document.getElementById("signUpPasswordRepeat");

  if(x.value != y.value) {
    alert("passwords dont match");
    return 0;
  }

  var userdata = {
    email: document.getElementById('signUpEmail').value,
    password: y.value,
    accountType: document.getElementById('signUpAccountType').value
  };


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/signup');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return 0;
      }
      if(returned.success == "true"){
        window.location.href = '/home';
        return 1;
      }
    }
  }

  xmlhttp.send(JSON.stringify({
    "email": userdata.email,
    "password": userdata.password,
    "accountType": userdata.accountType,
  }));

  return 0;
};

function home(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/');
  xmlhttp.send();
  return 0;
};

function accountSetUp(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/accountSetUp');
  xmlhttp.send();
  return 0;
};

function index(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/index');
  xmlhttp.send();
  return 0;
};

function binary(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/binary');
  xmlhttp.send();
  return 0;
};

function shifting(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/binary/shifting');
  xmlhttp.send();
  return 0;
};

function SignInValidation(){
  email = document.getElementById("signInEmail").value;
  password = document.getElementById("signInPassword").value;
  type = document.getElementById("signInType").value;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/signin');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        alert("Wrong username, password or account type.")
        return 0;
      }
      if(returned.success == "true"){

        sessionStorage.setItem('token', returned.token)
        if(type == "For Teacher"){
          window.location.href = '/classroom';
        } else if (type == "For Student") {
          window.location.href = '/school';
        } else {
          window.location.href = '/index';
        }

        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"email": email, "password": password, "accountType": type}));
  return 0;
};

function recoverPassword(){
  email = document.getElementById("recoverByEmail").value;
  type = document.getElementById("recoverType").value;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/recoverPassword', false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText);
      if(returned.success == "false"){
        alert("Such user does not exist. Please verify that you have spelled your email adress correctly and that you have entered the appropriate account type?");
        return 0;
      }
      if(returned.success == "true"){
        alert("Email has been sent.");
        // window.location.href = '/passwordRecovery';
        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"email": email, "accountType": type}));
  return 0;
};

function tokenFixer(){
  var array = window.location.href.split("/");
  sessionStorage.setItem('token', array[5])
  return 0;
};

function changePassword(){
  var pwd = document.getElementById("resetPassword").value;
  var pwdc = document.getElementById("resetPasswordConfirm").value;


  if(pwd != pwdc) {
    alert("Passwords doesn't match!");
    return 0;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/changePassword', false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  // alert("onreadystatechange")
  // alert("readystate 4 status 200")
  // alert("returned")
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText);
      if(returned.success == "false"){
        alert("Are you a bad hacker or a slowpoke?");
        return 0;
      }
      if(returned.success == "true"){
        alert("Changed password, log in to preceed.");
        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"password": pwd}));
  return 0;
};

function index(){
  window.location.href='index';
  return 0
};

function forcedSignOut(){
  //  if (sessionStorage.getItem('token') != null){
  alert("forcedSignOut");
  window.location.href = '/home';
  sessionStorage.clear();
  return 0;
};

function signOutValidation(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/signout');
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return 0;
      }
      if(returned.success == "true"){
        sessionStorage.clear();
        window.location.href = '/home'
        return 1;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function addUserToCourses(){
  var binary = "false";
  var hexadecimal = "false";
  var simpleLogicGates = "false";
  var booleanAndKarnaugh = "false";

  if(document.getElementById("checkbox1").checked){
    binary = "true";
  }

  if(document.getElementById("checkbox2").checked){
    hexadecimal = "true";
  }

  if(document.getElementById("checkbox3").checked){
    simpleLogicGates = "true";
  }

  if(document.getElementById("checkbox4").checked){
    booleanAndKarnaugh = "true";
  }

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("POST", '/addusertocourse');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.send(JSON.stringify({
    "binary": binary,
    "hexadecimal": hexadecimal,
    "simpleLogicGates": simpleLogicGates,
    "booleanAndKarnaugh": booleanAndKarnaugh
  }));

  location.reload();
  return 1;
};

function addCourseToClass(){
  var binary = "false";
  var hexadecimal = "false";
  var simpleLogicGates = "false";
  var booleanAndKarnaugh = "false";
  var name = document.getElementById("selectClassroom").value;


  if(document.getElementById("checkbox1").checked){
    binary = "true";
  }

  if(document.getElementById("checkbox2").checked){
    hexadecimal = "true";
  }

  if(document.getElementById("checkbox3").checked){
    simpleLogicGates = "true";
  }

  if(document.getElementById("checkbox4").checked){
    booleanAndKarnaugh = "true";
  }

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("POST", '/addCourseToClass');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.send(JSON.stringify({
    "name": name,
    "binary": binary,
    "hexadecimal": hexadecimal,
    "simpleLogicGates": simpleLogicGates,
    "booleanAndKarnaugh": booleanAndKarnaugh,
  }));

  location.reload();
  return 1;
};

function pointsReq(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/pointsReq/' + subchapter);
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return -1;
      }
      if(returned.success == "true"){
        document.getElementById("pointsReq").innerHTML = returned.message;
        return 0;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function loadQuestion(subchapter){
  document.getElementById("startButton").remove();
  document.getElementById("exerciseBlock").style.visibility = "visible";
  document.getElementById("pointsReq").innerHTML = pointsReq(subchapter);

  changeQuestion(subchapter);
  return 0;
};

function changeQuestion(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/getQuestion', false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        //WADDUP
        return 0;
      }
      if(returned.success == "true"){
        document.getElementById('shiftingQuestion').innerHTML = returned.message;
        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"subchapter": subchapter}));
  return 0;
};

function loadGatesQuestion(subchapter){
  document.getElementById("startButton").remove();
  document.getElementById("exerciseBlock").style.visibility = "visible";
  document.getElementById("pointsReq").innerHTML = pointsReq(subchapter);

  changeGatesQuestion(subchapter);
  return 0;
};

function changeGatesQuestion(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/getGatesQuestion', false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return 0;
      }
      if(returned.success == "true"){
        document.getElementById("question").innerHTML = returned.message['question'];
        var images = returned.message['circuits'].split(" ");
        document.getElementById('A').src = images[0];
        document.getElementById('B').src = images[1];
        document.getElementById('C').src = images[2];
        document.getElementById('D').src = images[3];
        document.getElementById("truthTable").src = returned.message['truthTable'];

        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"subchapter": subchapter}));
  return 0;
};

function loadKarnaughQuestion(subchapter){
  document.getElementById("startButton").remove();
  document.getElementById("exerciseBlock").style.visibility = "visible";
  document.getElementById("pointsReq").innerHTML = pointsReq(subchapter);

  changeKarnaughQuestion(subchapter);
  return 0;
};

function changeKarnaughQuestion(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/getKarnaughQuestion', false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return 0;
      }
      if(returned.success == "true"){
        karnaughReset();
        var question = returned.question.split(":");

        document.getElementById("question").innerHTML = question[0] + ":" + question[1];

        var squares = [
          "oneA", "oneB", "oneC", "oneD",
          "twoA", "twoB", "twoC", "twoD",
          "threeA", "threeB", "threeC", "threeD",
          "fourA", "fourB", "fourC", "fourD"
        ];

        for (var i = 0; i < squares.length; i++) {

          // if(returned.table[i] == 1){
          //   document.getElementById(squares[i]).src = "/static/images/questions/1.png";
          // } else {
          //   document.getElementById(squares[i]).src = "/static/images/questions/0.png";
          // }
          document.getElementById(squares[i]).src = "/static/images/questions/0.png";

        }

        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"subchapter": subchapter}));
  return 0;
};

function checkAnswer(subchapter){
  document.getElementById("answerButton").style.color = "black";

  var question= document.getElementById("shiftingQuestion").innerHTML;
  var answer= document.getElementById("shiftingAnswerField").value;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/checkAnswer', false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        document.getElementById("answerButton").style.color = "red";
        subtractPoint(subchapter);
        readPoints(subchapter);
        return 0;
      }
      if(returned.success == "true"){
        document.getElementById("answerButton").style.color = "green";
        document.getElementById("shiftingAnswerField").value = "";
        changeQuestion(subchapter);
        document.getElementById("answerButton").style.color = "black";
        addPoint(subchapter);
        readPoints(subchapter);
        controlGrade(subchapter);
        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"subchapter": subchapter, "question": question, "answer": answer}));
  return 0;
};

function checkGatesAnswer(subchapter, answer){
  var question= document.getElementById("question").innerHTML;

  document.getElementById(answer).style.borderColor  = "green";
  a = document.getElementById('A').src.split("http://127.0.0.1:5000");
  b = document.getElementById('B').src.split("http://127.0.0.1:5000");
  c = document.getElementById('C').src.split("http://127.0.0.1:5000");
  d = document.getElementById('D').src.split("http://127.0.0.1:5000");
  circuits = a[1] + " " + b[1] + " " + c[1] + " " + d[1];

  truthTable = document.getElementById("truthTable").src.split("http://127.0.0.1:5000");
  truthTable = truthTable[1];

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/checkGatesAnswer', false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        document.getElementById(answer).style.backgroundColor  = "red";
        document.getElementById(answer).style.borderColor  = "red";

        subtractPoint(subchapter);
        readPoints(subchapter);

        setTimeout(() => {  document.getElementById(answer).style.backgroundColor  = "white"; document.getElementById(answer).style.borderColor  = "black"; }, 1000);
        return 0;
      }
      if(returned.success == "true"){
        document.getElementById(answer).style.backgroundColor  = "green";
        document.getElementById(answer).style.borderColor  = "green";


        changeGatesQuestion(subchapter);
        addPoint(subchapter);
        readPoints(subchapter);
        controlGrade(subchapter);

        setTimeout(() => {  document.getElementById(answer).style.backgroundColor  = "white"; document.getElementById(answer).style.borderColor  = "black"; }, 1000);
        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"subchapter": subchapter, "question": question, "answer": answer, "circuits": circuits, "truthTable": truthTable}));
  return 0;
};

function addPoint(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/addPoint/' + subchapter, false);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return -1;
      }
      if(returned.success == "true"){
        return 0;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function subtractPoint(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/subtractPoint/' + subchapter, false);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return -1;
      }
      if(returned.success == "true"){
        return 0;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function readPoints(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/readPoints/' + subchapter, false);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return -1;
      }
      if(returned.success == "true"){
        document.getElementById("pointsYour").innerHTML = returned.points;
        return 0;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function controlGrade(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/controlGrade/' + subchapter, false);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return 0;
      }
      if(returned.success == "true"){
        alert("You have passed this subchapter");
        return 1;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function loadSetUpCaller(){
  loadSetUp("Introduction to Binary");
  loadSetUp("Introduction to Hexadecimals");
  loadSetUp("AND, OR and NOT");
  loadSetUp("Introduction to Boolean Algebra and Karnaugh");
  return 0;
};

function loadSetUp(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/loadSetUp/' + subchapter);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return -1;
      }
      if(returned.success == "true"){
        // alert(subchapter)
        if (subchapter == "Introduction to Binary"){
          document.getElementById("checkbox1").checked=true;
          document.getElementById("checkbox1").disabled=true;
          return 1;

        } else if (subchapter == "Introduction to Hexadecimals"){
          document.getElementById("checkbox2").checked=true;
          document.getElementById("checkbox2").disabled=true;
          return 1;

        } else if (subchapter == "AND, OR and NOT"){
          document.getElementById("checkbox3").checked=true;
          document.getElementById("checkbox3").disabled=true;
          return 1;

        } else if (subchapter == "Introduction to Boolean Algebra and Karnaugh"){
          document.getElementById("checkbox4").checked=true;
          document.getElementById("checkbox4").disabled=true;
          return 1;

        } else {
          return 0;
        }
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function loadIndexCaller(){
  loadIndex("Introduction to Binary");
  loadIndex("Introduction to Hexadecimals");
  loadIndex("AND, OR and NOT");
  loadIndex("Introduction to Boolean Algebra and Karnaugh");

  return 0;
};

function loadIndex(subchapter){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/loadSetUp/' + subchapter);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return -1;
      }
      if(returned.success == "true"){
        if (subchapter == "Introduction to Binary"){
          // document.getElementById("binaryBlock").style.visibility="visible";
          document.getElementById("binaryBlock").style.display="block";
          return 1;

        } else if (subchapter == "Introduction to Hexadecimals"){
          // document.getElementById("hexaBlock").style.visibility="visible";
          document.getElementById("hexaBlock").style.display="block";
          return 1;

        } else if (subchapter == "AND, OR and NOT"){
          // document.getElementById("simpleLogicGatesBlock").style.visibility="visible";
          document.getElementById("simpleLogicGatesBlock").style.display="block";
          return 1;

        } else if (subchapter == "Introduction to Boolean Algebra and Karnaugh"){
          document.getElementById("booleanAndKarnaugh").style.visibility="visible";
          document.getElementById("booleanAndKarnaugh").style.display="block";
          return 1;

        } else {
          return 0;
        }
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function checkGradesCaller(){
  checkGrade("Introduction to Binary", "binInt");
  checkGrade("Shifting and Fractions", "binShi");
  checkGrade("Signed", "binSig");
  checkGrade("Ones Complement", "binOne");
  checkGrade("Twos Complement", "binTwo");
  checkGrade("Binary Summary", "binSum");

  checkGrade("Introduction to Hexadecimals", "hexInt");

  checkGrade("AND, OR and NOT", "SLGAnd");
  checkGrade("NAND and NOR", "SLGNand");
  checkGrade("XOR and XNOR", "SLGXor");

  checkGrade("Introduction to Boolean Algebra and Karnaugh", "BlnAKrng");
  return 0;
};

function checkGrade(subchapter, id){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/checkGrade/' + subchapter);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        return -1;
      }
      if(returned.success == "true"){
        displayGrade(id);
        return 1;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function displayGrade(innerhtml){
  document.getElementById(innerhtml).innerHTML = document.getElementById(innerhtml).innerHTML + "	&#10004;";
  document.getElementById(innerhtml).style.color = "green";
  return 0;
};

function createClass(){

  name = document.getElementById("name").value;
  key = document.getElementById("key").value;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/createClass');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        alert("failure")
        return 0;
      }
      if(returned.success == "true"){
        alert("success")
        window.location.href = '/classroom';
        return 1;
      }
    }
  }

  xmlhttp.send(JSON.stringify({
    "name": name,
    "key": key,
  }));

  return 0;
};

function joinClass(){
  name = document.getElementById("name").value;
  key = document.getElementById("key").value;

  var payload = {
    name: name,
    key: key
  };

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/joinClass/' + name + "/" + key, false);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        alert("failure");
        return -1;
      }
      if(returned.success == "true"){
        window.location.href = '/school';
        alert("success");
        return 1;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function loadStudents(option){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/loadStudents/' + option, false);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        alert("failure");
        return -1;
      }
      if(returned.success == "true"){
        document.getElementById("studentList").innerHTML = "";
        data=returned.data;

        for(var i = 0; i<=data.names.length; i++) {
          var row = document.getElementById("studentList").insertRow(i);

          if(i == 0){
            for(var j = 0; j<=data.courses.length; j++){
              var paragraph = document.createElement("th");
              var cell = row.insertCell(j);
              if(j == 0){
                paragraph.innerHTML = "Names";
              } else {
                paragraph.innerHTML = data.courses[j-1];
              }
              cell.appendChild(paragraph);
            }
          } else {
            for(var j = 0; j<=data.courses.length; j++){
              var paragraph = document.createElement("td");
              var cell = row.insertCell(j);
              if(j == 0){
                paragraph.innerHTML = data.names[i-1];
                cell.appendChild(paragraph);
              } else {
                paragraph.innerHTML = data.points[(i-1)*data.courses.length+(j-1)]['points'];
                cell.appendChild(paragraph);
                cell.setAttribute("align", "center");
              }
            }
          }
        }
        return 1;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function studentModal(student){
  alert(student);
  document.getElementById("studentModal").modal("show");
  // document.getElementById("studentModal").innerHTML = student;
  return 0;
};

function loadClassrooms(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/loadClassrooms/', false);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        alert("failure");
        return -1;
      }
      if(returned.success == "true"){
        data=returned.data;
        var option;

        for(var i = 0; i<data.length; i++) {
          option = document.createElement("option");
          option.setAttribute('value', data[i]);
          option.appendChild(document.createTextNode(data[i]));
          document.getElementById("selectClassroom").appendChild(option);
        }
        loadStudents(data[0]);
        return 1;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function loadClassroomsStudent(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/loadClassroomsStudent/');
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        alert("failure");
        return -1;
      }
      if(returned.success == "true"){
        data=returned.data;
        var option;

        for(var i = 0; i<data.length; i++) {
          option = document.createElement("option");
          // paragraph.setAttribute('href', "/student/" + data[i]);
          option.setAttribute('value', data[i]);
          option.appendChild(document.createTextNode(data[i]));
          document.getElementById("selectClassroom").appendChild(option);
        }
        loadClasses(data[0])
        return 1;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function loadClasses(classes){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/loadClasses/' + classes);
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        alert("failure");
        return -1;
      }
      if(returned.success == "true"){
        names=returned.names;
        links=returned.links;

        var paragraph;
        document.getElementById("classList").innerHTML = "<tr> <th> Classes </th> </tr>";

        for(var i = 0; i<names.length; i++) {
          paragraph = document.createElement("a");
          paragraph.innerHTML= names[i];
          paragraph.href = links[i];
          var row = document.getElementById("classList").insertRow(i+1);
          var cell1 = row.insertCell(0);
          cell1.appendChild(paragraph);
        }
        return 1;
      }
    }
  }
  xmlhttp.send();
  return 0;
};

function exportTableToExcel(tableID, filename = ''){
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xls';

  // Create download link element
  downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if(navigator.msSaveOrOpenBlob){
    var blob = new Blob(['\ufeff', tableHTML], {
      type: dataType
    });
    navigator.msSaveOrOpenBlob( blob, filename);
  }else{
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }
};

function loadTable(){
  document.getElementById("scriptorium").innerHTML = document.getElementById("scriptorium").innerHTML + "ctx.drawImage(img, buffer, buffer, width, height);";
};

function loadTable(classes){
  var inputs = "A B C D Y";
  var inputsParsed = inputs.split(" ");
  var paragraph;

  for(var i = 0; i<=16; i++) {
    var row = document.getElementById("table").insertRow(i);

    if(i == 0){
      for(var j = 0; j<inputsParsed.length; j++){
        var paragraph = document.createElement("th");
        var cell = row.insertCell(j);
        paragraph.innerHTML = inputsParsed[j];
        cell.appendChild(paragraph);
      }
    } else {
      for(var j = 0; j<inputsParsed.length; j++){
        var paragraph = document.createElement("td");
        var cell = row.insertCell(j);

        if(j == (inputsParsed.length-2)){
          if(i%2!=0){
            paragraph.innerHTML = "0";
          } else {
            paragraph.innerHTML = "1";
          }
        } else if (j == (inputsParsed.length -3)) {
          if(i%3!=0 | i%4!=0){
            paragraph.innerHTML = "0";
          } else {
            paragraph.innerHTML = "1";
          }
        } else {
          paragraph.innerHTML = "?";
        }

        cell.appendChild(paragraph);
      }
    }
  }
  return 1;
};

function alertalert(choice){
  document.getElementById(choice).src = "/static/images/AND_game.png";
  document.getElementById(choice).width = "250";
  document.getElementById(choice).height = "150";

  return 0;
};

function loadKarnaugh(){

  document.getElementById('oneA').src = "/static/images/questions/0.png";
  document.getElementById('oneB').src = "/static/images/questions/0.png";
  document.getElementById('oneC').src = "/static/images/questions/0.png";
  document.getElementById('oneD').src = "/static/images/questions/0.png";

  document.getElementById('twoA').src = "/static/images/questions/0.png";
  document.getElementById('twoB').src = "/static/images/questions/0.png";
  document.getElementById('twoC').src = "/static/images/questions/0.png";
  document.getElementById('twoD').src = "/static/images/questions/0.png";

  document.getElementById('threeA').src = "/static/images/questions/0.png";
  document.getElementById('threeB').src = "/static/images/questions/0.png";
  document.getElementById('threeC').src = "/static/images/questions/0.png";
  document.getElementById('threeD').src = "/static/images/questions/0.png";

  document.getElementById('fourA').src = "/static/images/questions/0.png";
  document.getElementById('fourB').src = "/static/images/questions/0.png";
  document.getElementById('fourC').src = "/static/images/questions/0.png";
  document.getElementById('fourD').src = "/static/images/questions/0.png";
  return 1;
};

function boggle(id){
  var rgb = document.getElementById(id).style.backgroundColor;

  rgb = rgb.replace(/[^\d,]/g, '').split(',');

  //Yellow
  if (document.getElementById(id).style.backgroundColor == "rgb(0, 255, 0)"){
    document.getElementById(id).style ="background-color: #FFFF00";
    document.getElementById(id).innerHTML = "Yellow";

    //Red
  } else if (document.getElementById(id).style.backgroundColor == "rgb(255, 255, 0)"){
    document.getElementById(id).style ="background-color: #FF0000";
    document.getElementById(id).innerHTML = "Red";

    //Blue
  } else if (document.getElementById(id).style.backgroundColor == "rgb(255, 0, 0)"){
    document.getElementById(id).style ="background-color: #0000FF";
    document.getElementById(id).innerHTML = "Blue";

    //Green
  } else {
    document.getElementById(id).style ="background-color: #00FF00";
    document.getElementById(id).innerHTML = "Green";
  }

  return 1;
};

var squares = [
  {id: "AA", pic: "oneA", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "AB", pic: "oneB", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "AC", pic: "oneC", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "AD", pic: "oneD", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "BA", pic: "twoA", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "BB", pic: "twoB", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "BC", pic: "twoC", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "BD", pic: "twoD", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "CA", pic: "threeA", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "CB", pic: "threeB", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "CC", pic: "threeC", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "CD", pic: "threeD", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "DA", pic: "fourA", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "DB", pic: "fourB", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "DC", pic: "fourC", green: 0, yellow: 0, red: 0, blue: 0},
  {id: "DD", pic: "fourD", green: 0, yellow: 0, red: 0, blue: 0}
];

function submitKarnaugh(subchapter){

  var str = "";
  var answer = "";

  for (var i = 0; i < squares.length; i++) {
    str = squares[i].green.toString() + squares[i].yellow.toString() + squares[i].red.toString() + squares[i].blue.toString();
    answer += parseInt(str, 2).toString(16).toUpperCase() + ' ';
  }

  var question= document.getElementById("question").innerHTML;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/checkKarnaughAnswer', false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        subtractPoint(subchapter);
        readPoints(subchapter);
        return 0;
      }
      if(returned.success == "true"){
        changeKarnaughQuestion(subchapter);
        addPoint(subchapter);
        readPoints(subchapter);
        controlGrade(subchapter);
        return 1;
      }
    }
  }
  xmlhttp.send(JSON.stringify({"subchapter": subchapter, "question": question, "answer": answer}));
  return 0;
};

function zeroOne(square){
  var str = square.green + square.yellow + square.red + square.blue;

  if(str > 0 ){
    document.getElementById(square.pic).src = "/static/images/questions/1.png";
  } else {
    document.getElementById(square.pic).src = "/static/images/questions/0.png";
  }


  return 0;
}


function mark(id){
  var number = 0;

  for (var i = 0; i < squares.length; i++) {
    if(squares[i].id == id){
      number = i;

      if(document.getElementById('colorButton').style.backgroundColor == "rgb(0, 255, 0)") {
        if(squares[i].green == 0){
          squares[i].green = 1;
          zeroOne(squares[i]);
        } else {
          squares[i].green = 0;
          zeroOne(squares[i]);
        }

      } else if (document.getElementById('colorButton').style.backgroundColor == "rgb(255, 255, 0)") {
        if(squares[i].yellow == 0){
          squares[i].yellow = 1;
          zeroOne(squares[i]);
        } else {
          squares[i].yellow = 0;
          zeroOne(squares[i]);
        }

      } else if (document.getElementById('colorButton').style.backgroundColor == "rgb(255, 0, 0)") {
        if(squares[i].red == 0){
          squares[i].red = 1;
          zeroOne(squares[i]);
        } else {
          squares[i].red = 0;
          zeroOne(squares[i]);
        }

      } else if (document.getElementById('colorButton').style.backgroundColor == "rgb(0, 0, 255)") {
        if(squares[i].blue == 0){
          squares[i].blue = 1;
          zeroOne(squares[i]);
        } else {
          squares[i].blue = 0;
          zeroOne(squares[i]);
        }
      }
    }
  }

  var averageDivider = squares[number].green + squares[number].yellow + squares[number].red + squares[number].blue;

  var r = 0;
  var g = 0;
  var b = 0;

  if(squares[number].green == 1){ g += 255; }
  if(squares[number].yellow == 1){ r += 255; g += 255; }
  if(squares[number].red == 1){ r += 255; }
  if(squares[number].blue == 1){ b += 255; }

  r = r/averageDivider;
  g = g/averageDivider;
  b = b/averageDivider;

  document.getElementById(squares[number].id).style ="background-color: #" + toHex(Math.floor(r)) + toHex(Math.floor(g)) + toHex(Math.floor(b));

  return 1;
};



function karnaughReset(){

  for (var i = 0; i < squares.length; i++) {
    squares[i].green = 0;
    squares[i].yellow = 0;
    squares[i].red = 0;
    squares[i].blue = 0;

    document.getElementById(squares[i].id).style ="background-color: #FFFFFF";
  }
};

function toHex(d) {
  return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
};

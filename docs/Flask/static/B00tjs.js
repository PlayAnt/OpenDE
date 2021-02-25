window.onload = function(){
  if(sessionStorage.getItem('token') != null){
    var exampleSocket = new WebSocket("ws://127.0.0.1:5000/socket");
    //var exampleSocket = new WebSocket("wss://twidder789.herokuapp.com/socket");
    exampleSocket.onopen = function (event) {
      console.log("Opened Socket!");
      exampleSocket.send(sessionStorage.getItem('token'));
    };

    exampleSocket.onmessage = function (event) {
      console.log("Message Received!", event.data);
      forcedSignOut();
    };

    exampleSocket.onclose = function(event) {
      console.log("Websocket Closed");
    }
  }
};

function SignUpValidation(){
  var x = document.getElementById("signUpPassword");
  var y = document.getElementById("signUpPasswordRepeat");

  if(x.value != y.value) {
    alert("passwords dont match");
    return 0;
  }

  // x = the choice of selected gender in a string

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
        // document.getElementById("ErrorSignup").innerHTML = "<font size='2' color ='red'>" + returned.message + "</font>";
        return 0;
      }
      if(returned.success == "true"){
        window.location.href = '/home';

        // document.getElementById("view1").innerHTML = document.getElementById("accountsetupview").innerHTML;
        // document.getElementById("ErrorSignup").innerHTML = "<font size='2' color ='green'>" + returned.message + "</font>";
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
}

function accountSetUp(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/accountSetUp');
  xmlhttp.send();
  return 0;
}

function index(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/index');
  xmlhttp.send();
  return 0;
}
function binary(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/binary');
  xmlhttp.send();
  return 0;
}

function shifting(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/binary/shifting');
  xmlhttp.send();
  return 0;
}

function SignInValidation(){
  email = document.getElementById("signInEmail").value,
  password = document.getElementById("signInPassword").value,
  type = document.getElementById("signInType").value

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", '/signin');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
      var returned = JSON.parse(this.responseText)
      if(returned.success == "false"){
        // document.getElementById("ErrorSignin").innerHTML = "<font size='2' color ='red'>" + returned.message + "</font>";
        return 0;
      }
      if(returned.success == "true"){
        var exampleSocket = new WebSocket("ws://127.0.0.1:5000/socket");
        //var exampleSocket = new WebSocket("wss://twidder789.herokuapp.com/socket");

        exampleSocket.onopen = function (event) {
          console.log("Opened Socket!");
          exampleSocket.send(returned.token);
        };

        exampleSocket.onmessage = function (event) {
          console.log("Message Received!", event.data);
          forcedSignOut();
        };

        exampleSocket.onclose = function(event) {
          console.log("Websocket Closed");
        }

        sessionStorage.setItem('token', returned.token)
        if(type == "For Teacher"){
          window.location.href = '/classroom'
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

function index(){
  window.location.href='index';
  return 0
}

function forcedSignOut(){
  //  if (sessionStorage.getItem('token') != null){
  alert("forcedSignOut");
  window.location.href = '/home';
  sessionStorage.clear();
  return 0;
  // }
  // else{
  //   return 0;
  // }
}

function signOutValidation(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", '/signout');
  // xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
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
}

function addUserToCourses(){
  var binary = "false";
  var hexadecimal = "false";
  var simpleLogicGates = "false";


  if(document.getElementById("checkbox1").checked){
    binary = "true";
  }

  if(document.getElementById("checkbox2").checked){
    hexadecimal = "true";
  }

  if(document.getElementById("checkbox3").checked){
    simpleLogicGates = "true";
  }

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("POST", '/addusertocourse');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

  xmlhttp.send(JSON.stringify({
    "binary": binary,
    "hexadecimal": hexadecimal,
    "simpleLogicGates": simpleLogicGates}));

    location.reload();
    return 1;
  }

  function addCourseToClass(){
    var binary = "false";
    var hexadecimal = "false";
    var simpleLogicGates = "false";
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

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", '/addCourseToClass');
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem('token'));

    xmlhttp.send(JSON.stringify({
      "name": name,
      "binary": binary,
      "hexadecimal": hexadecimal,
      "simpleLogicGates": simpleLogicGates}));

      location.reload();
      return 1;
    }

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
    }

    function loadQuestion(subchapter){
      document.getElementById("startButton").remove();
      document.getElementById("exerciseBlock").style.visibility = "visible";
      document.getElementById("pointsReq").innerHTML = pointsReq(subchapter);

      changeQuestion(subchapter);
      return 0;
    }

    function changeQuestion(subchapter){
      // document.getElementById(questions[Math.floor(Math.random()*questions.length)]).innerHTML;
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
    }

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

            document.getElementById("pointsYour").innerHTML = readPoints(subchapter);

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
    }

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
    }

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
    }

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
    }

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
    }

    function loadSetUpCaller(){
      loadSetUp("Introduction to Binary");
      loadSetUp("Introduction to Hexadecimals");
      loadSetUp("Introduction to Simple Logic Gates");
      return 0;
    }

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
            if (subchapter == "Introduction to Binary"){
              document.getElementById("checkbox1").checked=true;
              document.getElementById("checkbox1").disabled=true;
              return 1;

            } else if (subchapter == "Introduction to Hexadecimals"){
              document.getElementById("checkbox2").checked=true;
              document.getElementById("checkbox2").disabled=true;
              return 1;

            } else if (subchapter == "Introduction to Simple Logic Gates"){
              document.getElementById("checkbox3").checked=true;
              document.getElementById("checkbox3").disabled=true;
              return 1;

            } else {
              return 0;
            }
          }
        }
      }
      xmlhttp.send();
      return 0;
    }

    function loadIndexCaller(){
      loadIndex("Introduction to Binary");
      loadIndex("Introduction to Hexadecimals");
      loadIndex("Introduction to Simple Logic Gates");
      return 0;
    }

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
              document.getElementById("binaryBlock").style.visibility="visible";
              return 1;

            } else if (subchapter == "Introduction to Hexadecimals"){
              document.getElementById("hexaBlock").style.visibility="visible";
              return 1;

            } else if (subchapter == "Introduction to Simple Logic Gates"){
              document.getElementById("simpleLogicGatesBlock").style.visibility="visible";
              return 1;

            } else {
              return 0;
            }
          }
        }
      }
      xmlhttp.send();
      return 0;
    }

    function checkGradesCaller(){
      checkGrade("Introduction to Binary", "binInt");
      checkGrade("Shifting and Fractions", "binShi");
      checkGrade("Signed", "binSig");
      checkGrade("Ones Complement", "binOne");
      checkGrade("Twos Complement", "binTwo");
      checkGrade("Binary Summary", "binSum");
      checkGrade("Introduction to Hexadecimals", "hexInt");
      checkGrade("Introduction to Simple Logic Gates", "SLGInt");
      return 0;
    }

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
    }

    function displayGrade(innerhtml){
      document.getElementById(innerhtml).innerHTML = document.getElementById(innerhtml).innerHTML + "	&#10004;";
      document.getElementById(innerhtml).style.color = "green";
      return 0;
    }

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
            // document.getElementById("ErrorSignup").innerHTML = "<font size='2' color ='red'>" + returned.message + "</font>";
            alert("failure")
            return 0;
          }
          if(returned.success == "true"){
            alert("success")
            window.location.href = '/classroom';

            // document.getElementById("view1").innerHTML = document.getElementById("accountsetupview").innerHTML;
            // document.getElementById("ErrorSignup").innerHTML = "<font size='2' color ='green'>" + returned.message + "</font>";
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
            data=returned.data;
            // var paragraph1;
            // var paragraph2;
            // var paragraph3;
            // var paragraph4;
            // var paragraph5;
            // var paragraph6;
            // var paragraph7;

            // document.getElementById("studentList").innerHTML = "<tr> <th>Name</th> </tr>";
            // <th>Points</th> <th>Max Points</th> <th>% Points</th> <th>Passed</th> <th> Max Points</th> <th>% Passed</th> </tr>
            // var div = document.getElementById("students")

            // for(var i = 0; i<courses.length; i++){
            //   column = document.createElement("th");
            //   var row = document.getElementById("studentList").insertRow(0);
            //   var cell = row.insertCell(i+1);
            //   paragraph.innerHTML = courses[i];
            //   cell.appendChild(paragraph);
            //   // document.getElementById("studentList").innerHTML = document.getElementById("studentList").innerHTML + "<th>" + courses[i] + "</th>";
            // }

            // document.getElementById("studentList").innerHTML = document.getElementById("studentList").innerHTML + "</tr>";
            // data.names.length
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
                  var paragraph = document.createElement("tr");
                  var cell = row.insertCell(j);
                  if(j == 0){
                    paragraph.innerHTML = data.names[i-1];
                    cell.appendChild(paragraph);
                  } else {
                    paragraph.innerHTML = data.points[(i-1)*(j-1)+(j-1)]['points'];
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


    // paragraph1 = document.createElement("p");
    // paragraph2 = document.createElement("p");
    // paragraph3 = document.createElement("p");
    // paragraph4 = document.createElement("p");
    // paragraph5 = document.createElement("p");
    // paragraph6 = document.createElement("p");
    // paragraph7 = document.createElement("p");
    // // paragraph.setAttribute('href', "/student/" + data[i]);
    //
    // // paragraph.setAttribute('href', "#");
    // // paragraph.setAttribute('onclick', "studentModal('" + data[i] + "'); return false;");
    // // var row = document.getElementById("studentList").insertRow(i+1);
    //
    // var cell1 = row.insertCell(0);
    // var cell2 = row.insertCell(1);
    // var cell3 = row.insertCell(2);
    // var cell4 = row.insertCell(3);
    // var cell5 = row.insertCell(4);
    // var cell6 = row.insertCell(5);
    // var cell7 = row.insertCell(6);
    //
    // paragraph1.innerHTML = data.names[i];
    // paragraph2.innerHTML = data.points[i];
    // paragraph3.innerHTML = data.maxPoints;
    // paragraph4.innerHTML = (data.points[i]/data.maxPoints * 100).toFixed(2) + '%';
    // paragraph5.innerHTML = data.passed[i];
    // paragraph6.innerHTML = data.maxPassed;
    // paragraph7.innerHTML = (data.passed[i]/data.maxPassed * 100).toFixed(2) + '%';
    //
    // cell1.appendChild(paragraph1);
    // cell2.appendChild(paragraph2);
    // cell3.appendChild(paragraph3);
    // cell4.appendChild(paragraph4);
    // cell5.appendChild(paragraph5);
    // cell6.appendChild(paragraph6);
    // cell7.appendChild(paragraph7);
    //
    // cell2.style.textAlign = "center";
    // cell3.style.textAlign = "center";
    // cell4.style.textAlign = "center";
    // cell5.style.textAlign = "center";
    // cell6.style.textAlign = "center";
    // cell7.style.textAlign = "center";

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

            // var div = document.getElementById("students")

            for(var i = 0; i<data.length; i++) {
              option = document.createElement("option");
              // paragraph.setAttribute('href', "/student/" + data[i]);
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
      xmlhttp.open("GET", '/loadClassroomsStudent/', false);
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

            // var div = document.getElementById("students")

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
      xmlhttp.open("GET", '/loadClasses/' + classes, false);
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
            var paragraph;
            document.getElementById("classList").innerHTML = "<tr> <th> Binary </th> </tr>";
            // var div = document.getElementById("students")

            for(var i = 0; i<data.length; i++) {
              paragraph = document.createElement("p");
              // paragraph.setAttribute('href', "/student/" + data[i]);
              // paragraph.setAttribute('href', "#");
              // paragraph.setAttribute('onclick', "studentModal('" + data[i] + "'); return false;");
              paragraph.innerHTML= data[i];
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

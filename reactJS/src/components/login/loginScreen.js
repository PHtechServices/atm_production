import axios from 'axios';
import { useState } from 'react';
import './loginScreen.css'
import ReactDOM from 'react-dom';
import React from 'react';
import HomeScreen from '../home/homeScreen';
import MenuButtons from '../home/menuButtons';
import Notices from '../rightSideBar/notices';
import ChatBar from '../sideChatBar/chatBar';
import CalendarAPI from '../googleAuth/calendar';

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [classTeacher, setCT] = useState("")
  // const [rmEmail, setRMEmail] = useState("")
  // const [rmName, setRMName] = useState("")
  // const [subjects, setSubjects] = useState("")
  const onUserChange = (e) => {
    setUserName(e.target.value);
  }

  const onPassChange = (e) => {
    setPassword(e.target.value);
  }

  const validateUser = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      "userDetails": {
        "userName": userName,
        "password": password
      }
    });

    var config = {
      method: 'POST',
      url: '172.17.0.2:5000/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        var status = response.data.message
        const dd = response.data.uName
        var mail = response.data.mailID[0]
        var role = response.data.role
        var designation = response.data.designation
        let cTask = true
        let cUser = true
        if (role === "SA" || role === "A") {
          cTask = true
          cUser = true
        }
        else if (role === "W") {
          cTask = true
          cUser = false
        }
        else {
          cTask = false
          cUser = false
        }

        if (status === "UserName or Password is Incorrect") {
          ReactDOM.render(
            <React.StrictMode>
              <HomeScreen name={dd} mail={mail} designation={designation} />
            </React.StrictMode>,
            document.getElementById('dLogin'));
        }

        else {
          var config = {
            method: 'POST',
            url: '172.17.0.2:5000/getProfileInfo',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              "mail": mail
            }
          };

          axios(config)
            .then(response => {
              var profileInformation = response.data
              let classTeacher
              let rmEmail
              let rmName
              let subjects
              Object.keys(profileInformation).map((key, index) => {

                if (key === "classTeacher") {
                  classTeacher = profileInformation[key]
                }
                if (key === "reportingManagerEmail") {
                  rmEmail = profileInformation[key]
                }
                if (key === "reportingManagerName") {
                  rmName = profileInformation[key]
                }
                if (key === "subjects") {
                  subjects = profileInformation[key]
                }
                ReactDOM.render(
                  <React.StrictMode>
                    <MenuButtons role={dd} mail={mail} cTask={cTask} cUser={cUser} name={dd} classTeacher={classTeacher} rmEmail={rmEmail} rmName={rmName} subjects={subjects} />
                  </React.StrictMode>,
                  document.getElementById('root')
                );
              })

              ReactDOM.render(
                <React.StrictMode>
                  <HomeScreen name={dd} mail={mail} />
                </React.StrictMode>,
                document.getElementById('dLogin'));

              ReactDOM.render(
                <React.StrictMode>
                  <Notices mail={mail} name={dd} />
                </React.StrictMode>,
                document.getElementById('notices'));

              ReactDOM.render(
                <React.StrictMode>
                  <ChatBar designation={designation} name={dd} mail={mail} classTeacher={classTeacher} rmEmail={rmEmail} 
            rmName={rmName} subjects={subjects}/>
                </React.StrictMode>,
                document.getElementById('sideb'));
            }
            )
        }
      })

  }

  return (
    <div id="loginScreen" style={{ width: "80%", marginLeft: "-30%", marginTop: "20%" }}>
      <form id="contact" onSubmit={validateUser}>
        <h3>Log In</h3>
        <fieldset>
          <input placeholder="User Name" type="text" tabindex="1" onChange={onUserChange} required autofocus />
        </fieldset>
        <fieldset>
          <input placeholder="Password" type="password" tabindex="2" onChange={onPassChange} required />
        </fieldset>
        <fieldset>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;

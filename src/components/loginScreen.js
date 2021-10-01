import axios from 'axios';
import { useState } from 'react';
import './loginScreen.css'
import ReactDOM from 'react-dom';
import React from 'react';
import HomeScreen from './homeScreen';
import MenuButtons from './menuButtons';

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
      url: 'http://127.0.0.1:5000/login',
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
              <HomeScreen name={dd} mail={mail} />
            </React.StrictMode>,
            document.getElementById('dLogin'));
        }

        else {
          ReactDOM.render(
            <React.StrictMode>
              <MenuButtons role={dd} mail={mail} cTask={cTask} cUser={cUser} name={dd}/>
            </React.StrictMode>,
            document.getElementById('root')
          );

          ReactDOM.render(
            <React.StrictMode>
              <HomeScreen name={dd} mail={mail} />
            </React.StrictMode>,
            document.getElementById('dLogin'));
        }
      })

  }

  return (
    <div id="loginScreen" style={{maxWidth:"50%",marginLeft:"30%"}}>
      <form id="contact" onSubmit={validateUser}>
        <h3>admin@srishtiworldschools.in</h3>
        <h3>admin@admin</h3>
        <fieldset>
          <input placeholder="User Name" type="text" tabindex="1" onChange={onUserChange} required autofocus />
        </fieldset>
        <fieldset>
          <input placeholder="Password" type="text" tabindex="2" onChange={onPassChange} required />
        </fieldset>
        <fieldset>
        <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;

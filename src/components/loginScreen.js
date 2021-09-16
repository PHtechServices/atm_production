import axios from 'axios';
import { useState } from 'react';
import './loginScreen.css'
import ReactDOM from 'react-dom';
import React from 'react';
import HomeScreen from './homeScreen';
import QuickGlance from './js/quickGlance';
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

  const validateUser = () => {
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
        const dd = response.data.roles[0]

        if (status === "UserName or Password is Incorrect") {
          ReactDOM.render(
            <React.StrictMode>
              <HomeScreen name={dd} />
            </React.StrictMode>,
            document.getElementById('dLogin'));
        }

        else {
          ReactDOM.render(
            <React.StrictMode>
              <MenuButtons role={dd} />
            </React.StrictMode>,
            document.getElementById('root')
          );

          ReactDOM.render(
            <React.StrictMode>
              <HomeScreen name={dd} />
            </React.StrictMode>,
            document.getElementById('dLogin'));

          ReactDOM.render(
            <React.StrictMode>
              <QuickGlance />
            </React.StrictMode>,
            document.getElementById('quickGlance'));
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <div id="loginScreen" onSubmit={validateUser}>
      <form id="contact">
        <h3>Log In</h3>
        <fieldset>
          <input placeholder="User Name" type="text" tabindex="1" onChange={onUserChange} required autofocus />
        </fieldset>
        <fieldset>
          <input placeholder="Password" type="text" tabindex="2" onChange={onPassChange} required />
        </fieldset>
      </form>
      <button type="submit" onClick={validateUser}>Submit</button>
    </div>
  );
}

export default Login;

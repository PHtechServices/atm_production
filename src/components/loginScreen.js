import axios from 'axios';
import { useState } from 'react';
import './loginScreen.css'
import ReactDOM from 'react-dom';
import React from 'react';
import HomeScreen from './homeScreen';

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
      .then(function (response) {
        console.log(response.data["message"])
      })
      .catch(function (error) {
        console.log(error);
      });
      ReactDOM.render(
        <React.StrictMode>
          <HomeScreen />
        </React.StrictMode>,
        document.getElementById('dLogin'));
  }

  return (
    <div id="loginScreen">
      <form id="contact">
        <h3>Log In</h3>
        <fieldset>
          <input placeholder="User Name" type="text" tabindex="1" onChange={onUserChange} required autofocus />
        </fieldset>
        <fieldset>
          <input placeholder="Password" type="text" tabindex="2" onChange={onPassChange} required />
        </fieldset>
        <fieldset>
          <button type="submit" onClick={validateUser}>Submit</button>
          </fieldset>
      </form>
    </div>
  );
}

export default Login;

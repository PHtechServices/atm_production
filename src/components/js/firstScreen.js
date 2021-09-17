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
        const dd = response.data.roles
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <div id="firstScreen">
      {tasks}
    </div>
  );
}

export default Login;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login/loginScreen'
import reportWebVitals from './reportWebVitals';
import MenuButtons from './components/home/menuButtons';
import HomeScreen from './components/home/homeScreen'

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('dLogin')
);

reportWebVitals();
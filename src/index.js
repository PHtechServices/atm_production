import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/loginScreen'
import reportWebVitals from './reportWebVitals';
import MenuButtons from './components/menuButtons';
import HomeScreen from './components/homeScreen'

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('dLogin')
);

reportWebVitals();
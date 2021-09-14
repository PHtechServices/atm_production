import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/loginScreen'
import reportWebVitals from './reportWebVitals';
import MenuButtons from './components/menuButtons';
import QuickGlance from './components/js/quickGlance';

ReactDOM.render(
  <React.StrictMode>
    <MenuButtons />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('dLogin')
);

ReactDOM.render(
  <React.StrictMode>
    <QuickGlance />
  </React.StrictMode>,
  document.getElementById('quickGlance')
);

reportWebVitals();
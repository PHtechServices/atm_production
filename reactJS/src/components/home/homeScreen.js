import React from 'react';
import "../home/homeScreen.scss"
import '../login/loginScreen.css'
import ReactDOM from 'react-dom';
import "./menuButtons.css"
import axios from 'axios';
import TaskViewer from '../taskView/tasksViewer';
import 'reactjs-popup/dist/index.css';

function HomeScreen(props) {

  var message = props.name

  const viewTasks = (e) => {
    e.preventDefault();
    const mail = props.mail
    const data = JSON.stringify({
      "assigned": mail
    });

    var config = {
      method: 'POST',
      url: 'http://127.0.0.1:5000/taskassign',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(response => {
        var description = response.data["data"]
        const listItems = description.map((item) =>
          <li className="nav-item has-treeview menu-open pb-3">
            <i className="nav-icon fas fa-tachometer-alt"></i>
            <li class="tick">{item}</li>
          </li>
        );
        ReactDOM.render(
          <React.StrictMode>
            <TaskViewer it={listItems} />
          </React.StrictMode>,
          document.getElementById('dLogin'));
      })
  }

  return (
<div class="wrapper">
  <main>
      <div class="home-page">
      <div class="block">
        <h1>Hello, {message}.</h1>
        <h5>Good Morning!</h5><br/>
        <p id="quote">Here's a Quote for you:</p>
        <cite class="intro">Teachers have three loves: love of learning, love of learners, and the love of bringing the first two loves together. – Bob Talbert </cite><br/><br/>
        <p>Let's see what's in your To-Do List Today</p>
        <a href="/" class="button" onClick={viewTasks}>View Tasks</a>
      </div>
      <div class="block">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/48935/hello.jpg" alt="An illustration of me in profile" />
      </div>
    </div>
  </main>

    </div>
  );
}

export default HomeScreen;

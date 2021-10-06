import './loginScreen.css'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CreateTask from './createTask';
import HomeScreen from './homeScreen';
import CreateUser from './createUser';
import "./menuButtons.css"
import axios from 'axios';
import TaskViewer from './js/tasksViewer';
import Calendar from './js/calendar';
import CalendarAPI from './js/calendar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import UpdateTasks from './js/updateTasks';
import EditTask from './js/editTask';


function MenuButtons(props) {
  const cTask = props.cTask
  const cUser = props.cUser
  const createNewTask = (e) => {
    ReactDOM.render(
      <React.StrictMode>
        <CreateTask assignee={props.mail} />
      </React.StrictMode>,
      document.getElementById('dLogin'));
  }

  const gotoHome = (e) => {

    ReactDOM.render(
      <React.StrictMode>
        <HomeScreen name={props.name} />
      </React.StrictMode>,
      document.getElementById('dLogin'));


  }

  const createNewUser = (e) => {
    ReactDOM.render(
      <React.StrictMode>
        <CreateUser />
      </React.StrictMode>,
      document.getElementById('dLogin'));
  }

  const clickLogo = (e) => {
    ReactDOM.render(
      <React.StrictMode>
        <HomeScreen name={props.name} />
      </React.StrictMode>,
      document.getElementById('dLogin')
    );
  }

  const viewCalendar = (e) => {
    var inputPlaceholder = []

    {
        const id = "615bedcbe414a11c3b3a7c66"
        const data = JSON.stringify({
            "objid": id
        });

        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:5000/getjson',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                const test = response.data["json"]
                const listItems = Object.keys(test).map((key, index) => (
                    inputPlaceholder.push(test[key])
                ))
                console.log(inputPlaceholder)
                ReactDOM.render(
                  <React.StrictMode>
                    <EditTask inputPlaceholder={inputPlaceholder} />
                  </React.StrictMode>,
                  document.getElementById('dLogin'));
            })
            .catch(function (error) {
                console.log("error")
            });
    }
  }

  const viewTasks = (e) => {
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
        var pop = response.data["populator"]
        ReactDOM.render(
          <React.StrictMode>
            <TaskViewer it={description} pop={pop} const mail = {props.mail }/>
          </React.StrictMode>,
          document.getElementById('dLogin'));
      })
  }

  return (
    <nav class="navbar navbar-expand-sm navbar-expand-xl bg-dark navbar-dark">
      <a class="navbar-brand" href="#" onClick={clickLogo}><h6>ATM - At The Moment</h6></a>
      <ul class="navbar-nav pl-xl-5 pr-xl-5 pl-sm-1 pr-sm-1">
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={gotoHome}><h6 id="home">Home</h6></a>
        </li>
        {cTask && <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={createNewTask}><h6>Create Task</h6></a>
        </li>}
        {cUser && <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={createNewUser}><h6>Create User</h6></a>
        </li>}
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={viewTasks}><h6>View Tasks</h6></a>
        </li>
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={viewCalendar}><h6>Admin</h6></a>
        </li>
      </ul>
    </nav>
  );
}

export default MenuButtons;
import '../login/loginScreen.css'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CreateTask from '../createTask/createTask';
import HomeScreen from '../home/homeScreen';
import CreateUser from '../createUser/createUser';
import "./menuButtons.css"
import axios from 'axios';
import TaskViewer from '../taskView/tasksViewer';
import 'reactjs-popup/dist/index.css';
import EditTask from '../editTasks/editTask';


function MenuButtons(props) {
  const cTask = props.cTask
  const cUser = props.cUser
  const createNewTask = (e) => {
    ReactDOM.render(
      <React.StrictMode>
        <CreateTask assignee={props.mail} name={props.name} />
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
        <CreateUser name={props.name}/>
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
        if (response.data["message"] === "tasks are assigned"){
        ReactDOM.render(
          <React.StrictMode>
            <TaskViewer msg={response.data["message"]} it={description} pop={pop} const mail = {props.mail } cTask={props.cTask}/>
          </React.StrictMode>,
          document.getElementById('dLogin'));}
        else {
          ReactDOM.render(
            <React.StrictMode>
              <div>No Tasks to Display</div>
            </React.StrictMode>,
            document.getElementById('dLogin'));}
      })

      }

  return (
    <nav class="navbar navbar-expand-sm navbar-expand-xl bg-dark navbar-dark">
      <a class="navbar-brand" href="#" onClick={clickLogo}><h6>ATM - At The Moment</h6></a>
      <ul class="navbar-nav pl-xl-5 pr-xl-5 pl-sm-1 pr-sm-1">
        {cTask && <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={createNewTask}><h6>Create Task</h6></a>
        </li>}
        {cUser && <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={createNewUser}><h6>Create User</h6></a>
        </li>}
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={viewTasks}><h6>My Tasks</h6></a>
        </li>
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={viewTasks}><h6>Schedule Meeting</h6></a>
        </li>
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={viewTasks}><h6>Dashboards</h6></a>
        </li>
      </ul>
    </nav>
  );
}

export default MenuButtons;
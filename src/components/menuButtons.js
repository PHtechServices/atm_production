import './loginScreen.css'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CreateTask from './createTask';
import HomeScreen from './homeScreen';
import CreateUser from './createUser';
import "./menuButtons.css"
import axios from 'axios';
import TaskViewer from './js/tasksViewer';

function MenuButtons(props) {
  const createNewTask = (e) => {
    console.log(props.role)
    if (props.role === "Admin" || props.role === "Super Admin" || props.role === "Write") {
      ReactDOM.render(
        <React.StrictMode>
          <CreateTask />
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
    else {
      ReactDOM.render(
        <React.StrictMode>
          <div>You are not authorized to create task</div>
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
  }

  const gotoHome = (e) => {
    const data = JSON.stringify({
      "assigned": "dmitahee"
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
              {item["task description"]}
          </li>
        );
        ReactDOM.render(
          <React.StrictMode>
            <TaskViewer it={listItems} />
          </React.StrictMode>,
          document.getElementById('dLogin'));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const createNewUser = (e) => {
    console.log(props.role)
    if (props.role === "Admin" || props.role === "Super Admin") {
      ReactDOM.render(
        <React.StrictMode>
          <CreateUser />
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
    else {
      ReactDOM.render(
        <React.StrictMode>
          <div>You are not authorized to create user</div>
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
  }

  return (
    <nav class="navbar navbar-expand-sm navbar-expand-xl bg-dark navbar-dark">
      <a class="navbar-brand" href="#"><h6>ATM - At The Moment</h6></a>
      <ul class="navbar-nav pl-xl-5 pr-xl-5 pl-sm-1 pr-sm-1">
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={gotoHome}><h6 id="home">Home</h6></a>
        </li>
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={createNewTask}><h6>Create Task</h6></a>
        </li>
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#" onClick={createNewUser}><h6>Create User</h6></a>
        </li>
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#"><h6>Dashboard</h6></a>
        </li>
        <li class="nav-item mr-xl-3 mr-sm-3">
          <a class="nav-link" href="#"><h6>Admin</h6></a>
        </li>
      </ul>
      <form class="form-inline input-sm input-xl">
        <input class="form-control form-control-sm form-control-xl pt-sm-1 ml-sm-1 pt-xl-1 ml-xl-5" id="inputsm" type="text" placeholder="Search" style={{ width: "20%%" }} />
      </form>
      <button class="btn btn-secondary ml-sm-1 mt-sm-2 ml-xl-3 mt-xl-2" type="submit" style={{ width: "3%" }}>Go</button>
      <ul class="navbar-nav ml-xl-5 ml-sm-1" >
        <li class="nav-item">
          <img class="mr-xl-3 mr-sm-3 img-thumbnail" src="./Help.gif" alt="Help"></img>
        </li>
        <li class="nav-item">
          <img id="icons" class="mr-xl-3 mr-sm-3 img-thumbnail" src="./Settings.gif" alt="Settings"></img>
        </li>
        <li class="nav-item" style={{ float: "right" }}>
          <img id="icons" class="img-thumbnail" src="./User.gif" alt="User"></img>
        </li></ul>
    </nav>
  );
}

export default MenuButtons;
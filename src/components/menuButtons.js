import './loginScreen.css'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import CreateTask from './createTask';
import HomeScreen from './homeScreen';
import CreateUser from './createUser';

function MenuButtons(props) {
  const createNewTask = (e) => {
    console.log(props.role)
    if (props.role === "A") {
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
    ReactDOM.render(
      <React.StrictMode>
        <HomeScreen />
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

  return (
    <nav class="navbar navbar-expand-xl bg-dark navbar-dark">
      <a class="navbar-brand pr-xl-5 mr-xl-5" href="#"><h6>ATM - At The Moment</h6></a>
      <ul class="navbar-nav mr-xl-5 pt-xl-3">
        <li class="nav-item pr-xl-2">
          <a class="nav-link mr-xl-5" href="#" onClick={gotoHome}><h6>Home</h6></a>
        </li>
        <li class="nav-item pr-xl-2">
          <a class="nav-link mr-xl-5" href="#" onClick={createNewTask}><h6>Create Task</h6></a>
        </li>
        <li class="nav-item pr-xl-2">
          <a class="nav-link mr-xl-5" href="#" onClick={createNewUser}><h6>Create User</h6></a>
        </li>
        <li class="nav-item">
          <a class="nav-link mr-xl-5" href="#"><h6>Dashboard</h6></a>
        </li>
        <li class="nav-item">
          <a class="nav-link mr-xl-5" href="#"><h6>Admin</h6></a>
        </li>
      </ul>
      <form class="form-inline input-xl ml-xl-5">
        <input class="form-control form-control-xl pt-xl-1" id="inputsm" type="text" placeholder="Search" style={{ width: "300px" }} />
      </form>
      <button class="btn btn-secondary mr-xl-5 ml-xl-3 pt-xl-1 mt-xl-2" type="submit" style={{ width: "3%" }}>Go</button>
      <ul class="navbar-nav ml-xl-5 mt-xl-2" >
        <li class="nav-item">
          <img class="mr-xl-3 img-thumbnail" src="./Help.gif" alt="Help"></img>
        </li>
        <li class="nav-item">
          <img id="icons" class="mr-xl-3 img-thumbnail" src="./Settings.gif" alt="Settings"></img>
        </li>
        <li class="nav-item" style={{ float: "right" }}>
          <img id="icons" class="img-thumbnail" src="./User.gif" alt="User"></img>
        </li></ul>
    </nav>
  );
}

export default MenuButtons;
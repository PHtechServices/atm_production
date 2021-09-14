import './loginScreen.css'
import React from 'react';
import ReactDOM from 'react-dom';
import CreateTask from './createTask';
import HomeScreen from './homeScreen';
import CreateUser from './createUser';

function MenuButtons() {
    const createNewTask = (e) => {
        ReactDOM.render(
            <React.StrictMode>
              <CreateTask />
            </React.StrictMode>,
            document.getElementById('dLogin'));
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
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark pb-lg-1">
        <a class="navbar-brand pr-lg-5 pt-lg-2" href="#"><h6>ATM - At The Moment</h6></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <ul class="navbar-nav mr-lg-5 pt-lg-3">
          <li class="nav-item pr-lg-2">
            <a class="nav-link mr-sm-1" href="#" onClick={gotoHome}><h6>Home</h6></a>
          </li>
          <li class="nav-item pr-lg-2">
            <a class="nav-link mr-lg-2" href="#" onClick={createNewTask}><h6>Create Task</h6></a>
          </li>
          <li class="nav-item pr-lg-2">
            <a class="nav-link mr-lg-2" href="#" onClick={createNewUser}><h6>Create User</h6></a>
          </li>
          <li class="nav-item">
            <a class="nav-link mr-lg-2" href="#"><h6>Dashboard</h6></a>
          </li>
          <li class="nav-item">
            <a class="nav-link mr-lg-5" href="#"><h6>Admin</h6></a>
          </li>
        </ul>
        <form class="form-inline input-lg">
          <input class="form-control form-control-sm mr-sm-1" id="inputsm" type="text" placeholder="Search"/>
          <button class="btn btn-sm mr-lg-3 btn-secondary" type="submit">Search</button>
        </form>
        <ul class="navbar-nav pt-lg-2">
          <li class="nav-item">
            <img class="mr-lg-2 img-thumbnail" src="./Help.gif" alt="Help"></img>
          </li>
          <li class="nav-item">
            <img id="icons" class="mr-lg-2 img-thumbnail" src="./Settings.gif" alt="Settings"></img>
          </li>
          <li class="nav-item">
            <img id="icons" class="img-thumbnail" src="./User.gif" alt="User"></img>
          </li></ul>
      </nav>
    );
}

export default MenuButtons;
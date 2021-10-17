import "./notices.scss"
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClassIcon from '@mui/icons-material/Class';
import CreateTask from "../createTask/createTask"
import ReactDOM from 'react-dom';
import CreateUser from "../createUser/createUser";
import Meeting from "../meeting/meetings";
import axios from "axios";
import AssignTeacher from "../assignTasks/assignTeacher";


function Notices(props) {
  const actions = [
    { icon: <AddTaskIcon />, name: 'Create Task', operation: 'task' },
    { icon: <PersonAddIcon />, name: 'Create User', operation: 'user' },
    { icon: <MeetingRoomIcon />, name: 'Schedule Meetings', operation: 'meeting' },
    { icon: <ClassIcon />, name: 'Assign Classes', operation: 'classes' },
  ];
  const openProcesses = (e, operation) => {
    e.preventDefault();
    if (operation == "task") {
      ReactDOM.render(
        <React.StrictMode>
          <CreateTask assignee={props.mail} name={props.name} />
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
    else if (operation == "user") {
      ReactDOM.render(
        <React.StrictMode>
          <CreateUser name={props.name} />
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
    else if (operation == "meeting") {
      ReactDOM.render(
        <React.StrictMode>
          <Meeting />
        </React.StrictMode>,
        document.getElementById('dLogin'));
    }
    else if (operation == "classes") {
      var config = {
        method: 'GET',
        url: 'http://127.0.0.1:5000/classInfo',
        headers: {
          'Content-Type': 'application/json'
        },
      };

      axios(config)
        .then(response => {
          var classInfo = response.data["xx"]
          var subjectInfo = response.data["yy"]
          ReactDOM.render(
            <React.StrictMode>
              <AssignTeacher classInfo={classInfo} subjectInfo={subjectInfo} />
            </React.StrictMode>,
            document.getElementById('dLogin'));
        })
    }
  }
  return (
    <div class="col-sm noticess">
      <button class="draw meet overall" style={{ width: "58%", maxHeight: "15%", marginTop: "-20%", marginLeft: "-15%" }}>Circulars</button>
      <button class="draw meet overall" style={{ width: "58%", maxHeight: "15%", marginTop: "-20%", marginLeft: "50%" }}>Approvals</button>
      {/* <h6 style={{width:"100%", fontSize:"12px", marginLeft:"-25%", textDecoration:"underline"}}>Notices and Announcements</h6> */}
      <div class="notice info" style={{ marginTop: "40%" }}><p>This is a an info notice, it provides feedback of a neutral nature to the user.</p></div>
      <div class="notice info"><p>This is a an info notice, it provides feedback of a neutral nature to the user.</p></div>
      <div class="notice info"><p>This is a an info notice, it provides feedback of a neutral nature to the user.</p></div>
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 100, right: -100 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={(e) => {
                openProcesses(e, action.operation)
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
}

export default Notices;

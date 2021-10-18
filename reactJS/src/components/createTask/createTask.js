import { useState } from 'react';
import TaskCategorization from "./taskCategorization"
import ReactDOM from 'react-dom';
import React from 'react';
import "./taskCategorization.css"
import axios from 'axios';


function CreateTask(props) {

    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [staffType, setStaffType] = useState("")
    const [assigned, setAssigned] = useState("")

    const changeTaskDescription = (e) => {
        setTaskDescription(e.target.value);
    }

    const changeTaskPriority = (e) => {
        setTaskPriority(e.target.value);
    }

    const changeTaskDeadline = (e) => {
        setTaskDeadline(e.target.value);
    }

    const getStaffType = (e) => {
        setStaffType(e.target.value);
    }

    const changeAssignedTo = (e) => {
        setAssigned(e.target.value);
    }

    const onNextClick = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            "staffType": staffType
        }
        );

        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/staffDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        const transferrableData = {
            "task description": taskDescription,
            "task priority": taskPriority,
            "task deadline": taskDeadline,
            "task assigned to": assigned+"@srishtiworldschools.in",
            "task assigned by": props.assignee,
            "task type": staffType,
            "task status": "Start Task"
        }

        axios(config)
            .then(response => {
                var staffList = response.data["staffList"]
                ReactDOM.render(
                    <React.StrictMode>
                        <TaskCategorization name={props.name} staffType={staffList} transferrableData={transferrableData} />
                    </React.StrictMode>,
                    document.getElementById('dLogin')
                );

            })


    }

    return (
        <div className="App" class="App" onSubmit={onNextClick}>
            <form id="msform">
                <ul id="progressbar">
                    <li class="active">General Information</li>
                    <li>Task Category Selection</li>
                </ul>
                <fieldset>
                    <h2 class="fs-title">Create a Task</h2>
                    <h3 class="fs-subtitle">General Information</h3>
                    <textarea type="text" name="email" placeholder="Task Description" onChange={changeTaskDescription} required autoFocus />
                    <select id="task-priority" name="task-priority" onChange={changeTaskPriority} required>
                        <option value="#">Task Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <input type="date" id="birthday" name="Task Deadline" onChange={changeTaskDeadline} required />
                    <select id="task-categorization" name="task-categorization" onChange={getStaffType} required>
                        <option value="#">Select Staff Type</option>
                        <option value="teachingStaff">Teaching Staff</option>
                        <option value="nonTeachingStaff">Non-Teaching Staff</option>
                    </select>
                    <input type="text" id="birthday" placeholder="Assigned To" onChange={changeAssignedTo} required />
                    <input type="submit" name="next" class="action-button" value="Next" />
                </fieldset>
            </form>
        </div>
    );
}

export default CreateTask;

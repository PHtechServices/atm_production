import { useState } from 'react';
import axios from 'axios';
import './loginScreen.css'
import React from 'react';
import "./createTask.css"

function CreateTask() {
    const [taskPriority, setTaskPriority] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [taskType, setTaskType] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [reportTo, setReportTo] = useState("");
    const [taskNature, setTaskNature] = useState("");
    const [uploadDoc, setUploadDoc] = useState("");
    const [taskApproval, setTaskApproval] = useState("");
    
    const enterTaskPriority = (e) => {
        setTaskPriority(e.target.value);
    }

    const enterTaskDeadline = (e) => {
        setTaskDeadline(e.target.value);
    }

    const enterTaskType = (e) => {
        setTaskType(e.target.value);
    }

    const enterTaskDescription = (e) => {
        setTaskDescription(e.target.value);
    }

    const enterReportTo = (e) => {
        setReportTo(e.target.value);
    }

    const enterTaskNature = (e) => {
        setTaskNature(e.target.value);
    }

    const enterUploadDoc = (e) => {
        setUploadDoc(e.target.value);
    }

    const enterTaskApproval = (e) => {
        setTaskApproval(e.target.value);
    }

    const createNewTask = () => {
        var data = JSON.stringify({
            "task": {
                "task priority": taskPriority,
                "task deadline": taskDeadline,
                "task type": taskType,
                "task description": taskDescription,
                "report to": reportTo,
                "task nature": taskNature,
                "upload document": uploadDoc,
                "Task Approval require to complete": taskApproval
            }
        });

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/creattask',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div id="createNewTask">
            <form id="contact">
                <h3>Create a New Task</h3>
                <fieldset>
                    <select  onChange={enterTaskPriority} name="cars" id="cars">
                        <option value="">Task Priority:</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </fieldset>
                <fieldset>
                    <select placeholder="User Type" onChange={enterTaskType} name="cars" id="cars">
                        <option value="">Task Type:</option>
                        <option value="Academic">Academic</option>
                        <option value="Management">Management</option>
                        <option value="Reporting">Reporting</option>
                        <option value="Club">Club</option>
                    </select>
                </fieldset>
                <fieldset>
                    <input placeholder="Deadline" onChange={enterTaskDeadline} type="text" tabindex="1" required autofocus />
                </fieldset>
                <fieldset>
                    <input placeholder="Description" onChange={enterTaskDescription} type="text" tabindex="1" required autofocus />
                </fieldset>
                <fieldset>
                    <input placeholder="Report To" onChange={enterReportTo} type="text" tabindex="1" required autofocus />
                </fieldset>
                <fieldset>
                    <input placeholder="Approved By" onChange={enterTaskApproval} type="text" tabindex="2" required />
                </fieldset>
                <fieldset>
                    <input placeholder="Upload Related Document" onChange={enterUploadDoc} type="text" tabindex="2" required />
                </fieldset>
                <fieldset>
                    <select placeholder="User Type" onChange={enterTaskNature} name="cars" id="cars">
                        <option value="Please Select">Nature of Task:</option>
                        <option value="One-Time">One-Time</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                </fieldset>
                <fieldset>
                    <button type="submit" onClick={createNewTask}>Submit</button>
                </fieldset>
            </form>
        </div>
    );
}

export default CreateTask;
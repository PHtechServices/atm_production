import { useState } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import "./taskCategorization.css"
import axios from 'axios';
import HomeScreen from '../home/homeScreen';

function TaskCategorization(props) {

    const [taskResponsibility, setTaskResponsibility] = useState("");
    const [taskDepartment, setTaskDepartment] = useState("");
    const [taskNature, setTaskNature] = useState("");
    const [resItems, setResItems] = useState("");

    const staff = props.staffType
    const transferrableData = props.transferrableData

    const listItems = staff.map((item) =>
        <option value={item}>{item}</option>);

    const changeTaskResponsibility = (e) => {
        setTaskResponsibility(e.target.value);

    }

    const changeTaskDepartment = (e) => {
        setTaskDepartment(e.target.value);

    }

    const changeTaskNature = (e) => {
        setTaskNature(e.target.value);

    }

    const submitForm = (e) => {
        e.preventDefault();
        transferrableData["task responsibility"] = taskResponsibility
        transferrableData["task department"] = taskDepartment
        transferrableData["task nature"] = taskNature
        transferrableData["task updates"] = ""
        console.log(transferrableData)
        const data = JSON.stringify(
            transferrableData
        );

        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/creattask',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(response => {
                var staffList = response.data
                console.log(staffList)

            })
            ReactDOM.render(
                <React.StrictMode>
                  <HomeScreen name={props.name} />
                </React.StrictMode>,
                document.getElementById('dLogin'));
    }

    const onSubmitClick = (e) => {
        const data = JSON.stringify({
            "department": taskDepartment
        }
        );

        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/department',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                var responsibility = response.data["responsibilities"]
                const x = responsibility.map((item) =>
                    <option value={item}>{item}</option>);
                setResItems(x)

            })


    }

    return (
        <div className="App">
            <form id="msform">
                <ul id="progressbar">
                    <li>General Information</li>
                    <li class="active">Task Category Selection</li>
                </ul>
                <fieldset>
                    <h2 class="fs-title">Task Category</h2>
                    <h3 class="fs-subtitle">Select the appropriate Task Category</h3>
                    <select id="staff-type" name="staff-type" onChange={changeTaskDepartment}>
                        <option value="#">Select Department:</option>
                        {listItems}
                    </select>
                    <select id="res-type" name="res-type" onClick={onSubmitClick} onChange={changeTaskResponsibility}>
                        <option value="#">Select Responsibility:</option>
                        {resItems}
                    </select>
                    <select id="res-nature" name="res-nature" onChange={changeTaskNature}>
                        <option value="#">Select Nature of Tasks:</option>
                        <option value="OneTime">One Time</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select><br /><br />
                    <p>Upload Reference Document</p><br />
                    <p></p>
                    <input type="file" id="myFile" name="filename" />
                    <input type="button" name="next" class="next action-button" value="Submit" onClick={submitForm}/>
                </fieldset>
            </form>
        </div>
    );
}

export default TaskCategorization;

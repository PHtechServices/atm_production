import { useState } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import "../css/taskCategorization.css"
import axios from 'axios';

function TaskCategorization(props) {

    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [department, setDepartment] = useState("");
    const [resItems, setResItems] = useState("");

    const staff = props.staffType

    const listItems = staff.map((item) =>
        <option value={item}>{item}</option>);

    const changeTaskDescription = (e) => {
        setTaskDescription(e.target.value);
    }

    const changeTaskPriority = (e) => {
        setTaskPriority(e.target.value);
    }

    const changeTaskDeadline = (e) => {
        setTaskDeadline(e.target.value);
    }

    const getDepartment = (e) => {
        setDepartment(e.target.value);
    }

    const onSubmitClick = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            "department": department
        }
        );

        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:5000/department',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                console.log(response.data)
                var responsibility = response.data["responsibilities"]
                const x = responsibility.map((item) =>
                <option value={item}>{item}</option>);
                setResItems(x)

            })
            .catch(function (error) {
                console.log(error);
            });


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
                    <select id="staff-type" name="staff-type" onChange={getDepartment}>
                        <option value="#">Select Department:</option>
                        {listItems}
                    </select>
                    <select id="res-type" name="res-type" onClick={onSubmitClick}>
                        <option value="#">Select Responsibility:</option>
                        {resItems}
                    </select>
                    <select id="res-nature" name="res-nature">
                        <option value="#">Select Nature of Tasks:</option>
                        <option value="OneTime">One Time</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
                    </select><br/><br/>
                    <p>Upload Reference Document</p><br/>
                    <p></p>
                    <input type="file" id="myFile" name="filename"/>
                    <input type="button" name="next" class="next action-button" value="Submit" />
                </fieldset>
            </form>
        </div>
    );
}

export default TaskCategorization;

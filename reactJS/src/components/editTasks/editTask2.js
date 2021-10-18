import { useState } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import "../createTask/taskCategorization.css"
import axios from 'axios';

function EditTaskCategorization(props) {
    const transferrableData = props.transferrableData

    let selectedOT = false
    let selectedDaily = false
    let selectedWeekly = false
    let selectedMonthly = false

    if (transferrableData["task nature"] == "OneTime") {
        selectedOT = true
    }
    else if (transferrableData["task nature"] == "Daily") {
        let selectedDaily = true
    }
    else if (transferrableData["task nature"] == "Weekly") {
        selectedWeekly = true
    }
    else if (transferrableData["task nature"] == "Monthly") {
        selectedMonthly = true
    }

    const [taskResponsibility, setTaskResponsibility] = useState("");
    const [taskDepartment, setTaskDepartment] = useState("");
    const [taskNature, setTaskNature] = useState("");
    const [resItems, setResponsib] = useState(props.resItems);
    const staff = props.staffType
    const listItems = props.listItems

    const changeTaskResponsibility = (e) => {
        transferrableData["task responsibility"] = e.target.value

    }

    const changeTaskDepartment = (e) => {
        transferrableData["task department"] = e.target.value

    }

    const changeTaskNature = (e) => {
        transferrableData["task nature"] = e.target.value

    }

    const submitForm = (e) => {
        e.preventDefault();
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

            const data1 = JSON.stringify(
                { "obj": props.id }
            );
    
            var config = {
                method: 'POST',
                url: 'http://34.136.41.197:5000/delete_collec',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data1
            };
            axios(config)
                .then(response => {
                    console.log(response.data)
    
                })
    }
    const onSubmitClick = (e) => {
        const data = JSON.stringify({
            "department": transferrableData["task department"]
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
                setResponsib(x)

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
                    <select id="staff-type" name="staff-type" onClick={onSubmitClick} onChange={changeTaskDepartment}>
                        <option value="#">Select Department:</option>
                        {listItems}
                    </select>
                    <select id="res-type" name="res-type" onChange={changeTaskResponsibility}>
                        <option value="#">Select Responsibility:</option>
                        {resItems}
                    </select>
                    <select id="res-nature" name="res-nature" onChange={changeTaskNature}>
                        <option value="#">Select Nature of Tasks:</option>
                        <option value="OneTime" selected={selectedOT}>One Time</option>
                        <option value="Daily" selected={selectedDaily}>Daily</option>
                        <option value="Weekly" selected={selectedWeekly}>Weekly</option>
                        <option value="Monthly" selected={selectedMonthly}>Monthly</option>
                    </select><br /><br />
                    <p>Upload Reference Document</p><br />
                    <p></p>
                    <input type="file" id="myFile" name="filename" />
                    <input type="button" name="next" class="next action-button" value="Submit" onClick={submitForm} />
                </fieldset>
            </form>
        </div>
    );
}

export default EditTaskCategorization;

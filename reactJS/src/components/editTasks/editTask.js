import { useState } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
import EditTaskCategorization from './editTask2';


function EditTask(props) {
    let selectedHigh = false
    let selectedMedium = false
    let selectedLow = false
    let selectedTeaching = false
    let selectedNonTeaching = false
    let resItems = []

    const getDescription = (e) => {
        transferrableData["task description"]=e.target.value

    }

    const getPriority = (e) => {
        transferrableData["task priority"]=e.target.value
    }

    const getDeadline = (e) => {
        transferrableData["task deadline"]=e.target.value
    }

    const getAssignedTo = (e) => {
        transferrableData["task assigned to"]=e.target.value
    }



    if (props.inputPlaceholder[6] == "high") {
        selectedHigh = true
    }
    else if (props.inputPlaceholder[6] == "medium") {
        selectedMedium = true
    }
    else if (props.inputPlaceholder[6] == "low") {
        selectedLow = true
    }

    if (props.inputPlaceholder[9] == "teachingStaff") {
        selectedTeaching = true
    }
    else if (props.inputPlaceholder[9] == "nonTeachingStaff") {
        selectedNonTeaching = true
    }
    const transferrableData = {
        "task description": props.inputPlaceholder[4],
        "task priority": props.inputPlaceholder[6],
        "task deadline": props.inputPlaceholder[2],
        "task assigned to": props.inputPlaceholder[0],
        "task assigned by": "admin@srishtiworldschools.in",
        "task type": props.inputPlaceholder[9],
        "task responsibility": props.inputPlaceholder[7],
        "task department": props.inputPlaceholder[3],
        "task nature": props.inputPlaceholder[5]
    }
    const onNextClick = (e) => {
        console.log(props.id)
        const data = JSON.stringify({
            "staffType": transferrableData["task type"]
        });

        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/staffDetails',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                var staffList = response.data["staffList"]
                const temp = []
                const listItems = staffList.map(item => {
                    if (item == transferrableData["task department"]) {
                        temp.push(<option value={item} selected>{item}</option>)
                    }

                    else { temp.push(<option value={item}>{item}</option>) }

                });
                console.log(resItems)
                ReactDOM.render(
                    <React.StrictMode>
                        <EditTaskCategorization id={props.id} resItems={resItems[0]} listItems={temp} staffType={staffList} transferrableData={transferrableData} />
                    </React.StrictMode>,
                    document.getElementById('dLogin'));
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
                const temp = []
                const x = responsibility.map(item => {
                    if (item == transferrableData["task responsibility"]) { temp.push(<option value={item} selected>{item}</option>) }
                    else { temp.push(<option value={item}>{item}</option>) }
                });
                resItems.push(temp)

            })
    }
    return (
        <div className="App" >
            <form id="msform">
                <ul id="progressbar">
                    <li class="active">General Information</li>
                    <li>Task Category Selection</li>
                </ul>
                <fieldset>
                    <h2 class="fs-title">Edit Task</h2>
                    <h3 class="fs-subtitle">General Information</h3>
                    <textarea type="text" name="email" placeholder={props.inputPlaceholder[4]} onChange={getDescription}/>
                    <select id="task-priority" name="task-priority" onChange={getPriority}>
                        <option value="#">Task Priority</option>
                        <option value="high" selected={selectedHigh}>High</option>
                        <option value="medium" selected={selectedMedium}>Medium</option>
                        <option value="low" selected={selectedLow}>Low</option>
                    </select>
                    <input type="date" id="birthday" name="Task Deadline" value={props.inputPlaceholder[2]} onChange={getDeadline}/>
                    <select id="task-categorization" name="task-categorization">
                        <option value="#">Select Staff Type</option>
                        <option value="teachingStaff" selected={selectedTeaching}>Teaching Staff</option>
                        <option value="nonTeachingStaff" selected={selectedNonTeaching}>Non-Teaching Staff</option>
                    </select>
                    <input type="email" id="birthday" placeholder="Assigned To" placeholder={props.inputPlaceholder[1]} onChange={getAssignedTo}/>
                    <input type="submit" name="next" class="action-button" value="Next" onClick={(e) => {e.preventDefault(); onSubmitClick(); onNextClick(); }} />
                </fieldset>
            </form>
        </div>
    );

}

export default EditTask;

import React from 'react';
import "./taskViewer.scss"
import CalendarAPI from '../googleAuth/calendar';
import UpdateTasks from '../updateTasks/updateTasks';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EditTask from '../editTasks/editTask';
import { useState } from 'react';
function TaskViewer(props) {
    const [colorTaskCreated, setColorCreated]=useState("")
    const [colorTaskUpdated, setColorUpdated]=useState("")
    const pop = props.pop

    const openTaskEditor = (e) => {
        var inputPlaceholder = []

    {
        const id = e.target.id
        console.log(id)
        const data = JSON.stringify({
            "objid": id
        });

        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:5000/getjson',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                const test = response.data["json"]
                const listItems = Object.keys(test).map((key, index) => (
                    inputPlaceholder.push(test[key])
                ))
                console.log(inputPlaceholder)
                ReactDOM.render(
                  <React.StrictMode>
                    <EditTask inputPlaceholder={inputPlaceholder} id={id}/>
                  </React.StrictMode>,
                  document.getElementById('dLogin'));
            })
            .catch(function (error) {
                console.log("error")
            });
    }
    }

    const openTaskUpdater = (e) => {

        const mail = props.mail
        console.log(mail)
        const id = e.target.id
        const pop = props.pop
        console.log(pop)
        const data = JSON.stringify({
            "taskID": id
        });

        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:5000/taskstatus',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                let x = "white"
                let y = "white"
                let ff = false
                var componentsInput = response.data["data"]
                if (componentsInput["title"] == "Start Task") {
                    x = "green"
                    y = "white"
                }
                else if (componentsInput["title"] == "Update Task Status") {
                   x = "grey"
                   y = "green"
                   ff = true
                }
                console.log(y)
                console.log(x)
                ReactDOM.render(
                    <React.StrictMode>
                        <UpdateTasks ff={ff} colorTaskCreated={x} colorTaskUpdated={y} componentsInput={componentsInput} mail={mail} pop={pop} id={id} />
                    </React.StrictMode>,
                    document.getElementById('dLogin'));
            })
            .catch(function (error) {
            });
    }
    const description = props.it
    let listItems
    if (props.msg == "tasks are not assigned"){
        listItems = <div>No Tasks to Display</div>
    }
    else {
        listItems = Object.keys(description).map((key, index) => (
            <tr>
                <td class="tick"><label id={description[key]} style={{color:pop[description[key]][0] == "medium" ? "orange" : pop[description[key]][0] == "high" ? "red" : "green"}}>{key}</label></td>
                {props.cTask && <td><button id={description[key]} onClick={openTaskEditor} class="offset">Edit</button></td>}
                <td><button id={description[key]} onClick={openTaskUpdater} class="offset">Update</button></td>
            </tr>
        ))
    }
    

    return (
        <div class="container App1">
            <div class="row">
                <div class="col-sm">
                    <div class="col-sm featureList">
                        <h5 style={{marginLeft:"-70%"}}>All Tasks</h5>
                        <table style={{ width: "350px" }} class="table table-bordered table-hover">
                            {listItems}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskViewer;
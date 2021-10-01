import React from 'react';
import "../css/updateTasks.css"
import { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import HomeScreen from '../homeScreen';
import TaskViewer from './tasksViewer';

function FirstPage(props) {
    const [startTaskPage, setStartTaskPage] = useState({
        "title": props.componentsInput["title"],
        "componentsInput": props.componentsInput["componentsInput"],
        "componentsButtons": props.componentsInput["componentsButtons"],
        "componentsUpload": props.componentsInput["componentsUpload"],
        "message": props.componentsInput["message"],
        "buttonValue": props.componentsInput["buttonValue"]
    });
    const [status, setStatus] = useState("")

    const changeScreen = (e) => {
        e.preventDefault();
        if (startTaskPage["title"] === "Start Task") {
            setStatus("Update Task")
            const data = JSON.stringify({
                "objid":"6152f2c8a4108f019de6a328",
                "message": "Update Task Status",
                "key": "task status"
            }
            );
    
            var config = {
                method: 'POST',
                url: 'http://127.0.0.1:5000/edit',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(response => {
                    setStartTaskPage({
                        "title": props.componentsInput["title"],
                        "componentsInput": props.componentsInput["componentsInput"],
                        "componentsButtons": props.componentsInput["componentsButtons"],
                        "componentsUpload": props.componentsInput["componentsUpload"],
                        "message": props.componentsInput["message"],
                        "buttonValue": props.componentsInput["buttonValue"]
                    })
                    const mail = props.mail
                    const data = JSON.stringify({
                        "assigned": mail
                    });

                    var config = {
                        method: 'POST',
                        url: 'http://127.0.0.1:5000/taskassign',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    axios(config)
                        .then(response => {
                            var description = response.data["data"]
                            const listItems = description.map((item) =>
                                <li className="nav-item has-treeview menu-open pb-3">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <li class="tick">{item}</li>
                                </li>

                            );
                            ReactDOM.render(
                                <React.StrictMode>
                                    <TaskViewer it={listItems} />
                                </React.StrictMode>,
                                document.getElementById('dLogin'));
                        })
                })      

        }
        else if (startTaskPage["title"] === "Update Task Status"){
                const data = JSON.stringify({
                    "objid":"6152f2c8a4108f019de6a328",
                    "message": "Task Completed Successfully",
                    "key": "task status"
                }
                );
        
                var config = {
                    method: 'POST',
                    url: 'http://127.0.0.1:5000/edit',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                axios(config)
                    .then(response => {
                        setStartTaskPage({
                            "title": props.componentsInput["title"],
                            "componentsInput": props.componentsInput["componentsInput"],
                            "componentsButtons": props.componentsInput["componentsButtons"],
                            "componentsUpload": props.componentsInput["componentsUpload"],
                            "message": props.componentsInput["message"],
                            "buttonValue": props.componentsInput["buttonValue"]
                        })
                        const mail = props.mail
                    const data = JSON.stringify({
                        "assigned": mail
                    });

                    var config = {
                        method: 'POST',
                        url: 'http://127.0.0.1:5000/taskassign',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    axios(config)
                        .then(response => {
                            var description = response.data["data"]
                            const listItems = description.map((item) =>
                                <li className="nav-item has-treeview menu-open pb-3">
                                    <i className="nav-icon fas fa-tachometer-alt"></i>
                                    <li class="tick">{item}</li>
                                </li>

                            );
                            ReactDOM.render(
                                <React.StrictMode>
                                    <TaskViewer it={listItems} />
                                </React.StrictMode>,
                                document.getElementById('dLogin'));
                        })
                })
        }
        else if(startTaskPage["title"] === "Task Completed Successfully"){
            ReactDOM.render(
                <React.StrictMode>
                  <HomeScreen name={props.name} />
                </React.StrictMode>,
                document.getElementById('dLogin')
              );
        }
    }
    
    const listUpdateTaskPageInputs = startTaskPage["componentsInput"].map((item) =>
        <input type="text" name="email" placeholder={item} readOnly />
    );
    const listUpdateTaskPageUpload = startTaskPage["componentsUpload"].map((item) =>
        <input type="file" name="email" placeholder={item} readOnly />
    );
    const listUpdateTaskPageButtons = startTaskPage["componentsButtons"].map((item) =>
        <input type="submit" name="email" value={item} readOnly />
    );
    const title = <h2 class="fs-title">{startTaskPage["title"]}</h2>

    const btn = <input type="submit" name="next" class="action-button" value={startTaskPage["buttonValue"]} onClick={changeScreen} />

    return (
        <form id="msform">
            <fieldset>
                {title}
                {listUpdateTaskPageInputs}
                {listUpdateTaskPageUpload}
                {listUpdateTaskPageButtons}
                {btn}
            </fieldset>
        </form>
    );

}

export default FirstPage;
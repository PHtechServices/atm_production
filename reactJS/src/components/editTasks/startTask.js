import React, { useEffect } from 'react';
import "./startTask.css"
import { useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import HomeScreen from '../home/homeScreen';
import TaskViewer from '../taskView/tasksViewer';
import EditTask from './editTask';
import UpdateTasks from '../updateTasks/updateTasks';

function FirstPage(props) {
    const [startTaskPage, setStartTaskPage] = useState({
        "title": props.componentsInput["title"],
        "componentsInput": props.componentsInput["componentsInput"],
        "componentsButtons": props.componentsInput["componentsButtons"],
        "componentsUpload": props.componentsInput["componentsUpload"],
        "message": props.componentsInput["message"],
        "buttonValue": props.componentsInput["buttonValue"],
        "status": props.componentsInput["view"]
    });
    const [status, setStatus] = useState("")
    const [comments, setComments] = useState("")
    const [com, setCom] = useState()
    const [dd, setDd] = useState(false)
    const pop = props.pop
    const id = props.id
    const ff = props.ff

    useEffect(() => {
        const id = props.id
                    const data = JSON.stringify({
                        "id": id
                    });

                    var config = {
                        method: 'POST',
                        url: 'http://127.0.0.1:5000/getComments',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    axios(config)
                        .then(response => {
                            var comments1 = response.data["comments"]
                            if (comments1.length != 0){setDd(true)
                                setCom(comments1.map((item) =>
                                Object.keys(item).map((key, index) => (
                                    <p>{item[key]}</p>)))
        );}
                            
                        })
     });



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

    const getComments = (e) => {
        setComments(e.target.value)
    }

    const markAsComplete = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            "objid": props.id,
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
                    "buttonValue": props.componentsInput["buttonValue"],
                    "status": props.componentsInput["view"]
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
                        var pop = response.data["populator"]
                        let listItems
                        if (props.msg == "tasks are not assigned"){
                            listItems = <div>No Tasks to Display</div>
                        }
                        else {
                            listItems = Object.keys(description).map((key, index) => (
                                <tr>
                                    <td class="tick"><label id={description[key]}>{key}</label></td>
                                    {props.cTask && <td><button id={description[key]} onClick={openTaskEditor} class="offset">Edit</button></td>}
                                    <td><button id={description[key]} onClick={openTaskUpdater} class="offset">Update</button></td>
                                </tr>
                            ))
                        }
                    })
            })
    }

    const changeScreen = (e) => {
        e.preventDefault();
        if (startTaskPage["title"] === "Start Task") {
            const data = JSON.stringify({
                "objid": props.id,
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
                        "buttonValue": props.componentsInput["buttonValue"],
                        "status": props.componentsInput["view"]
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
                            var pop = response.data["populator"]
                            ReactDOM.render(
                                <React.StrictMode>
                                    <TaskViewer it={description} pop={pop} const mail={props.mail} />
                                </React.StrictMode>,
                                document.getElementById('dLogin'));
                        })
                })

        }
        else if (startTaskPage["title"] === "Update Task Status") {
            const data = JSON.stringify({
                "data": { "comments": comments },
                "objid": id
            }
            );

            var config = {
                method: 'POST',
                url: 'http://127.0.0.1:5000/updateComments',
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
                        "buttonValue": props.componentsInput["buttonValue"],
                        "status": props.componentsInput["status"]
                    })
                })
        }
        else if (startTaskPage["title"] === "Task Completed Successfully") {
            ReactDOM.render(
                <React.StrictMode>
                    <HomeScreen name={props.name} />
                </React.StrictMode>,
                document.getElementById('dLogin')
            );
        }
    }
    console.log(startTaskPage["status"])
    const listUpdateTaskPageInputs = startTaskPage["componentsInput"].map((item, index) =>
        <label>{item}
            <input id="inputValues" type="text" name="email" placeholder={pop[id][index]} readOnly={startTaskPage["status"]} style={{ width: "340px" }} onChange={getComments} /></label>

    );
    const listUpdateTaskPageUpload = startTaskPage["componentsUpload"].map((item) =>
        <input type="file" name="email" placeholder={item} readOnly />
    );
    const listUpdateTaskPageButtons = startTaskPage["componentsButtons"].map((item) =>
        <input type="submit" name="email" value={item} readOnly />
    );
    const title = <h2 class="fs-title">{startTaskPage["title"]}</h2>

    const btn = <input type="submit" name="next" class="action-button" value={startTaskPage["buttonValue"]} onClick={changeScreen} />
    const btn2 = <input type="submit" name="next" class="action-button" value="Mark as Complete" style={{ width: "200px" }} onClick={markAsComplete} />

    return (
        <form id="msform">
            <fieldset>
                {title}
                {listUpdateTaskPageInputs}
                {listUpdateTaskPageUpload}
                {listUpdateTaskPageButtons}
                {dd && <label>Comments:</label>}
                {dd && com}
                {btn}
                {ff && btn2}
            </fieldset>
        </form>
    );

}

export default FirstPage;
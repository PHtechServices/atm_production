import React from 'react';
import "./taskViewer.scss"
import CalendarAPI from '../googleAuth/calendar';
import UpdateTasks from '../updateTasks/updateTasks';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EditTask from '../editTasks/editTask';
import { useState } from 'react';



const PlusIcon = () => {
    return (
        <span className="panel__header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="currentColor" d="M14,7H9V2A1,1,0,0,0,7,2V7H2A1,1,0,0,0,2,9H7v5a1,1,0,0,0,2,0V9h5a1,1,0,0,0,0-2Z" />
            </svg>
        </span>
    )
}

const MinusIcon = () => {
    return (
        <span className="panel__header-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                <path fill="currentColor" d="M14,9H2A1,1,0,0,1,2,7H14a1,1,0,0,1,0,2Z" />
            </svg>
        </span>
    )
}

const PanelHeader = props => {
    return (
        <button
            className="panel__header"
            onClick={props.handleToggle}
            onKeyDown={props.handleKeyDown}
            aria-expanded={props.isExpanded}
        >
            {props.children}
            {props.isExpanded ? <MinusIcon /> : <PlusIcon />}
        </button>
    )
}

const PanelBody = props => {
    return (
        <div className="panel__body" aria-hidden={props.isExpanded}>
            {props.children}
        </div>
    )
}

const PanelGroup = props => {
    return (
        <div className="panel-group" role="group">
            {props.children}
        </div>
    )
}

class Panel extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isExpanded: props.openDefault
        }

        this.handleToggle = this.handleToggle.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    handleToggle() {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    handleKeyDown(event) {
        if (event.keyCode == 40) {
            event.preventDefault();
            this.setState({
                isExpanded: true
            })
        }

        if (event.keyCode == 38) {
            event.preventDefault();
            this.setState({
                isExpanded: false
            })
        }
    }

    render() {
        return (
            <div className="panel">
                <PanelHeader
                    handleToggle={this.handleToggle}
                    handleKeyDown={this.handleKeyDown}
                    isExpanded={this.state.isExpanded}
                >
                    {this.props.title}
                </PanelHeader>
                <PanelBody isExpanded={!this.state.isExpanded}>
                    {this.props.children}
                </PanelBody>
            </div>
        )
    }
}

function TaskViewer(props) {
    const [colorTaskCreated, setColorCreated] = useState("")
    const [colorTaskUpdated, setColorUpdated] = useState("")
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
                            <EditTask inputPlaceholder={inputPlaceholder} id={id} />
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
    if (props.msg == "tasks are not assigned") {
        listItems = <div>No Tasks to Display</div>
    }
    else {
        listItems = Object.keys(description).map((key, index) => (
            <tr>
                <td class="tick"><label id={description[key]}>{key}</label></td>
                {/* style={{ color: pop[description[key]][0] == "medium" ? "orange" : pop[description[key]][0] == "high" ? "red" : "green" }} */}
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
                        <PanelGroup>
                            <Panel title="Active Tasks"> {/* openDefault={true} */}
                                <table style={{ width: "600px", marginLeft: "-1.5%" }} class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Option</th>
                                            <th>Priority</th>
                                        </tr>
                                    </thead>
                                    {listItems}
                                </table>
                            </Panel>
                            <Panel title="Urgent Tasks">
                                <table style={{ width: "600px", marginLeft: "-1.5%" }} class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Option</th>
                                            <th>Priority</th>
                                        </tr>
                                    </thead>
                                    {listItems}
                                </table>
                            </Panel>
                            <Panel title="Backlogs">
                                <table style={{ width: "600px", marginLeft: "-1.5%" }} class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Option</th>
                                            <th>Priority</th>
                                        </tr>
                                    </thead>
                                    {listItems}
                                </table>
                            </Panel>
                            <Panel title="Future Tasks">
                                <table style={{ width: "600px", marginLeft: "-1.5%" }} class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Option</th>
                                            <th>Priority</th>
                                        </tr>
                                    </thead>
                                    {listItems}
                                </table>
                            </Panel>
                        </PanelGroup>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TaskViewer;
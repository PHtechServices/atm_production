import React from 'react';
import "./taskViewer.scss"
import CalendarAPI from '../googleAuth/calendar';
import UpdateTasks from '../updateTasks/updateTasks';
import ReactDOM from 'react-dom';
import axios from 'axios';
import EditTask from '../editTasks/editTask';
function TaskViewer(props) {

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
                var componentsInput = response.data["data"]
                ReactDOM.render(
                    <React.StrictMode>
                        <UpdateTasks componentsInput={componentsInput} mail={mail} pop={pop} id={id} />
                    </React.StrictMode>,
                    document.getElementById('dLogin'));
            })
            .catch(function (error) {
            });
    }
    const description = props.it
    const listItems = Object.keys(description).map((key, index) => (
        <tr>
            <td class="tick"><label id={description[key]}>{key}</label></td>
            {props.cTask && <td><button id={description[key]} onClick={openTaskEditor} class="offset">Edit</button></td>}
            <td><button id={description[key]} onClick={openTaskUpdater} class="offset">Update</button></td>
        </tr>
    ))

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="col-sm featureList">
                        <h3>Active Tasks</h3>
                        <table style={{ width: "350px" }} class="table table-bordered table-hover">
                            {listItems}
                        </table>
                    </div>
                    <div class="col-sm featureList">
                        <h3>Upcoming Tasks</h3>
                        <table style={{ width: "350px" }} class="table table-bordered table-hover">
                            {listItems}
                        </table>
                    </div>
                    <div class="col-sm featureList">
                        <h3>Backlog</h3>
                        <table style={{ width: "350px" }} class="table table-bordered table-hover">
                            {listItems}
                        </table>
                    </div>
                    <div class="col-sm featureList">
                        <h3>Urgent Tasks</h3>
                        <table style={{ width: "350px" }} class="table table-bordered table-hover">
                            {listItems}
                        </table>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="col-sm featureList">
                        <CalendarAPI />
                        {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&mode=WEEK&src=cG9odWxhYnNAc3Jpc2h0aXdvcmxkc2Nob29scy5pbg&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IuaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" style="border:solid 1px #777" width="5" height="5" frameborder="0" scrolling="yes"></iframe> */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default TaskViewer;
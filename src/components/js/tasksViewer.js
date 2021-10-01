import React from 'react';
import "../css/taskViewer.css"
import CalendarAPI from './calendar';
import UpdateTasks from './updateTasks';
import ReactDOM from 'react-dom';
import axios from 'axios';

function TaskViewer(props) {

    const openTaskUpdater = (e) => {

        const mail = props.mail
        const id = e.target.id
        console.log(id)
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
                        <UpdateTasks componentsInput={componentsInput} mail={mail} />
                    </React.StrictMode>,
                    document.getElementById('dLogin'));
            })
            .catch(function (error) {
            });
    }
    const description = props.it
    const listItems = Object.keys(description).map((key, index) => (
        <li className="nav-item has-treeview menu-open pb-3">
            <i className="nav-icon fas fa-tachometer-alt"></i>
            <li class="tick"><a href="#" id={description[key]} onClick={openTaskUpdater}>{key}</a></li>
        </li>
    ))

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="col-sm featureList">
                        <h3>Active Tasks</h3>
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                    <div class="col-sm featureList">
                        <h3>Upcoming Tasks</h3>
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                    <div class="col-sm featureList">
                        <h3>Backlog</h3>
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                    <div class="col-sm featureList">
                        <h3>Urgent Tasks</h3>
                        <ul>
                            {listItems}
                        </ul>
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
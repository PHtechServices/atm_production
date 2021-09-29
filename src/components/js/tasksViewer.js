import React from 'react';
import "../css/taskViewer.css"
import CalendarAPI from './calendar';
import UpdateTasks from './updateTasks';
import ReactDOM from 'react-dom';

function TaskViewer(props) {

    const openTaskUpdater = () => {
        ReactDOM.render(
            <React.StrictMode>
                <UpdateTasks />
            </React.StrictMode>,
            document.getElementById('dLogin')
        );
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="col-sm featureList">
                        <h3>Active Tasks</h3>
                        <ul>
                            {props.it}
                        </ul>
                    </div>
                    <div class="col-sm featureList">
                        <h3>Upcoming Tasks</h3>
                        <ul>
                            <li onClick={openTaskUpdater}>Task A</li>
                            <li>Task B</li>
                            <li>Task C</li>
                            <li>Task A</li>
                            <li>Task B</li>
                            <li>Task C</li>
                        </ul>
                    </div>
                    <div class="col-sm featureList">
                        <h3>Backlog</h3>
                        <ul>
                            <li>Task A</li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm">
                    <div class="col-sm featureList">
                        <CalendarAPI />
                        {/* <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&mode=WEEK&src=cG9odWxhYnNAc3Jpc2h0aXdvcmxkc2Nob29scy5pbg&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4tZ2IuaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043" style="border:solid 1px #777" width="5" height="5" frameborder="0" scrolling="yes"></iframe> */}
                    </div>
                    <div class="col-sm featureList">
                        <h3>Urgent Tasks</h3>
                        <ul>
                            <li>Task A</li>
                            <li>Task B</li>
                            <li>Task C</li>
                            <li>Task A</li>
                            <li>Task B</li>
                            <li>Task C</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskViewer;
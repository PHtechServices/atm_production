import React from 'react';
import "../css/taskViewer.css"

function TaskViewer(props) {

    return (
        <div id="task">
            <div class="row">
                <div className="col-md-4">
                    <div class="list">

                        <h3 class="list-title">Tasks Assigned to You</h3>

                        <ul class="list-items">
                            {props.it}
                        </ul>



                    </div>
                </div>
                <div className="col-md-4">
                    <div class="list">

                        <h3 class="list-title">Tasks to be Approved by You</h3>

                        <ul class="list-items">
                            {props.it}
                        </ul>



                    </div>
                </div>
                <div className="col-md-4">
                    <div class="list">

                        <h3 class="list-title">Urgent Tasks</h3>

                        <ul class="list-items">
                            {props.it}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskViewer;
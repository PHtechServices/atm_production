import React from 'react';
import "../css/taskViewer.css"

function TaskViewer(props) {

    return (
        <div id="task">
                    <div class="list">

                        <h3>My Tasks</h3>

                        <ul class="featureList">
                            {props.it}
                        </ul>



                    </div>
        </div>
    );
}

export default TaskViewer;
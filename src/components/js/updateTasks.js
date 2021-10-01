import React from 'react';
import "../css/updateTasks.css"
import firstPage from './startTask';
import ReactDOM from 'react-dom';
import FirstPage from './startTask';

function UpdateTasks(props) {

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-5 taskPage">
                    <FirstPage componentsInput={props.componentsInput} mail={props.mail}/>
                </div>
                <div class="col-sm-7">
                    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic' rel='stylesheet' type='text/css' />

                    <ul class="timeline">
                        <li>
                            <div class="direction-r">
                                <div class="flag-wrapper">
                                    <span class="flag">Task Created</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="direction-l">
                                <div class="flag-wrapper">
                                    <span class="flag">Task Started</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="direction-r">
                                <div class="flag-wrapper">
                                    <span class="flag">Issues</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="direction-l">
                                <div class="flag-wrapper">
                                    <span class="flag">Task Completed</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UpdateTasks;
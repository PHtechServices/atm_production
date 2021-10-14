import React, { useState } from 'react';
import "./updateTasks.css"
import ReactDOM from 'react-dom';
import FirstPage from '../editTasks/startTask';

function UpdateTasks(props) {

    const colorTaskCreated = props.colorTaskCreated
    const colorTaskUpdated = props.colorTaskUpdated
    console.log(colorTaskCreated)

    return (
        <div class="container App2">
            <div class="row">
                <div class="col-sm-5 taskPage">
                    <FirstPage ff={props.ff} componentsInput={props.componentsInput} mail={props.mail} pop = {props.pop} id={props.id}/>
                </div>
                {/* <div class="col-sm-7">
                    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic' rel='stylesheet' type='text/css' />

                    <ul class="timeline">
                        <li>
                            <div class="direction-r">
                                <div class="flag-wrapper">
                                    <span class="flag my-color-1" style={{backgroundColor:colorTaskCreated}}>Task Created</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="direction-l">
                                <div class="flag-wrapper">
                                <span class="flag my-color" style={{backgroundColor:colorTaskUpdated}}>Task Started</span>
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
                </div> */}
            </div>
        </div>
    );
}

export default UpdateTasks;
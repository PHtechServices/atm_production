import React from 'react';
import "../css/updateTasks.css"

function UpdateTasks(props) {

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <form id="msform">
                        <fieldset>
                            <h2 class="fs-title">Create a Task</h2>
                            <h3 class="fs-subtitle">General Information</h3>
                            <textarea type="text" name="email" placeholder="Task Description" required autoFocus />
                            <select id="task-priority" name="task-priority" required>
                                <option value="#">Task Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <input type="date" id="birthday" name="Task Deadline" required />
                            <select id="task-categorization" name="task-categorization" required>
                                <option value="#">Select Staff Type</option>
                                <option value="teachingStaff">Teaching Staff</option>
                                <option value="nonTeachingStaff">Non-Teaching Staff</option>
                            </select>
                            <input type="email" id="birthday" placeholder="Assigned To" required />
                            <input type="submit" name="next" class="action-button" value="Next" />
                        </fieldset>
                    </form>
                </div>
                <div class="col-sm">
                    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic' rel='stylesheet' type='text/css' />

                    <ul class="timeline">
                        <li>
                            <div class="direction-r">
                                <div class="flag-wrapper">
                                    <span class="flag">Freelancer</span>
                                    <span class="time-wrapper"><span class="time">2013 - present</span></span>
                                </div>
                                <div class="desc">My current employment. Way better than the position before!</div>
                            </div>
                        </li>
                        <li>
                            <div class="direction-l">
                                <div class="flag-wrapper">
                                    <span class="flag">Apple Inc.</span>
                                    <span class="time-wrapper"><span class="time">2011 - 2013</span></span>
                                </div>
                                <div class="desc">My first employer. All the stuff I've learned and projects I've been working on.</div>
                            </div>
                        </li>
                        <li>
                            <div class="direction-r">
                                <div class="flag-wrapper">
                                    <span class="flag">Harvard University</span>
                                    <span class="time-wrapper"><span class="time">2008 - 2011</span></span>
                                </div>
                                <div class="desc">A description of all the lectures and courses I have taken and my final degree?</div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UpdateTasks;
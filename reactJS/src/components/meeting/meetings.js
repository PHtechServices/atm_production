import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

import "../createTask/taskCategorization.css"

import 'reactjs-popup/dist/index.css';

function Meeting() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [summary, setSummary] = useState("")
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [attendees, setAttendees] = useState("")
    const [teachers, setTeachers] = useState([]);
    const [nonTeachers, setNonTeachers] = useState([]);
    const startDateTime = "T" + startTime + ":00" + "+05:30"
    const endDateTime = "T" + endTime + ":00" + "+05:30"
    const set_title = (e) => {
        setTitle(e.target.value);
    }
    const set_description = (e) => {
        setDescription(e.target.value);
    }
    const set_summary = (e) => {
        setSummary(e.target.value);
    }
    const set_date = (e) => {
        setDate(e.target.value);
    }
    const set_starttime = (e) => {
        setStartTime(e.target.value);
    }
    const set_endtime = (e) => {
        setEndTime(e.target.value);
    }


    const teachersList = (e) => {
        var config = {
            method: 'get',
            url: 'http://34.136.41.197:5000/getTeachersList',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        axios(config)
            .then(response => {
                const data1 = response.data["test"]
                const data2 = response.data["test1"]
                setTeachers(Object.keys(data1).map((key, index) => (
                    <option value={key} id={key}>{data1[key]}</option>)))

                setNonTeachers(Object.keys(data2).map((key, index) => (
                    <option value={key} id={key}>{data2[key]}</option>)))
            })
    }

    const getAttendees = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setAttendees(value);
    }

    const submitData = (e) => {
        e.preventDefault();
        const data = JSON.stringify({
                "data": {
                    "description": description,
                    "summary": summary,
                    "date": date,
                    "startTime": startDateTime,
                    "endTime": endDateTime,
                    "attendees": attendees
                }
          });

          console.log(data)

    var config = {
        method: 'POST',
        url: 'http://34.136.41.197:5000/createMeeting',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(response => {
            console.log(data)
        })

}

return (
    <div id="App" class="App">
        <form id="msform" onSubmit={submitData}>
            <fieldset>
                <h2 class="fs-title">Schedule a Meeting</h2>
                <input type="text" id="email" placeholder="Meeting Title" required autofocus onChange={set_title} />
                <input type="text" id="name" placeholder="Meeting Description" required onChange={set_description} />
                <input type="text" id="name" placeholder="Meeting Summary" required onChange={set_summary} />
                <input type="date" id="name" placeholder="Select Date" required onChange={set_date} />
                <input type="time" id="name" placeholder="Start Time" required onChange={set_starttime} />
                <input type="time" id="name" placeholder="End Time" required onChange={set_endtime} />
                <select id="attendees-categorization" name="attendees-categorization" required multiple size="5" onChange={getAttendees} onClick={teachersList}>
                    <option value="#">Select Attendees</option>
                    {teachers.concat(nonTeachers)}
                </select>
                <input type="submit" name="next" class="action-button" value="Submit" />
            </fieldset>
        </form>
    </div>
);
}

export default Meeting;

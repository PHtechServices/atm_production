import { useState } from 'react';
import TaskCategorization from "../createTask/taskCategorization"
import ReactDOM from 'react-dom';
import React from 'react';
import "../createTask//taskCategorization.css"
import axios from 'axios';
import HomeScreen from '../home/homeScreen';


function AssignTeacher(props) {

    const [classes, setClasses] = useState("");
    const [listsections, setListSections] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [nonTeachers, setNonTeachers] = useState([]);
    const [section, setSection] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [teacherName, setTeacherName] = useState("")
    const [reporting, setReporting] = useState("")

    const classItems = props.classInfo.map((item) =>
        <option value={item}>{item}</option>);
    
        const subjectItems = props.subjectInfo.map((item) =>
        <option value={item}>{item}</option>);
    
    const teachersList = (e) => {
        var config = {
            method: 'GET',
            url: 'http://34.136.41.197:5000/getTeachersList',
            headers: {
              'Content-Type': 'application/json'
            },
          };
      
          axios(config)
            .then(response => {
               const data1 = response.data["test"]
              setTeachers(Object.keys(data1).map((key, index) => (
                <option value={key} id={key}>{data1[key]}</option>)))
            })
        }


        const reportingList = (e) => {
            var config = {
                method: 'GET',
                url: 'http://34.136.41.197:5000/getTeachersList',
                headers: {
                  'Content-Type': 'application/json'
                },
              };
          
              axios(config)
                .then(response => {
                const data1 = response.data["test1"]
                  setNonTeachers(Object.keys(data1).map((key, index) => (
                    <option value={key} id={key}>{data1[key]}</option>)))
                })
            }

    const assignClass = (e) => {
        setClasses(e.target.value);
    }

    const listSections = (e) => {
        const data = JSON.stringify({
            "class": classes
        });

        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/sectionInfo',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                var sections = response.data["xx"]
                console.log(sections)
                setListSections(sections.map((item) =>
                    <option value={item}>{item}</option>))
            })
    }

    const assignSection = (e) => {
        setSection(e.target.value);
    }

    const getSubjects = (e) => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
            value.push(options[i].value);
            }
        }
        setSubjects(value);
    }

    const getTeacher = (e) => {
        setTeacherName(e.target.value);
    }
    console.log(teacherName)

    const assignReporting = (e) => {
        setReporting(e.target.value);
    }

    const submitForm = (e) => {
        e.preventDefault();
        const data = JSON.stringify(
            {    "id": teacherName,
            "classTeacher": classes+"-"+section,
            "subjectTeacher": subjects,
            "reportingManager": reporting
        }
        );

        var config = {
            method: 'POST',
            url: 'http://34.136.41.197:5000/teacherRS',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
            .then(response => {
                var staffList = response.data
                console.log(staffList)

            })
            ReactDOM.render(
                <React.StrictMode>
                  <HomeScreen name={props.name} />
                </React.StrictMode>,
                document.getElementById('dLogin'));
            }


    return (
        <div className="App" class="App">
            <form id="msform">
                <fieldset>
                    <h2 class="fs-title">Teacher Assignment</h2>
                    <select id="selectTeacher" name="selectTeacher" onChange={getTeacher} onClick={teachersList} required>
                        <option value="#">Select Teacher</option>
                        {teachers}
                    </select>
                    <select id="assignClass" name="assignClass" onChange={assignClass} required>
                        <option value="#">Assign Class</option>
                        {classItems}
                    </select>
                    <select id="assignSection" name="assignSection" onChange={assignSection} onClick={listSections} required>
                        <option value="#">Assign Section</option>
                        {listsections}
                    </select>
                    <label>Select one or more subjects </label>
                    <select id="assignSubject" name="assignSubject" multiple size="3" onChange={getSubjects} required>
                        {subjectItems}
                    </select>
                    <select id="reportingTo" name="reportingTo" onClick={reportingList} onChange={assignReporting} required>
                        <option value="#">Reporting To</option>
                        {nonTeachers}
                    </select>
                    <input type="submit" name="next" class="action-button" value="Next" onClick={submitForm} />
                </fieldset>
            </form>
        </div>
    );
}

export default AssignTeacher;

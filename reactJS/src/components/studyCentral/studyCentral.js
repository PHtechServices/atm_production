import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/system';
import ReactDOM from 'react-dom';

import { Fragment, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';



export default function InsertCentral(props) {
    const [class1, setClass] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [day, setDay] = React.useState("");
    const [section, setSection] = React.useState("");
    const [startTime, setStartTime] = React.useState(new Date('2021-09-31T21:11:54'));
    const [endTime, setEndTime] = React.useState(new Date('2021-09-31T21:11:54'));
    const [teacher, setTeacher] = React.useState("");
    const [sectionList, setListSections]= React.useState([]);
    const [teachersList, setTeachers]= React.useState([]);

    const classItems = props.classInfo.map((item) =>
        <MenuItem value={item}>{item}</MenuItem>);

    const subjectItems = props.subjectInfo.map((item) =>
        <MenuItem value={item}>{item}</MenuItem>);

    const submitClass = (newValue) => {
        setClass(newValue.target.value);
    };
    const submitDay = (newValue) => {
        setDay(newValue.target.value);
    };
    const submitSubject = (newValue) => {
        setSubject(newValue.target.value);
    };
    const submitSection = (newValue) => {
        setSection(newValue.target.value);
    };
    const submitStartTime = (newValue) => {
        setStartTime(newValue);
    };
    const submitEndTime = (newValue) => {
        setEndTime(newValue);
    };
    const submitTeacher = (newValue) => {
        setTeacher(newValue.target.value);
    };
    const onSubmitButton = (newValue) => {
        const data = JSON.stringify({
            "class":class1,
            "day":day,
            "subject":subject,
            "section":section,
            "startTime":startTime,
            "endTime":endTime,
            "teacher":teacher
          });
      
          var config = {
            method: 'POST',
            url: 'http://127.0.0.1:5000/studyCentral',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          };
      
          axios(config)
            .then(response => {
                var config = {
                    method: 'GET',
                    url: 'http://127.0.0.1:5000/classInfo',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                  };
              
                  axios(config)
                    .then(response => {
                        setClass("")
                        setDay("")
                        setSubject("")
                        setSection("")
                        setStartTime('2021-09-31T21:11:54')
                        setEndTime('2021-09-31T21:11:54')
                        setTeacher("")
                        setListSections([])
                        setTeachers([])
                        
              })
            })    };

    const listSections = (e) => {
        const data = JSON.stringify({
            "class": class1
        });

        var config = {
            method: 'POST',
            url: 'http://127.0.0.1:5000/sectionInfo',
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
                <MenuItem value={item}>{item}</MenuItem>))
            })
    }

    const teachersList1 = (e) => {
        var config = {
            method: 'GET',
            url: 'http://127.0.0.1:5000/getTeachersList',
            headers: {
              'Content-Type': 'application/json'
            },
          };
      
          axios(config)
            .then(response => {
               const data1 = response.data["test"]
              setTeachers(Object.keys(data1).map((key, index) => (
                <MenuItem value={data1[key]}>{data1[key]}</MenuItem>)))
            })
        }

    return (
        <Box style={{ marginLeft: "-100%", marginTop: "5%" }}>
            <Typography variant="h4" gutterBottom component="div">
                Add Tasks in Study Central
            </Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Class</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    onChange={submitClass}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {classItems}
                </Select>
            </FormControl><br />
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Day</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    onChange={submitDay}
                >
                    <MenuItem value="">
                    <em>Selece Day</em>
                        </MenuItem>
                    <MenuItem value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednessday">Wednessday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                    <MenuItem value="Friday">Friday</MenuItem>
                    <MenuItem value="Saturday">Saturday</MenuItem>
                </Select>
            </FormControl><br />
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Section</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    onChange={submitSection}
                    onClick={listSections}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                   {sectionList}
                </Select>
            </FormControl><br />
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Subject</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    onChange={submitSubject}
                    
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {subjectItems}
                </Select>
            </FormControl><br />
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Select Teacher</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    onChange={submitTeacher}
                    onClick={teachersList1}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {teachersList}
                </Select>
            </FormControl><br />
            <FormControl sx={{ m: 1, width: 300 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={submitStartTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </FormControl><br />
            <FormControl sx={{ m: 1, width: 300 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="End Time"
                        value={endTime}
                        onChange={submitEndTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </FormControl><br/>
            <FormControl sx={{ m: 1, width: 300 }}>
            <Button variant="outlined" onClick={onSubmitButton}>Submit</Button>
            </FormControl>
        </Box>

    );
}
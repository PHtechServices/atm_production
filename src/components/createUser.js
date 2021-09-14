import { useState } from 'react';
import axios from 'axios';
import './loginScreen.css'
import React from 'react';
import CreateTask from './createTask';
import ReactDOM from 'react-dom';

function CreateUser() {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState("");
    const [Name, setName] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const enterUID = (e) => {
        setUserId(e.target.value);
    }

    const enterUser = (e) => {
        setUser(e.target.value);
    }

    const enterName = (e) => {
        setName(e.target.value);
    }

    const enterUserName = (e) => {
        setUsername(e.target.value);
    }

    const enterPassword = (e) => {
        setPassword(e.target.value);
    }

    const enterRole = (e) => {
        setRole(e.target.value);
    }

    const createNewUser = () => {

        var data = JSON.stringify({
            "Users": {
                "userId": userId,
                "user": user,
                "Name": Name,
                "Username": Username,
                "Password": Password,
                "role": role
            }
        });

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/createuser',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
            ReactDOM.render(
                <React.StrictMode>
                  <CreateTask />
                </React.StrictMode>,
                document.getElementById('dLogin'));
    }
    return (
        <div id="createUserScreen">
            <form id="contact">
                <h3>Create a New User</h3>
                <fieldset>
                    <input placeholder="User ID" onChange={enterUID} type="text" tabindex="1" required autofocus />
                </fieldset>
                <fieldset>
                    <input placeholder="Name" onChange={enterName} type="text" tabindex="1" required autofocus />
                </fieldset>
                <fieldset>
                    <select placeholder="User Type" onChange={enterUser} name="cars" id="cars">
                        <option value="Please Select">Select User Type:</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Principal">Principal</option>
                        <option value="Director">Director</option>
                        <option value="Dean">Dean</option>
                    </select>
                </fieldset>
                <fieldset>
                    <input placeholder="Unique User Name" onChange={enterUserName} type="text" tabindex="1" required autofocus />
                </fieldset>
                <fieldset>
                    <input placeholder="Password" onChange={enterPassword} type="text" tabindex="2" required />
                </fieldset>
                <fieldset>
                    <select placeholder="User Type" onChange={enterRole} name="cars" id="cars">
                        <option value="Please Select">Select User Role:</option>
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Read">Read</option>
                        <option value="Write">Write</option>
                    </select>
                </fieldset>
                <fieldset>
                    <button type="submit" onClick={createNewUser}>Submit</button>
                </fieldset>
            </form>
        </div>
    );
}

export default CreateUser;

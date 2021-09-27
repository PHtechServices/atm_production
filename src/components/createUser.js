import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import HomeScreen from './homeScreen';
import "./css/taskCategorization.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function CreateUser() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");

    const get_email = (e) => {
        setEmail(e.target.value);
    }

    const get_firstName = (e) => {
        setFirstName(e.target.value);
    }

    const get_lastName = (e) => {
        setLastName(e.target.value);
    }
    const get_password = (e) => {
        setPassword(e.target.value);
    }

    const get_address = (e) => {
        setAddress(e.target.value);
    }

    const get_phone = (e) => {
        setPhone(e.target.value);
    }

    const get_title = (e) => {
        setTitle(e.target.value);
    }

    const createNewUser = (e) => {
        e.preventDefault();
        var data = JSON.stringify({
            "UserDetails": {
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "password": password,
                "address": address,
                "phone": phone,
                "title": title
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
                <alert></alert>
                ReactDOM.render(
                    <div class="alert alert-success" role="alert">
                        User Successfully Created!!
                    </div>,
                    document.getElementById('dLogin')
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div id="App">
            <form id="msform" onSubmit={createNewUser}>
                <fieldset>
                    <h2 class="fs-title">Create a New User</h2>
                    <input type="text" id="email" placeholder="Email ID" required autofocus onChange={get_email} />
                    <input type="text" id="name" placeholder="First Name" required onChange={get_firstName} />
                    <input type="text" id="name" placeholder="Last Name" required onChange={get_lastName} />
                    <input type="text" id="password" placeholder="Initial Password" required onChange={get_password} />
                    <input type="text" id="address" placeholder="Complete Address" required onChange={get_address} />
                    <input type="text" id="phone" placeholder="Phone Number" required onChange={get_phone} />
                    <select id="user-categorization" name="user-categorization" onChange={get_title} required>
                        <option value="#">Select User Type:</option>
                        <option value="dean">Dean</option>
                        <option value="director">Director</option>
                        <option value="principal">Principal</option>
                        <option value="vicePrincipal">Vice Principal</option>
                        <option value="studentCoordinator">Student Coordinator</option>
                        <option value="teacherCoordinator">Teacher Coordinator</option>
                        <option value="classTeacher">Class Teacher</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <input type="submit" name="next" class="action-button" value="Submit" />
                </fieldset>
            </form>
        </div>
    );
}

export default CreateUser;

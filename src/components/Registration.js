import '../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Alert, Button, Col, Form } from "react-bootstrap";
import Amplify, { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';

import Navigation from './Navigation';
import VerificationPage from './verifyEmail';
import { useHistory } from 'react-router-dom';

function Registration(props) {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        gender: "Male"
    });
    const [validName, setValidName] = useState(false);
    const [validNumber, setValidNumber] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [result, setResult] = useState('');

    const [errMessage, setErrMessage] = useState({
        msgName: '',
        msgNumber: '',
        msgEmail: '',
        msgPassword: ''
    });

    const numberRegex = new RegExp("^[0-9]{10}$");
    const nameRegex = new RegExp("^[a-zA-Z]+$");
    const emailRegex = new RegExp("^[a-zA-Z0-9][-\\w\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    const passwordRegex = new RegExp("^.*(?=.{8,120})(?!.*\\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\@\\#\\$\\%\\&\\*]).*$");

    const handleChange = (key, value) => {
        setUser({ ...user, [key]: value });
    };
    const handleErrorMsg = (key, value) => {
        setErrMessage({ ...user, [key]: value });
    };

    const checkValidName = (name) => {
        if (nameRegex.test(name)) {
            document.getElementById("name").style.border = "1px solid green"
            handleChange("name", name);
            setValidName(true)
            handleErrorMsg("msgName", '')
        }
        else {
            document.getElementById("name").style.border = "1px solid red"
            setValidName(false)
            handleErrorMsg("msgName", 'Please enter valid name')
        }
    };

    const checkValidNumber = (number) => {
        document.getElementById("number").style.border = "1px solid green"
        handleChange("number", number);
        setValidNumber(true)
        handleErrorMsg("msgNumber", '')
    };

    const checkValidEmail = (email) => {
        if (emailRegex.test(email)) {
            document.getElementById("email").style.border = "1px solid green"
            setValidEmail(true)
            handleChange("email", email);
            handleErrorMsg("msgEmail", '')
        }
        else {
            document.getElementById("email").style.border = "1px solid red"
            setValidEmail(false)
            handleErrorMsg("msgEmail", 'Please enter valid email')
        }
    };

    const checkValidPassword = (pass) => {
        if (passwordRegex.test(pass)) {
            document.getElementById("password").style.border = "1px solid green"
            setValidPassword(true)
            handleChange("password", pass);
            handleErrorMsg("msgPassword", '')
        }
        else {
            document.getElementById("password").style.border = "1px solid red"
            setValidPassword(false)
            handleErrorMsg("msgPassword", 'Password must contain must contain at least one digit, one capital, small character and one of the folowing chars- @, #, $,%,&,*')
        }
    };

    Amplify.configure({
        Auth: {
            identityPoolId: 'us-east-1:7f9e2b86-796a-433b-98ce-439c2900954b',
            region: 'us-east-1',
            identityPoolRegion: 'us-east-1',
            userPoolId: 'us-east-1_luHcWv4fs',
            userPoolWebClientId: '69cu1qub7mr7cdnplqkkeu3kdl'
        }
    });

    const withdrawSubmit = (e) => {
        e.preventDefault();
        if (!validName && !validNumber && !validEmail && !validPassword) {
            document.getElementById("password").style.border = "1px solid red"
            document.getElementById("email").style.border = "1px solid red"
            document.xgetElementById("number").style.border = "1px solid red"
            document.getElementById("name").style.border = "1px solid red"
            document.getElementById("alertNotSubmit").style.display = "block"
            setAlertMessage('Please enter required fields')
        }
        else {
            if (validName) {
                if (validNumber) {
                    if (validEmail) {
                        if (validPassword) {
                            console.log('true')
                            document.getElementById("alertNotSubmit").style.display = "none"
                            try {
                                Auth.signUp({
                                    username: user.email,
                                    password: user.password,
                                    attributes: {
                                        name: user.name,
                                        email: user.email,
                                        phone_number: user.number
                                    }
                                }).then(
                                    data => {
                                        if (data != null) {
                                            history.push({
                                                pathname: '/verify',
                                                myProps: user
                                            })
                                            console.log('success', data)
                                        }
                                    }
                                )
                                    .catch(
                                        (err) => {

                                            document.getElementById("alertNotSubmit").style.display = "block"
                                            setAlertMessage(err.message)
                                        }
                                    )
                            } catch (error) {
                                console.log('error signing up:', error);
                            }

                        }
                        else {
                            document.getElementById("password").style.border = "1px solid red"
                            document.getElementById("alertNotSubmit").style.display = "block"
                            setAlertMessage('Please enter required fields')
                        }
                    }
                    else {
                        document.getElementById("email").style.border = "1px solid red"
                        document.getElementById("alertNotSubmit").style.display = "block"
                        setAlertMessage('Please enter required fields')
                    }
                }
                else {
                    document.getElementById("number").style.border = "1px solid red"
                    document.getElementById("alertNotSubmit").style.display = "block"
                    setAlertMessage('Please enter required fields')
                }
            }
            else {
                document.getElementById("name").style.border = "1px solid red"
                document.getElementById("alertNotSubmit").style.display = "block"
                setAlertMessage('Please enter required fields')
            }
        }
    }

    return (
        <section>
            {/* <Navigation/> */}
            <br /><br /><br /><br />
            <div class="container">
                <div class="row">
                    <br /><br />
                    <div class="col-6" style={{ marginLeft: "auto", marginRight: "auto", border: "1px solid black", padding: "2%" }}>
                        <div class="row justify-content-md-center">
                            <div class="col-lg-8" style={{ textAlign: 'center' }}>
                                <h2>REGISTRATION</h2>
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-6">
                                <Form.Label>Name*</Form.Label>
                                <br />
                                <input type="text" className="textbox-design" id="name" name="name" placeholder="Enter Name" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidName(e.target.value);
                                    }}

                                />
                                <h6>{errMessage.msgName}</h6>
                                
                                {/* <div><p>Hello-{errMessage.msgName}</p></div> */}
                            </div>
                            <div class="col-6">
                                <Form.Label>Phone Number*</Form.Label>
                                <br />
                                <input type="text" className="textbox-design" maxLength="15" id="number" name="number" placeholder="Enter Phone Number" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidNumber(e.target.value);
                                    }}
                                />
                                <h6>{errMessage.msgNumber}</h6>
                                {/* <div><p>{errMessage.msgNumber}</p></div> */}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <Form.Label>Email ID*</Form.Label>
                                <br />
                                <input type="text" className="textbox-design" id="email" placeholder="Enter email ID" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidEmail(e.target.value);
                                    }}
                                />
                                <h6>{errMessage.msgEmail}</h6>
                                {/* <div><p>{errMessage.msgEmail}</p></div> */}
                            </div>
                            <div class="col-6">
                                <Form.Label>Password*</Form.Label>
                                <br />
                                <input type="password" className="textbox-design" id="password" maxLength="20" placeholder="Enter Password" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        // handleChange("password", e.target.value);
                                        checkValidPassword(e.target.value);
                                    }}
                                />
                                <h6>{errMessage.msgPassword}</h6>
                                {/* <div><p>{errMessage.msgPassword}</p></div> */}
                            </div>
                        </div>
                        <br />
                        <Button style={{ backgroundColor: "#ff632f", border: "none"}} type="submit"
                            onClick={(e) => {
                                withdrawSubmit(e);
                            }}
                        >Submit</Button>
                        <br /><br />

                        <Alert id="alertNotSubmit" style={{ display: 'none' }} variant='danger'>
                            {alertMessage}
                        </Alert>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Registration
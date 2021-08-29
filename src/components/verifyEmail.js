import '../stylesheets/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Alert, Button, Col, Form } from "react-bootstrap";
import Amplify, { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import axios from 'axios';

function Registration(props) {
    const finalEmail = "";
    const location = useLocation();
    const numberRegex = new RegExp("^[0-9]+$");
    const [code, setCode] = useState('');
    const [validCode, setValidCode] = useState(false);
    const [errMsgCode, setErrMsgCode] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const history = useHistory();
    const user = location.myProps

    const withdrawSubmit = (e) => {
        e.preventDefault();
        const user = location.myProps
        console.log(user)

        Auth.confirmSignUp(user.email, code, {
            forceAliasCreation: true
        }).then((response) => {
            if (response = 'SUCCESS') {
                history.push('/');  
            }
        }).catch(
            (err) => {
                document.getElementById("alertNotSubmit").style.display = "block"
                setAlertMessage(err.message)
            }
        );
    }
    const checkValidCode = (code) => {
        if (numberRegex.test(code)) {
            document.getElementById("code").style.border = "1px solid green"
            setCode(code)
            setValidCode(true)
            setErrMsgCode('')
        }
        else {
            document.getElementById("code").style.border = "1px solid red"
            setValidCode(false)
            setErrMsgCode('Please enter valid code. Only numbers are allowed.')
        }
    };

    return (
        <section>
            <br /><br /><br /><br />
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <br /><br />
                    <div class="col-8" style={{ marginLeft: "auto", marginRight: "auto", border: "1px solid black", padding: "2%" }}>
                        <div class="row justify-content-md-center">
                            <div class="col-lg-8" style={{ textAlign: 'center' }}>
                                <h2>EMAIL VERIFICATION</h2>
                            </div>
                        </div>
                        <br />
                        <div class="row d-flex justify-content-center">
                            <div class="col-6">
                                <Form.Label>Enter the verification code received on {finalEmail} email ID*</Form.Label>
                                <br />
                                <input type="password" className="textbox-design" id="code" name="code" placeholder="Enter verification code" style={{ border: "1px solid green" }}
                                    onChange={(e) => {
                                        checkValidCode(e.target.value);
                                    }}

                                />
                                <div><p>{errMsgCode}</p></div>
                            </div>
                        </div>
                        <br />
                        <Button style={{ backgroundColor: "#ff632f", border: "none"}} type="submit"
                            onClick={(e) => {
                                withdrawSubmit(e);
                            }}
                        >Verify</Button>
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
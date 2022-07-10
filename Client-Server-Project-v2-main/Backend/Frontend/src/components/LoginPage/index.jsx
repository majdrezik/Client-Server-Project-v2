import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {useState, useEffect } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from "react-redux";
import { logged, setLogged } from "../../redux/Global";
import { currentUser, setCurrentUser } from "../../redux/Global";
import { useHistory } from "react-router-dom";
import { axiosInstance } from '../../config.js';


export default function LoginPage({ match }) {

    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [rememberMe, setRememberMe] = useState(0);
    const [reCAPTCHAValue, setReCAPTCHAValue] = useState(0);
    const dispatch = useDispatch();
    const isLogged = useSelector(logged);
    // const usr = useSelector(currentUser);
    let history = useHistory();
    const rememberme = localStorage.getItem('remeberme');
    if(rememberme ==='true'){
        history.push("/LoadUser");
    }

    const onChange=(value)=> {
        setReCAPTCHAValue(value);
    }

    const validateLogin=()=> {
        if(userEmail==="" || userPassword===""){
            setStatus("You Must fill all fields");
            return;
        }
        if(reCAPTCHAValue===0){
            setStatus("You Must Solve the ReCAPTCHA");
            return;
        }
        setStatus("Please Wait...");
            axiosInstance.post('/users/getuser',{email: userEmail, password: userPassword, recaptcha:reCAPTCHAValue})
                .then(response => {
                var res= JSON.parse(JSON.stringify(response.data));

                if(res.Email!=="" && res.Email === userEmail.toLowerCase()){
                    setStatus("Ok " + res.Name);
                    dispatch(setLogged(1));
                    dispatch(setCurrentUser({
                        Name: res.Name,
                        FamilyName: res.FamilyName,
                        Email: res.Email,
                        PromoCode: res.PromoCode,
                        PhoneNumber: res.PhoneNumber,
                        PhoneNumber: res.PhoneNumber,
                        Country: res.Country,
                        City: res.City,
                        Street: res.Street,
                        ZipCode: res.ZipCode
                    }));
                    if(rememberMe){
                        localStorage.setItem('remeberme', 'true');
                        localStorage.setItem('email', res.Email);
                        localStorage.setItem('password', res.Password);
                    }
                    else{
                        localStorage.setItem('email', "");
                        localStorage.setItem('password', "");
                    }
                    window.location.href = 'Dashboard'
                }
                else
                    setStatus("Email Or Password is Incorrect, or Recaptcha is not valid!!!");
                })
            .catch((error) => {
                setStatus("error: " +error)
            console.log(error);
            })
    }

    const handleEmailChange=(e)=> {
        setEmail(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const handleRememberMeChange=(e)=>{
        setRememberMe(e.target.checked)
    }

    return (
        <div class="container">
                <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form class="user">
                                            <div class="form-group">
                                                <p class="text-danger">{status}</p>
                                            </div>
                                            <div class="form-group">
                                                <input type="email" name="email" class="form-control form-control-user"
                                                    id="email" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    value={userEmail} onChange={handleEmailChange}/>
                                            </div>
                                            <div class="form-group">
                                                <input type="password" name="password" class="form-control form-control-user"
                                                    id="password" placeholder="Password"
                                                    value={userPassword} onChange={handlePasswordChange}/>
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox" class="custom-control-input" id="customCheck" onChange={handleRememberMeChange}/>
                                                    <label class="custom-control-label" for="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <button type="button" class="btn btn-primary btn-user btn-block" onClick={validateLogin}>
                                                Login
                                            </button>
                                            <hr/>
                                            <ReCAPTCHA sitekey="6LdZ-dsgAAAAAJfcMxEe_9WynHZVSRnnr8HE9PBF" onChange={onChange}/>
                                            {/* <div class="g-recaptcha" data-sitekey="6LdZ-dsgAAAAAJfcMxEe_9WynHZVSRnnr8HE9PBF"></div> */}
                                        </form>
                                        <hr/>
                                        <div class="text-center">
                                            <a class="small" href="reset-password">Forgot Password?</a>
                                        </div>
                                        <div class="text-center">
                                            <a class="small" href="sign-up">Create an Account!</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
    
            </div>
    
        </div>

    );
}

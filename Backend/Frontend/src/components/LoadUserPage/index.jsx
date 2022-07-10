import React, { Component, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logged, setLogged } from "../../redux/Global";
import { currentUser, setCurrentUser } from "../../redux/Global";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { axiosInstance } from '../../config.js';



export default function DashboardPage({ match }) {
    const [em,setEm]=useState("")
    const isLogged = useSelector(logged);
    const currentuser = useSelector(currentUser);
    const dispatch = useDispatch();

    let history = useHistory();
    const rememberme = localStorage.getItem('remeberme');
    if(rememberme ==='true'){
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        setEm(email)
        axiosInstance.post('/users/getuser',{email: email, password: password, recaptcha:"1"})
        .then(response => {
        var res= JSON.parse(JSON.stringify(response.data));

        if(res.Email!=="" && res.Email === email.toLowerCase()){
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
            window.location.href = 'Dashboard'
        }
        else   
        window.location.href = 'Dashboard'

        
        })
    .catch((error) => {
    console.log(error);
    window.location.href = 'Dashboard'

    })

    }
    else
    window.location.href = 'Dashboard'


        
    
    return (
   <div>
       <h1>Loading... {em}</h1>
   </div>
        );
}


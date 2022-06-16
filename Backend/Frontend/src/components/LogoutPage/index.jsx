import React, { Component } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logged, setLogged } from "../../redux/Global";
import { currentUser, setCurrentUser } from "../../redux/Global";
import { useHistory } from "react-router-dom";


export default function LogoutPage({ match }) {
    let history = useHistory();
    const dispatch = useDispatch();
    dispatch(setLogged(0));
    dispatch(setCurrentUser({}));
    localStorage.setItem('remeberme', 'false');
    localStorage.setItem('email', "");
    localStorage.setItem('password', "");
    history.push("/");

    //window.location.href='sign-in'
    return (
        <div >
            <h1>...</h1>
         </div>
 
        );
}


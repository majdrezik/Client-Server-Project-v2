import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../config.js';


export default class updateEmailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status:""
        }
    }

    activateButton = ()=>{
        if(window.location.href.split('?').length<2){
            this.setState({status:"error"})
        }else{
        axiosInstance.get('/users/confirmemail?'+window.location.href.split('?')[1])
            .then((response) => {
                this.setState({status:response.data})
                if(response.data==="Your Email Has been Updated successfully!!")
                    window.location.href = 'logout'
            })
            .catch((error) => {
                this.setState({status:"error: " +error})
                console.log(error);
            })
    }
    }

      render() {
  return (
    <div class="container" style={{color:"#ffffff"}}>
    <button type="button"  onClick={this.activateButton}> Click Here to Confirm Email</button>
        <h1>{this.state.status}</h1>

            <Link to="/sign-in">
            <button >
            Go to Login Page
            </button>
            </Link>

    </div>
     );
};
}
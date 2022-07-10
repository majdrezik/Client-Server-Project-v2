import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { axiosInstance } from '../../config.js';

export default class UpdatePasswordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ""
        } ;
    }
    onChange=(value)=> {
        //this.setState({status: "Captcha value:"+ value});
        this.reCAPTCHAValue=value;
    }
    handlePasswordChange=(e)=> {
        this.setState({password: e.target.value});
     }
     handleRepasswordChange=(e)=> {
        this.setState({repassword: e.target.value});
     }
     updatePassword=()=> {
        if(window.location.href.split('?').length<2){
            this.setState({status:"error"})
        }else{
        axiosInstance.post('/users/update-password?'+window.location.href.split('?')[1],{
            password: this.state.password
        })
            .then((response) => {
                this.setState({status:response.data})
            })
            .catch((error) => {
                this.setState({status:"error: " +error})
                console.log(error);
            })
    }
     }
      render() {
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
                                        <h1 class="h4 text-gray-900 mb-4">Update Password!</h1>
                                    </div>
                                    <form class="user">
                                    <div class="form-group">
                                                <p class="text-danger" name="status" ref="status">{this.state.status.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}</p>
                                            </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Enter New Password" onChange={this.handlePasswordChange}/>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Confirm New Password" onChange={this.handleRepasswordChange}/>
                                        </div>
                                        <button type="button" class="btn btn-primary btn-user btn-block" onClick={this.updatePassword}>
                                    Update Password
                                    </button>
                                    <div class="text-center">
                                        <a class="small" href="sign-in">Return to Login Page</a>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
     );
};
}
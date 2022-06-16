import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { axiosInstance } from '../../config.js';

export default class ResetPasswordPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: ""
        } ;
        this.reCAPTCHAValue=0;
    }
    onChange=(value)=> {
        //this.setState({status: "Captcha value:"+ value});
        this.reCAPTCHAValue=value;
    }
    handleEmailChange=(e)=> {
        this.setState({email: e.target.value});
     }

     resetPassword=()=> {
        if(this.reCAPTCHAValue==0){
            this.setState({status: "You Must Solve the ReCAPTCHA"});
            return;
        }
        this.setState({status: "Please Wait..."});
        axiosInstance.post('/users/reset-password',{
            //email: this.state.email, password: this.state.password
            email: this.state.email,
            recaptcha:this.reCAPTCHAValue
        })
          .then(response => {
              this.setState({status:response.data})
          })
          .catch((error) => {
            this.setState({status:"error: " +error})
            console.log(error);
          })
          
      }

      render() {
  return (
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                        <p class="mb-4">We get it, stuff happens. Just enter your email address below
                                            and we'll send you a link to reset your password!</p>
                                    </div>
                                    <form class="user">
                                    <div class="form-group">
                                                <p class="text-danger" name="status" ref="status">{this.state.status.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}</p>
                                            </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."  onChange={this.handleEmailChange}/>
                                        </div>
                                        <button type="button" class="btn btn-primary btn-user btn-block" onClick={this.resetPassword}>
                                    Reset Password
                                    </button>
                                        <hr/>
                                        <ReCAPTCHA sitekey="6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe" onChange={this.onChange}/>
                                    </form>
                                    <hr/>
                                    <div class="text-center">
                                        <a class="small" href="sign-up">Create an Account!</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="sign-in">Already have an account? Login!</a>
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
};
}
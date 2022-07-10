
import React, { Component } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { axiosInstance } from '../../config.js';

export default class RegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            status: "",
            rememberMe: false,
            name: "",
            familyName:"",
            email:"",
            password:"",
            repassword:"",
            coupon:""
        } ;
        this.counter = 0;
        this.reCAPTCHAValue=0;
    }
    onChange=(value)=> {
        //this.setState({status: "Captcha value:"+ value});
        this.reCAPTCHAValue=value;
    }

    handleNameChange=(e)=> {
        this.setState({name: e.target.value});
     }
     handleFamilyNameChange=(e)=> {
        this.setState({familyName: e.target.value});
     }

    handleEmailChange=(e)=> {
        this.setState({email: e.target.value});
     }

    handlePasswordChange=(e)=>{
        this.setState({password: e.target.value});
     }
     handleRePasswordChange=(e)=> {
        this.setState({repassword: e.target.value});
     }

     handleCuponChange=(e)=> {
        this.setState({coupon: e.target.value});
     }


     validateRegistraion=()=> {
    if(this.reCAPTCHAValue==0){
        this.setState({status: "You Must Solve the ReCAPTCHA"});
        return;
    }
    this.setState({status: "Please Wait..."});
    axiosInstance.post('/users/add',{
        //email: this.state.email, password: this.state.password
        firstname: this.state.name,
        lastname: this.state.familyName,
        email: this.state.email,
        password: this.state.password,
        repassword: this.state.repassword,
        promocode: this.state.coupon,
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
            <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                    <div class="row">
                        <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div class="col-lg-7">
                            <div class="p-5">
                                <div class="text-center">
                                    <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form class="user">
                                <div class="form-group">
                                                <p class="text-danger" name="status" ref="status">{this.state.status.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}</p>
                                            </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                                placeholder="First Name" onChange={this.handleNameChange}/>
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control form-control-user" id="exampleLastName"
                                                placeholder="Last Name" onChange={this.handleFamilyNameChange}/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                            placeholder="Email Address" onChange={this.handleEmailChange}/>
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control form-control-user" id="promoCode"
                                                placeholder="Promo Code" onChange={this.handleCuponChange}/>
                                        </div>

                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" onChange={this.handlePasswordChange}/>
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleRepeatPassword" placeholder="Repeat Password" onChange={this.handleRePasswordChange}/>
                                        </div>
                                    </div>
                                    {/* aa */}
                                    <button type="button" class="btn btn-primary btn-user btn-block" onClick={this.validateRegistraion}>
                                    Register Account
                                    </button>
                                    <hr/>
                                    <ReCAPTCHA = "6LdZ-dsgAAAAAJfcMxEe_9WynHZVSRnnr8HE9PBF" onChange={this.onChange}/>
                                </form>
                                <hr/>
                                <div class="text-center">
                                    <a class="small" href="reset-password">Forgot Password?</a>
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
     );
};
}
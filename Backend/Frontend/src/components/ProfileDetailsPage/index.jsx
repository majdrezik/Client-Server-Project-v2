import React, { Component } from 'react';
import {useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logged, setLogged } from "../../redux/Global";
import { currentUser, setCurrentUser } from "../../redux/Global";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { axiosInstance } from '../../config.js';



export default function ProfileDetailsPage({ match }) {
    const dispatch = useDispatch();

    const isLogged = useSelector(logged);
    const currentuser = useSelector(currentUser);
    const [profileStatus, updateProfileStatus]= useState("")
    const [passwordStatus, updatePasswordStatus]= useState("")
    const [emailStatus, updateEmailStatus]= useState("")

    const [Name, setName] = useState(currentuser.Name)
    const [FamilyName, setFamilyName] = useState(currentuser.FamilyName)
    const [PhoneNumber, setPhoneNumber] = useState(currentuser.PhoneNumber)
    const [City, setCity] = useState(currentuser.City)
    const [Street, setStreet] = useState(currentuser.Street)
    const [ZipCode, setZipCode] = useState(currentuser.ZipCode)
    const [Country, setCountry] = useState(currentuser.Country)
    
    const [Email, setEmail] = useState(currentuser.Email)
    const [newEmail, setnewEmail] = useState()

    const [oldpassword, setOldpassword] = useState("")
    const [newpassword, setNewpassword] = useState("")
    const [repassword, setRepassword] = useState("")


    let history = useHistory();

    const handleoldpasswordChange=(e)=> {
        setOldpassword(e.target.value);
    }
    const handlenewpasswordChange=(e)=> {
        setNewpassword(e.target.value);
    }
    const handlerepasswordChange=(e)=> {
        setRepassword(e.target.value);
    }

    const handleFirstNameChange=(e)=> {
        setName(e.target.value);
    }
    const handleLastNameChange=(e)=> {
        setFamilyName(e.target.value);
    }
    const handlenewEmailChange=(e)=> {
        setnewEmail(e.target.value);
    }
    const handlePhoneNumberChange=(e)=> {
        setPhoneNumber(e.target.value);
    }
    const handleCityChange=(e)=> {
        setCity(e.target.value);
    }
    const handleStreetChange=(e)=> {
        setStreet(e.target.value);
    }
    const handleCountryChange=(e)=> {
        setCountry(e.target.value);
    }
    const handleZipCodeChange=(e)=> {
        setZipCode(e.target.value);
    }

    const updateEmail=()=> {
        updateEmailStatus("Please Wait...")
        
        axiosInstance.post('/users/updatepofileemail',{
        Email:Email,
        newEmail:newEmail
        })
            .then(response => {
                updateEmailStatus(response.data)
            })
        .catch((error) => {
            updateEmailStatus("error: " +error)
        console.log(error);
        })
        

    }
    const updateProfile=()=> {
        updateProfileStatus("Please Wait...")
        
        if(Name===""){
            updateProfileStatus("First Name Can't be empty")
            return;
        }
        if(FamilyName===""){
            updateProfileStatus("Last Name Can't be empty")
            return;
        }
        if(currentuser.City !=="" && City===""){
            updateProfileStatus("City Can't be empty")
            return;
        }
        if(currentuser.PhoneNumber !=="" && PhoneNumber===""){
            updateProfileStatus("PhoneNumber Can't be empty")
            return;
        }
        if(currentuser.ZipCode !=="" && ZipCode===""){  
            updateProfileStatus("ZipCode Can't be empty")
            return;
        }
        if(currentuser.Street !=="" && Street===""){
            updateProfileStatus("Street Can't be empty")
            return;
        }
        if(currentuser.Country !=="" && Country===""){
            updateProfileStatus("Country Can't be empty")
            return;
        }

        
        axiosInstance.post('/users/updatepofiledetails',{
            Name:Name ,
            FamilyName:FamilyName ,
            Email:Email,
            City:City ,
            PhoneNumber:PhoneNumber ,
            Street:Street ,
            ZipCode:ZipCode,
            Country: Country
        })
            .then(response => {
                updateProfileStatus(response.data)
                dispatch(setCurrentUser({
                    Name:Name ,
                    FamilyName:FamilyName ,
                    Email:Email,
                    City:City ,
                    PhoneNumber:PhoneNumber ,
                    Street:Street ,
                    ZipCode:ZipCode,
                    Country: Country
                }));
            })
        .catch((error) => {
            updateProfileStatus("error: " +error)
        console.log(error);
        })
        
    }

    const updatePassword=()=> {
        updatePasswordStatus("Please Wait...");
                axiosInstance.post('/users/updatepofilepassword',{email: Email, oldPassword: oldpassword, newPassword: newpassword, rePassword: repassword})
                    .then(response => {
                        updatePasswordStatus(response.data)
                    })
                .catch((error) => {
                    updatePasswordStatus("error: " +error)
                console.log(error);
                })
            }
    
        
    if(isLogged===0){
        
        history.push("/sign-in");
        return(
            <div >
                <h1>You must login first</h1>
            </div>
        )
    }
    else
    return (
        <div >
        <div id="wrapper">
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="Dashboard">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">My Webshop </div>
            </a>

            <hr class="sidebar-divider my-0"/>
            <li class="nav-item active">
                <a class="nav-link" href="Dashboard">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dahsboard</span></a>
            </li>

            <hr class="sidebar-divider"/>

            <div class="sidebar-heading">
                Buy:
            </div>

            <li class="nav-item">
                <a class="nav-link collapsed" href="Buy-Pc" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>PC</span>
                    
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        
                        <a class="collapse-item" href="Buy-Pc">Buy PC</a>
                        
                    </div>
                </div>
            </li>

            <li class="nav-item">
                <a class="nav-link collapsed" href="Buy-CellPhone" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Cell Phone</span>
                </a>
                <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        
                        <a class="collapse-item" href="Buy-CellPhone">Buy Celphone</a>
                        
                    </div>
                </div>
            </li>

        </ul>

        <div id="content-wrapper" class="d-flex flex-column">

            <div id="content">
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-search fa-fw"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2"/>
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        <li class="nav-item dropdown no-arrow mx-1">
                            <a class="nav-link dropdown-toggle" href="Buy-CellPhone" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                
                                <b><p style={{color:"black"}}>Buy Cell Phone</p></b>
                                
                                
                            </a>
                          
                        </li>

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <li class="nav-item dropdown no-arrow mx-1">
                            <a class="nav-link dropdown-toggle" href="Buy-Pc" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">        
                                <b><p style={{color:"black"}}>Buy PC</p></b>          
                            </a>
                            
                        </li>
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{currentuser.Name +" " + currentuser.FamilyName}</span>
                                <img class="img-profile rounded-circle"
                                    src="img/undraw_profile.svg"/>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="ProfileDetails">
                                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </a>
                                <a class="dropdown-item" href="About">
                                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    About
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#"  data-toggle="modal" data-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div class="container-fluid">
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Profile details:</h1>
    
</div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <p style={{margin:"20px"}}class="text-danger">{profileStatus.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}</p>

<div class="row">
<div class="column" style={{margin:"20px"}} >
    
    <p>First name</p>
    <input type="text" onChange={handleFirstNameChange} id="fname" name="fname"  class="form-control form-control-user" value={Name}/><br/><br/>
    <p>E-mail</p>
    <input type="text" style={{background:"#e0e0e0"}} id="email" name="email"  class="form-control form-control-user" value={Email}/><br/><br/>
</div>
<div class="column" style={{margin:"20px"}}>
    
    <p>Last name</p>
    <input type="text" onChange={handleLastNameChange} id="lname" name="lname"  class="form-control form-control-user"value={FamilyName}/><br/><br/>
    <p>City</p>
    <input type="text" id="city"onChange={handleCityChange} name="city"  class="form-control form-control-user"value={City}/><br/><br/>
</div>
<div class="column" style={{margin:"20px"}}>
    
    <p>Phone number</p>
    <input type="text"onChange={handlePhoneNumberChange} id="pnumber" name="pnumber"  class="form-control form-control-user"value={PhoneNumber}/><br/><br/>
    <p>Street</p>
    <input type="text" onChange={handleStreetChange} id="street" name="street"  class="form-control form-control-user"value={Street}/><br/><br/>
</div>
<div class="column" style={{margin:"20px"}}>
    
    <p>Country</p>
    <input type="text" onChange={handleCountryChange} id="country" name="country"  class="form-control form-control-user"value={Country}/><br/><br/>
    <p>Zip code</p>
    <input type="text" onChange={handleZipCodeChange} id="zcode" name="zcode"  class="form-control form-control-user"value={ZipCode}/><br/><br/>
    <div class="centerdiv">
    <button type="button"class="btn btn-primary"  onClick={updateProfile}>Update Profile</button>

    </div>
    
</div>
</div>



<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Change Email:</h1>
    
</div>

<p style={{margin:"20px"}}class="text-danger">{emailStatus.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}</p>

<div class="row">

    <div class="column" style={{margin:"20px"}}>
        
        <p>Old Email</p>
        <input type="text" style={{background:"#e0e0e0"}} id="fname" name="fname"  class="form-control form-control-user" value={Email}/><br/><br/>
        
    </div>
    <div class="column"style={{margin:"20px"}}>
        
        <p>New Email</p>
        <input type="text" onChange={handlenewEmailChange} id="lname" name="lname"  class="form-control form-control-user"value={newEmail}/><br/><br/>
        
    </div>
    <div class="column" style={{margin:"20px"}}>
        
        
    <p>.</p>
        <button type="button"class="btn btn-primary"  onClick={updateEmail}>Change Email</button>
        </div>
        </div>

<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Change password:</h1>
    
</div>

<p style={{margin:"20px"}}class="text-danger">{passwordStatus.split('\n').map( (it, i) => <div key={'x'+i}>{it}</div> )}</p>

<div class="row">

    <div class="column" style={{margin:"20px"}}>
        
        <p>Old password</p>
        <input type="password" onChange={handleoldpasswordChange} id="fname" name="fname"  class="form-control form-control-user" value={oldpassword}/><br/><br/>
        
    </div>
    <div class="column"style={{margin:"20px"}}>
        
        <p>New password</p>
        <input type="password" onChange={handlenewpasswordChange} id="lname" name="lname"  class="form-control form-control-user"value={newpassword}/><br/><br/>
        
    </div>
    <div class="column" style={{margin:"20px"}}>
        
        <p>Confirm password</p>
        <input type="password"onChange={handlerepasswordChange} id="pnumber" name="pnumber"  class="form-control form-control-user"value={repassword}/><br/><br/>
        
    </div>

    <div class="column" style={{margin:"20px"}}>
        
        
    <p>.</p>
        <button type="button"class="btn btn-primary"  onClick={updatePassword}>Change password</button>
        </div>
        </div>





    </div>
    </div>       
        </div>
    </div>

    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal" >Cancel</button>
                  <a href="logout" class="btn btn-primary" type="button" >  Logout
                  </a>
                </div>
            </div>
        </div>
    </div>
    </div>
 
        );
}


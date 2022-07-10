import React, { Component } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logged, setLogged } from "../../redux/Global";
import { currentUser, setCurrentUser } from "../../redux/Global";
import { useHistory } from "react-router-dom";



export default function AboutPage({ match }) {
    const isLogged = useSelector(logged);
    const currentuser = useSelector(currentUser);
    let history = useHistory();
        
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
    <h1 class="h3 mb-0 text-gray-800">About</h1>
    
</div>  
    <h4 >HQ oficce address</h4>
    <a >Karmiel Ort Braude</a>
<hr/>
    <h4>E-mail</h4>
    <a href="mailto:Mhemmad01@gmail.com">Mhemmad01@gmail.com</a>
    <hr/>

    <h4>Website</h4>
    <a href="https://google.com">My Website: Google</a>
    <hr/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

    <div class="centerdiv">
        
        <a href="https://www.facebook.com" target="_blank" style={{margin:"20px"}}>
            <i class="fa fa-2x fa-facebook"></i>
        </a>

        <a href="https://twitter.com" target="_blank" style={{margin:"20px"}}>
            <i class="fa fa-2x fa-twitter"></i>
        </a>

        <a href="https://web.telegram.org" target="_blank" style={{margin:"20px"}}>
            <i class="fa fa-2x fa-telegram"></i>
        </a>
      </div>
      <hr/>
      <a href="pdf/privacy-policy-template.pdf" style={{margin:"20px"}}><i class="fa fa-wrench"></i>Privacy Policy</a>
      <a href="pdf/terms-and-conditions-template.pdf" style={{margin:"20px"}}><i class="fa fa-wrench"></i>Terms of Use</a>
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


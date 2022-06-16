import "./App.css";
import React, { useState } from "react";
import { Component } from 'react';

import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import UpdatePasswordPage from "./components/UpdatePasswordPage";
import DashboardPage from "./components/DashboardPage";
import ActivatePage from "./components/ActivatePage";
import BuyCellPhonePage from "./components/BuyCellPhonePage";
import BuyPcPage from "./components/BuyPcPage";
import LogoutPage from "./components/LogoutPage";
import AboutPage from "./components/AboutPage";
import ProfileDetailsPage from "./components/ProfileDetailsPage";
import UpdateEmailPage from "./components/UpdateEmailPage";
import LoadUserPage from "./components/LoadUserPage";
import Page404 from "./components/404Page";

class App extends Component {
    render() {
    return (
        <div>
            <BrowserRouter>
                <Switch className='App'>
                    <Route exact path='/' render={() => <DashboardPage />} />
                    <Route exact path='/sign-in' render={() => <LoginPage />} />
                    <Route exact path='/sign-up' render={() => <RegistrationPage />} />
                    <Route exact path='/reset-password' render={() => <ResetPasswordPage />} />
                    <Route exact path='/update-password' render={() => <UpdatePasswordPage />} />
                    <Route exact path='/dashboard' render={() => <DashboardPage />} />
                    <Route exact path='/activate' render={() => <ActivatePage />} />
                    <Route exact path='/Buy-CellPhone' render={() => <BuyCellPhonePage />} />
                    <Route exact path='/Buy-Pc' render={() => <BuyPcPage />} />
                    <Route exact path='/logout' render={() => <LogoutPage />} />
                    <Route exact path='/ProfileDetails' render={() => <ProfileDetailsPage />} />
                    <Route exact path='/About' render={() => <AboutPage />} />
                    <Route exact path='/update-email' render={() => <UpdateEmailPage />} />
                    <Route exact path='/LoadUser' render={() => <LoadUserPage />} />
                    <Route path='*' exact={true} component={Page404} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}
}
export default App;
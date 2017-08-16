/* global gapi */
/* global auth2 */
import React, { Component } from 'react';
import '../App.css';

export default class Login extends Component {

    componentDidMount() {
        console.log("Login.js - componentDidMount")
		gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 200,
			'height': 50,
			'onsuccess': this.onSignIn
		});
	}

    signOut = () => {
        console.log("Login.js - signOut")
        gapi.auth2.getAuthInstance().signOut().then(function () {
            console.log('User signed out.');
        });
    }

    onSignIn = (googleUser) => {
        console.log("Login.js - onSignIn")
        var profile = googleUser.getBasicProfile();
        let email = profile.getEmail();

        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + email); // This is null if the 'email' scope is not present.

        if (!email.endsWith("@galepartners.com")) {
            this.signOut()
        }

        var id_token = googleUser.getAuthResponse().id_token;
        console.log('ID Token: ' + id_token); // This is null if the 'email' scope is not present.

        // TODO: Verify token on backend

        this.props.history.push('/dashboard')

    }

    getUserInfo = () => {
        console.log("Login.js - getUserInfo")
        var auth2 = gapi.auth2.getAuthInstance();

        if (auth2.isSignedIn.get()) {
            var profile = auth2.currentUser.get().getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
        }
    }

    render() {

        return (
        <div className="login-screen">

            <div className="login-container">
                <div className="login-message">Log in with Google to continue</div>
                <div id="g-signin2" data-onsuccess={this.onSignIn}></div>
                {/* <div onClick={this.signOut}>Sign Out</div> */}
                {/* <div onClick={this.getUserInfo}>Get user details</div> */}
            </div>

        </div>
        );
    }
}


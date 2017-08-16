/* global gapi */
/* global auth2 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as PollActions from '../../actions/PollActions'


import '../App.css';
import PollMetric from '../poll/PollMetric'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isCreatingPoll: false,
            fieldValue: "",
            pollMetricCount: 2
        }
    }

    componentDidMount() {
        console.log("Dashboard.js - componentDidMount")

        if (!gapi || !gapi.auth2 || !gapi.auth2.getAuthInstance().isSignedIn.get()) {
            this.props.history.push('/login')
        }
	}

    createNewPoll = () => {
        this.setState({isCreatingPoll: true})
    }

    fieldChange = (event, value) => {
        this.setState({fieldValue: value})
        this.props.updateNewPoll('name', value)
    }

    addMetric = () => {
        this.setState({pollMetricCount: this.state.pollMetricCount + 1})
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    signOut = () => {
        const {
            history
        } = this.props

        console.log("Dashboard.js - signOut")
        gapi.auth2.getAuthInstance().signOut().then(function () {
            console.log('User signed out.');
            history.push('/login')
        });

    }

    getUserInfo = () => {
        console.log("Dashboard.js - getUserInfo")
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

        let canDeleteMetric = this.state.pollMetricCount > 2;

        return (
        <MuiThemeProvider>
            <div className="login-screen">

                <div>
                    <div>Create new poll</div>
                    <div onClick={this.createNewPoll}>Create</div>
                </div>
                <div onClick={this.signOut}>Sign Out</div>
                <div onClick={this.getUserInfo}>Get user details</div>

                { this.state.isCreatingPoll &&
                    <div>
                        <div>Poll Fields</div>

                        {/* Poll Name */}
                        <div className="poll-item">
                            <div>Name</div>
                            <TextField
                                name="pollName"
                                onChange={this.fieldChange}
                                value={this.props.newPoll.name}
                            />
                        </div>

                        {/* <div className="poll-item">
                            <div>Expiry</div>
                            <DatePicker autoOk={true} />
                        </div> */}

                        {/* Event Date */}
                        <div className="poll-item">
                            <div>Event Date</div>
                            <DatePicker autoOk={true} />
                        </div>
                        <div>Poll Metrics</div>

                        {/* Poll Metrics */}
                        {
                            [...Array(this.state.pollMetricCount)].map((e, i) =>
                                <PollMetric
                                    key={i}
                                    canDeleteMetric={canDeleteMetric}
                                    metricNumber={i}
                                />
                            )
                        }

                        { this.state.pollMetricCount < 6 &&
                            <div onClick={this.addMetric}>Create</div>
                        }

                    </div>
                }

            </div>
        </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return {
        newPoll: state.polls.newPoll,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateNewPoll: PollActions.updateNewPoll
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
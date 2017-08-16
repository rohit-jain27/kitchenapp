/* global gapi */
/* global auth2 */
import React, { Component } from 'react';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'


export default class App extends Component {

    render() {
        return (
        <Switch>
            <Route exact path='/' component={withRouter(Login)} />
            <Route exact path='/login' component={withRouter(Login)} />
            <Route path='/dashboard' component={withRouter(Dashboard)}/>
        </Switch>
        )
    }

}


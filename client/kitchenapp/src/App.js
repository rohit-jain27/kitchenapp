import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PollMetric from './PollMetric'

import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isCreatingPoll: false,
            fieldValue: "",
            pollMetricCount: 2
        }
    }

    createNewPoll = () => {
        this.setState({isCreatingPoll: true})
    }

    fieldChange = (event, value) => {
        this.setState({fieldValue: value})
    }

    render() {

        let canDeleteMetric = this.state.pollMetricCount > 2;

        return (
        <MuiThemeProvider>
            <div className="App">
                <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
                </div>

                <div>
                    <div>Create new poll</div>
                    <div onClick={this.createNewPoll}>Create</div>
                </div>

                { this.state.isCreatingPoll &&
                    <div>
                        <div>Poll Fields</div>
                        <TextField
                            name="text"
                            onChange={this.fieldChange}
                        />
                        <DatePicker
                            autoOk={true}
                        />
                        <PollMetric
                            canDeleteMetric={canDeleteMetric}
                        />
                        <PollMetric
                            canDeleteMetric={canDeleteMetric}
                        />

                        <div onClick={this.addMetric}>Create</div>

                    </div>
                }

            </div>
        </MuiThemeProvider>
        );
    }
}


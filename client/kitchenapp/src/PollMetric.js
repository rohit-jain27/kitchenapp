import React, { Component } from 'react';
import logo from './logo.svg';

import TextField from 'material-ui/TextField'

export default class PollMetric extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isCreatingPoll: false,
            fieldValue: ""
        }
    }

    createNewPoll = () => {
        this.setState({isCreatingPoll: true})
    }

    fieldChange = (event, value) => {
        this.setState({fieldValue: value})
    }

    render() {
        return (
        <div className="App">
            <div>Poll Metric</div>
            <div>
                <TextField
                    name="text"
                    onChange={this.fieldChange}
                />
                <TextField
                    name="text"
                    onChange={this.fieldChange}
                />
            </div>
        </div>
        );
    }
}


import React, { Component } from 'react';

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
        <div key={this.props.metricNumber}>
            <div className="poll-item">
                <div>Metric {this.props.metricNumber}</div>
                <TextField
                    name={"metric_" + this.props.metricNumber.toString()}
                    onChange={this.fieldChange}
                />
            </div>
        </div>
        );
    }
}


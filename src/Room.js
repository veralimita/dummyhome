import React, {Component} from 'react';
import Panel from './Panel.js';

class Room extends Component {
    constructor(props) {
        super();
        this.state = {room: props.room};
    }

    componentDidMount() {
        window.api.get(`/api/stats/${this.state.room}`, (err, resp) => {
            let _ = JSON.parse(resp);
            this.setState({spreadsheetId: _.spreadsheetId, time: _.datetime, temperature: _.temp});
        });
    }

    render() {
        return (
            <Panel iconId="13" message={`Temperature: ${this.state.temperature || '---'}ºC`} subtitle={this.state.time || '---'}
                   title={this.state.room || '---'}/>
        );
    }
}

export default Room;

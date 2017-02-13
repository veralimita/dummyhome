import React, {Component} from 'react';

class Room extends Component {
    constructor(props) {
        super();
        this.state = {room: props.room};
    }

    render() {
        return (
            <div className="Room">
                {this.state.room}
            </div>
        );
    }
}

export default Room;

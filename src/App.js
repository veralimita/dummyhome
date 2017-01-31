import React, {Component} from 'react';
import Room from './Room.js';
import Panel from './Panel.js';
import logo from './icons/HXPNG/HC11.png';
import './App.css';
import rooms from '../public/rooms.json';


class App extends Component {
    constructor() {
        super();
        this.state = {rooms: []};
        console.log(this.state.rooms.length);

        this.rooms = ( <ul>
                {rooms.map((room) =>
                    <li key={room.id}>
                        <Room room={room}/>
                    </li>
                )}
            </ul>
        )
    }


    emptyRooms = (<Panel iconId="10" message="I have nothing to show"/>)

    componentDidMount() {
        this.setState({
            // route components are rendered with useful information, like URL params
            rooms: rooms
        },() => {
            console.log(this.state.rooms.length);
        });

    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to dummy-home web</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {this.state.rooms.length ? this.rooms : this.emptyRooms}
            </div>
        );
    }
}

export default App;

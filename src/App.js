import React, {Component} from 'react';
import Room from './Room.js';
import Panel from './Panel.js';
import logo from './icons/HXPNG/HC11.png';
import './App.css';
import rooms from '../public/rooms.json';


class App extends Component {

    rooms = ( <ul>
            {rooms.map((room) =>
                <li key={room.id}>
                    <Room room={room}/>
                </li>
            )}
        </ul>
    )

    emptyRooms = (<Panel iconId="10" message="I have nothing to show"/>)

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
                {rooms.length  ? this.rooms: this.emptyRooms}
            </div>
        );
    }
}

export default App;

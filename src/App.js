import React, {Component} from 'react';
import Room from './Room.js';
import logo from './icons/HXPNG/HC11.png';
import './App.css';
import rooms from '../public/rooms.json';

class App extends Component {
    constructor() {
        super();
    }

    getRooms(){

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
                <Room/>
            </div>
        );
    }
}

export default App;

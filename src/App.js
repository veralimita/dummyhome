import React, {Component} from 'react';
import Room from './Room.js';
import Panel from './Panel.js';
import Searching from './Searching.js';
import logo from './icons/HXPNG/HC11.png';
import './App.css';
let classNames = require('classnames');

class App extends Component {

    emptyRooms = (<Panel iconId="02" message="I have nothing to show" title="I'm soooo sooooooo sorry" subtitle="Message from debugger"/>);

    constructor() {
        super();
        this.state = {rooms: <div></div>, roomsCount: 0, inSearch: true};
    }

    componentDidMount() {
        window.api.get("/api/stats", (err, resp) => {
            if (resp) {
                let _ = JSON.parse(resp);
                this.setState({
                    inSearch: false,
                    roomsCount: _.length,
                    rooms: (<ul className="Rooms-list">
                        {_.map((room, index) =>
                            <li key={index}>
                                <Room room={room}/>
                            </li>
                        )}
                    </ul>)
                }, () => {
                });
            }
        });
    }

    render() {
        let headerClass = classNames({
            'App-header': true,
            'App-header-loading': this.state.inSearch
        });
        return (
            <div className="App">
                <div className={headerClass}>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to dummy-home web</h2>
                </div>
                <div className="App-intro">
                    {(!this.state.inSearch) ?
                        (this.state.roomsCount ? this.state.rooms : this.emptyRooms
                        ) : ""}
                    {this.state.inSearch && <Searching/>}
                </div>

            </div>
        );
    }
}

export default App;

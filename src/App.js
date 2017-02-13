import React, {Component} from 'react';
import Room from './Room.js';
import Panel from './Panel.js';
import logo from './icons/HXPNG/HC11.png';
import './App.css';

class App extends Component {

    emptyRooms = (<Panel iconId="05" message="I have nothing to show"/>);
    searchingPanel = (<Panel iconId="01" message="Abracadabra"/>);

    constructor() {
        super();
        this.state = {rooms: <div></div>, roomsCount: 0, inSearch: true};
    }

    componentDidMount() {
        window.api.get((err, resp) => {
            if (resp) {
                let _ = JSON.parse(resp);
                this.setState({
                    inSearch: false,
                    roomsCount: _.length,
                    rooms: (<ul>
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
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to dummy-home web</h2>
                </div>
                {this.state.inSearch ? this.searchingPanel : (this.state.roomsCount ? this.state.rooms : this.emptyRooms)}
            </div>
        );
    }
}

export default App;

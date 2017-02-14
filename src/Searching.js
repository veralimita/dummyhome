import React, {Component} from 'react';
import Icon from './Icon.js';
import './Searching.css'

class Searching extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="App-overlay">
                <div className="Search">
                    <div className="Search-icon-wrap">
                        <Icon iconId="01"/>
                    </div>
                    <div className="Search-ring">
                    </div>
                </div>
            </div>
        );
    }

}

export default Searching;

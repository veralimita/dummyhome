import React, {Component} from 'react';
import Icon from './Icon.js';
import './Panel.css';

class Panel extends Component {

    render() {
        return (
            <div className="Panel">
                <div className="Panel-header">
                    <Icon iconId = {this.props.iconId}/>
                    <div className="Panel-header-title">{this.props.title}</div>
                    <div className="Panel-header-subtitle">{this.props.subtitle}</div>
                </div>
                <div className="Panel-body">
                    {this.props.message}
                </div>
            </div>
        );
    }


}

export default Panel;

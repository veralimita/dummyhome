import React, {Component} from 'react';
import icon from './icons/USS/U10.png';
import './Panel.css';

class Panel extends Component {
    constructor(props) {
        super(props)
        this.state = {icon: `U${props.iconId}.png`, message: props.message};
    }

    render() {
        return (
            <div className="Panel">
                <div className="Panel-header">
                    <img src={icon} role="presentation" />
                </div>
                <div className="Panel-body">
                    {this.state.message}
                </div>
            </div>
        );
    }
}

export default Panel;

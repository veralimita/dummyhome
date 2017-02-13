import React, {Component} from 'react';
import icon_01 from './icons/USS/U1.png';
import icon_02 from './icons/USS/U2.png';
import icon_03 from './icons/USS/U3.png';
import icon_04 from './icons/USS/U4.png';
import icon_05 from './icons/USS/U5.png';
import icon_06 from './icons/USS/U6.png';
import icon_07 from './icons/USS/U7.png';
import icon_08 from './icons/USS/U8.png';
import icon_09 from './icons/USS/U9.png';
import icon_10 from './icons/USS/U10.png';
import icon_11 from './icons/USS/U11.png';
import icon_12 from './icons/USS/U12.png';
import icon_13 from './icons/USS/U13.png';
import icon_14 from './icons/USS/U14.png';
import icon_15 from './icons/USS/U15.png';
import icon_16 from './icons/USS/U16.png';
import icon_17 from './icons/USS/U17.png';
import icon_18 from './icons/USS/U18.png';
import icon_19 from './icons/USS/U19.png';
import icon_20 from './icons/USS/U20.png';
import './Panel.css';

const icons = {
    "01": icon_01,
    "02": icon_02,
    "03": icon_03,
    "04": icon_04,
    "05": icon_05,
    "06": icon_06,
    "07": icon_07,
    "08": icon_08,
    "09": icon_09,
    "10": icon_10,
    "11": icon_11,
    "12": icon_12,
    "13": icon_13,
    "14": icon_14,
    "15": icon_15,
    "16": icon_16,
    "17": icon_17,
    "18": icon_18,
    "19": icon_19,
    "20": icon_20
};

class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {icon: props.iconId, message: props.message};
    }

    render() {
        return (
            <div className="Panel">
                <div className="Panel-header">
                    <img src={icons[this.state.icon]} role="presentation" />
                    <div className="Panel-header-title">I'm so so sooooo sorry about this</div>
                </div>
                <div className="Panel-body">
                    {this.state.message}
                </div>
            </div>
        );
    }


}

export default Panel;

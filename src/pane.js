import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css'
import * as moment from 'moment'
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';


class Pane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false
        };
    }

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        return <div ref={ref => this.el = ref}>
            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.props.Toggle}
                title='Text'
                subtitle={this.props.info.user.substring(5,20)+"..."}
                width='280px'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                    this.props.onClose();
                } }>
                <div className="times">
                <div className="t1" ><small><Icon>access_time</Icon><span className="time">{moment(new Date(this.props.info.created)).format("MM/DD/YYYY hh:mm:ss")}</span></small></div>
                <div className="t1" ><small><Icon>timelapse</Icon><span className="time">{moment(new Date(this.props.info.updated)).format("MM/DD/YYYY hh:mm:ss")}</span></small></div>
                </div>
                <hr />
                <div>{this.props.info.text }</div>
                <br/>
            </SlidingPane>
        </div>;
    }

}
export default Pane;


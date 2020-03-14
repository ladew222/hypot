
import React, { Component } from 'react';
import  'react-bootstrap';

class idBox extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <input type="text" autoFocus="autofocus" onChange={this.props.idChange}/>
        );
    }
}
export default idBox;
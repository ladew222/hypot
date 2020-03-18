import React, {Component} from 'react';
import Toggle from 'react-bootstrap-toggle';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import InputGroup from 'react-bootstrap/InputGroup'
import {FormControl, FormGroup, DropdownButton,Dropdown} from 'react-bootstrap';

let filter ="";
class GroupFilter extends Component{
    constructor(props){
        super(props);
        this.state = {
            advanced_filter: 'Members',

        };
        //this.onToggle = this.onToggle.bind(this);
    }
    handleAFilterChange = (value) => {
        const fieldName = "advanced_filter";
        const fieldValue = value;
        this.setState({[fieldName]: fieldValue});
        this.props.onChange(fieldValue);
    }
    render(){
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-1">
                        </div>
                        <div className="col-lg-4">
                            <div class="ig1">
                            </div>
                            <div className="ig1">
                            </div>
                        </div>
                        <div className="col-lg-3">
                        </div>
                        <div className="col-lg-3">
                            <span>     </span>

                            <ToggleButtonGroup
                                type='radio'
                                name='genre'
                                defaultValue={['Users']}
                                onChange={this.props.onChange}
                            >
                                <ToggleButton value={'Users'}>By Users</ToggleButton>
                                <ToggleButton value={'Document'}>By Document</ToggleButton>
                                <ToggleButton value={'Week'}>By Week</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default GroupFilter;
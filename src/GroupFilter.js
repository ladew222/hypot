import React, {Component} from 'react';
import Toggle from 'react-bootstrap-toggle';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import InputGroup from 'react-bootstrap/InputGroup'
import {FormControl, FormGroup, DropdownButton,Dropdown} from 'react-bootstrap';

let filter ="";
class DynamicSelect extends Component{
    constructor(props){
        super(props);
        this.state = {
            toggleActive: false,
            advanced_filter: 'all'

        };
        //this.onToggle = this.onToggle.bind(this);
    }

    //On the change event for the select box pass the selected value back to the parent
    onChange = (event) =>
    {
        console.log("event");
        console.log(event);
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.setState({[fieldName]: fieldValue});

    }
    onToggle = (value) =>
    {
        this.setState({ toggleActive: !this.state.toggleActive });
    }

    onSubmit = () =>
    {

    }
    handleAFilterChange = (value) => {
        const fieldName = "advanced_filter";
        const fieldValue = value;
        this.setState({[fieldName]: fieldValue});
    }


    render(){
        let arrayOfData = this.props.arrayOfData;
        let options = arrayOfData.map((data) =>
            <option
                key={data.id}
                value={data.id}
            >
                {data.name}
            </option>
        );

        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-1">
                            <div className="panel panel-blue">
                                <Toggle
                                    onClick={this.onToggle}
                                    on={<small>Match Search</small>}
                                    off={<small>Fuzzy</small>}
                                    size="xs"
                                    width="80px"
                                    offstyle="info"
                                    active={this.state.toggleActive}
                                />
                            </div>
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
                                defaultValue={['all']}
                                onChange={this.handleAFilterChange}
                            >
                                <ToggleButton value={'all'}>All</ToggleButton>
                                <ToggleButton value={'converters'}>Converters</ToggleButton>
                                <ToggleButton value={'merged'}>Merged</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default DynamicSelect;
import React, {Component} from 'react';
import AutoComplete from './AutoComplete'
import Toggle from 'react-bootstrap-toggle';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


let filter ="";
class DynamicSelect extends Component{
    constructor(props){
        super(props);
        this.state = { toggleActive: false };
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
        //this.props.onSelectChange(fieldName, fieldValue);

    }
    onToggle = (value) =>
    {
        this.setState({ toggleActive: !this.state.toggleActive });
    }

    onChange_autocomplete = (value) =>
    {
        const fieldName = "filter_text";
        const fieldValue = value;
        this.setState({[fieldName]: fieldValue});
        //this.props.onSelectChange(fieldName, fieldValue);
        return value;


    }
    onSubmit = () =>
    {
        this.props.onSelectChange(this.state.filter_text, this.state.filter_type,this.state.toggleActive);
    }
    handleAFilterChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
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
                        <div className="col-lg-2">
                            <div className="panel panel-blue">
                                <Toggle
                                    onClick={this.onToggle}
                                    on={<small>Match Search</small>}
                                    off={<small>Fuzzy Search</small>}
                                    size="xs"
                                    width="110px"
                                    offstyle="info"
                                    active={this.state.toggleActive}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3">
                                 <AutoComplete name="filter_text" end_date={this.props.end_date} start_date={this.props.start_date} onSubmit={this.onChange_autocomplete.bind(this)}  />

                        </div>
                        <div className="col-lg-3">
                            <div className="panel panel-purple">
                                <select  name="filter_type" className="custom-search-select selectpicker" onChange={this.onChange.bind(this)}>
                                <option>Select Item</option>
                                {options}
                            </select>
                                <span>     </span>
                                <button onClick={this.onSubmit}>Search</button>

                            </div>
                        </div>
                        <div className="col-lg-3">
                            <span>     </span>
                            <label htmlFor='genre'>Favorite genre of music</label>
                            <ToggleButtonGroup
                                type='radio'
                                name='genre'
                                defaultValue={['all']}
                                onChange={this.onChange.bind(this)}
                            >
                                <ToggleButton value={'all'}>All</ToggleButton>
                                <ToggleButton value={'converters'}>Converters</ToggleButton>
                                <ToggleButton value={'other'}>Other</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default DynamicSelect;
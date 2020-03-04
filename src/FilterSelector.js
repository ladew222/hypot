import React, {Component} from 'react';
import AutoComplete from './AutoComplete'
import Toggle from 'react-bootstrap-toggle';
import ToggleButton from 'react-bootstrap/ToggleButton'

let filter ="";
class DynamicSelect extends Component{
    constructor(props){
        super(props)
        this.state = { toggleActive: false };
        this.onToggle = this.onToggle.bind(this);
    }

    //On the change event for the select box pass the selected value back to the parent
    onChange = (event) =>
    {
        console.log("event");
        console.log(event);
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.state.
        this.props.onSelectChange(fieldName, fieldValue);

    }
    onChange_autocomplete = (value) =>
    {
        const fieldName = "filter_text";
        const fieldValue = value;
        this.props.onSelectChange(fieldName, fieldValue);
        return value;


    }
    onToggle = (value) =>
    {
        this.setState({ toggleActive: !this.state.toggleActive });
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
                                    on={<h6>Find</h6>}
                                    off={<h6>Search</h6>}
                                    size="xs"
                                    offstyle="danger"
                                    active={this.state.toggleActive}
                                />
                            </div>
                        </div>
                        <div className="col-lg-3">
                                { this.state.toggleActive ? <AutoComplete name="filter_text"  onSubmit={this.onChange_autocomplete.bind(this)}  /> : <input type="text" name="search_text" onChange={this.onChange.bind(this)}/>  }

                        </div>
                        <div className="col-lg-7">
                            <div className="panel panel-purple">
                                <select  name="filter_type" className="custom-search-select selectpicker" onChange={this.onChange.bind(this)}>
                                <option>Select Item</option>
                                {options}
                            </select>
                                <button onClick={shoot}>Take the Shot!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default DynamicSelect;
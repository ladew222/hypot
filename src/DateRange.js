
import React, { Component } from 'react';
import Campaigns from "./campaigns";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

class DateRange extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <DateRangePicker startDate="1/1/2020" endDate="3/1/2020" onApply={this.props.onSubmit}>
                <button>Change</button>
            </DateRangePicker>
        );
    }
}
export default DateRange;
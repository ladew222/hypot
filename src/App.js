import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import request from 'superagent';
import Predictions from "./Predictions";
import Views from "./views";
import Actions from "./actions";
import Campaigns from "./campaigns";
import DateRange from "./DateRange";
import AutoComplete from "./AutoComplete";
import Moment from 'moment';



const Home = () => (
    <div>
        <h2> Home </h2>
    </div>
);

const Airport = () => (
    <div>
        <ul>
            <li>Jomo Kenyatta</li>
            <li>Tambo</li>
            <li>Murtala Mohammed</li>
        </ul>
    </div>
);

const City = () => (
    <div>
        <ul>
            <li>San Francisco</li>
            <li>Istanbul</li>
            <li>Tokyo</li>
        </ul>
    </div>
);

class App extends Component {

    constructor(props) {
        super(props);

        console.log("start"); // ["name"]
        this.state = {
            start_date: new Moment().subtract(7, "days").toDate(),
            end_date: new Date()
        };

    }

    componentDidMount() {

    }
    handleChange = (field, value) =>{


    }
    onDateChange = (event, picker) =>
    {
        console.log(picker.startDate._d);
        const start_d =  new Date(picker.startDate._d);
        const end_d =  new Date(picker.endDate._d);
        console.log(end_d.toString());
        this.setState({ start_date: start_d });
        this.setState({ end_date: end_d });
    }

    render() {
        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light  bg-light">
                    <Link className="navbar-brand" to="/actions">Actions</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/predictions">Predictions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/views">Views</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/campaigns">Campaigns</Link>
                        </li>
                    </ul>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <span className="number">{Moment(this.state.start_date).format('MMMM Do YYYY')}</span>
                                -  <span className="number">{Moment(this.state.end_date).format('MMMM Do YYYY')}</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><DateRange startDate={this.state.start_date} endDate={this.state.end_date} onSubmit={this.onDateChange} /></a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route path="/actions/:uid?" render={(props) => <Actions {...props} state={this.state} />} />
                <Route path="/predictions/:uid?" render={(props) => <Predictions {...props} state={this.state} />} />
                <Route path="/views/:uid?" render={(props) => <Views {...props} state={this.state} />} />
                <Route path="/campaigns/:uid?" render={(props) => <Campaigns {...props} state={this.state} />} />
            </div>

        );
    }
}

export default App;
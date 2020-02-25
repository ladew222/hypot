import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import request from 'superagent';
import Predictions from "./Predictions";
import Views from "./views";
import Actions from "./actions";
import Campaigns from "./campaigns";



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
        this.fetchPhotos = this.fetchPhotos.bind(this)  //needed for reference below
        this.isAlert = false;

    }

    componentDidMount() {
        this.fetchPhotos();
    }
    fetchPhotos() {  //call api from drupal to get slides, stores in photos
        request
            .get("http://localhost:3000/api/predictions")
            .then((res) => {
                this.setState({
                    photos: res.response
                })
            })
    }

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/actions">Actions</Link></li>
                    <li><Link to="/predictions">Predictions</Link></li>
                    <li><Link to="/views">Views</Link></li>
                    <li><Link to="/campaigns">Campaigns</Link></li>

                </ul>
                <Route path="/actions/:uid?" component={Actions}/>
                <Route path="/predictions/:uid?" component={Predictions}/>
                <Route path="/views/:uid?" component={Views}/>
                <Route path="/campaigns/:uid?" component={Campaigns}/>
            </div>
        );
    }
}

export default App;
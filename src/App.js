import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import request from 'superagent';
import Predictions from "./Predictions";




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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/predictions">Predictions</Link></li>
                    <li><Link to="/cities">Cities</Link></li>
                </ul>

                <Route path="/" component={Home}/>
                <Route path="/predictions" component={Predictions}/>
                <Route path="/cities" component={City}/>
            </div>
        );
    }
}

export default App;
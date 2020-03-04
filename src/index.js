import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css'
import '../node_modules/react-bootstrap-toggle/dist/react-bootstrap2-toggle.js'
import '../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css'

ReactDOM.render(
    <Router>
        <App />
    </Router>, document.getElementById('root'));
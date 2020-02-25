import React, { Component } from 'react';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";

class Predictions extends Component {
    state = {
        products: [
            {
                pid: 1,
                pred: 'grad',
                'action_date': 1000
            },
            {
                pid: 2,
                pred: 'grad',
                'action_date': 1000
            },
            {
                pid: 4,
                pred: 'grad',
                'action_date': 1400
            },
        ],
        columns: [{
            dataField: 'pid',
            text: 'PID'
        },
            {
                dataField: 'pred',
                text: 'Predicion'
            }, {
                dataField: 'action_date',
                text: 'date',
                sort: true
            }]
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/predictions`)
            .then(res => {
                const posts = res.data.response;
                this.setState({ posts });
            });
    }


    render() {

        if ( !this.state.posts) {
            // Note that you can return false it you want nothing to be put in the dom
            // This is also your chance to render a spinner or something...
            return <div>The responsive it not here yet!</div>
        }

        if ( this.state.posts.length === 0 ) {
            return <div>No result found for this subscription</div>;
        }

        return (
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    striped
                    hover
                    keyField='id'
                    data={ this.state.posts }
                    columns={ this.state.columns } />
            </div>
        );

    }
}

export default Predictions;


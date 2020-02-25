import React, { Component } from 'react';
import { Button } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Dialog from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import axios from "axios";

function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        < div id={`${row.uid}-dropdown`}
            style={{ textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal" }}>
            <a href={`/views/${row.uid}`} >{row.uid} </a>
            < div
                style={{ fontSize: 20 }}
                color="disabled"
            />
        </div>
    ); }



class Views extends Component {

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
            dataField: 'uid',
            text: 'UID'
        },
            {
                dataField: 'title',
                text: 'Title',
                sort: true,
                filter: textFilter(),
            }, {
                dataField: 'view_date',
                text: 'date',
                sort: true,
            },
            {
                dataField: 'path1',
                isDummyField: true,
                text: 'other pages',
                formatter: rankFormatter,
                sort: false,
            }
            ]
    }
    componentDidMount() {
        var getstr = "";
        const { params } = this.props.match;
        if (params.uid){
            getstr="http://localhost:3000/api/views/"+params.uid;
        }
        else{
            getstr="http://localhost:3000/api/views/";
        }
        axios.get(getstr)
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
                    filter = { filterFactory() }
                    striped
                    filterPosition="top"
                    bootstrap4 = {true}
                    hover
                    keyField='pid'
                    data={ this.state.posts }
                    columns={ this.state.columns } >
                </BootstrapTable>
            </div>
        );

    }
}

export default Views;


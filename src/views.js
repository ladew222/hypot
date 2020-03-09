import React, { Component, useContext  } from 'react';
import { Button } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Dialog from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {dateFilter, textFilter} from 'react-bootstrap-table2-filter';
import axios from "axios";
import ViewDynamicSelect from "./ViewFilterSelector";
import DynamicSelect from "./FilterSelector";
import LoadSpinner from "./loading";
import paginationFactory from "react-bootstrap-table2-paginator";

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

const arrayOfData = [
    {
        id: 'title',
        name: 'Title'
    },
    {
        id: 'parenturl',
        name: 'Parent'
    },
    {
        id: 'origin',
        name: 'origin'
    },
    {
        id: 'campaign',
        name: 'campaign'
    }
];

let colind = [{
    dataField: 'uid',
    text: 'UID',
    filter: textFilter()
},
    {
        dataField: 'title',
        text: 'Title',
        sort: true,
        filter: textFilter(),
    },
    {
        dataField: 'view_date',
        text: 'date',
        sort: true,
        filter: dateFilter(),
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
                dateObj = new Date(cell);
            }
            return `${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${('0' + dateObj.getUTCDate()).slice(-2)}/${dateObj.getUTCFullYear()}`;
        }
    },
    {
        dataField: 'path1',
        text: 'parent',
        sort: true,
        filter: textFilter(),
    }
]

let colgrp = [
    {
        dataField: 'title',
        text: 'Title',
        sort: true,
        filter: textFilter(),
    },
    {
        dataField: 'path1',
        text: 'Parent',
        sort: true,
        filter: textFilter(),
    },
    {
        dataField: 'count',
        text: 'Views',
        sort: true,
        filter: textFilter(),
    }
]

let colusr = [
    {
        dataField: 'actions',
        isDummyField: true,
        text: 'Views',
        formatter: rankFormatter,
        sort: false,
    },
    {
        dataField: 'title',
        text: 'Title',
        sort: true,
        filter: textFilter(),
    },
    {
        dataField: 'path1',
        text: 'Parent',
        sort: true,
        filter: textFilter(),
    },
    {
        dataField: 'count',
        text: 'Views',
        sort: true,
        filter: textFilter(),
    }
]

class Views extends Component {



    state = {

        columns: [{
            dataField: 'uid',
            text: 'UID',
            filter: textFilter()
        },
            {
                dataField: 'title',
                text: 'Title',
                sort: true,
                filter: textFilter(),
            },
            {
                dataField: 'view_date',
                text: 'date',
                sort: true,
                filter: dateFilter(),
                formatter: (cell) => {
                    let dateObj = cell;
                    if (typeof cell !== 'object') {
                        dateObj = new Date(cell);
                    }
                    return `${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${('0' + dateObj.getUTCDate()).slice(-2)}/${dateObj.getUTCFullYear()}`;
                }
            },
            {
                dataField: 'path1',
                text: 'parent',
                sort: true,
                filter: textFilter(),
            }
            ]
    }
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    }
    componentDidMount() {
        //const user = useContext(UserContext);
        //console.log(user.name);
        let context = this.context;
        console.log(context);
        //this.context ="eeee";
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
                this.setState({
                    loading: false,
                    posts: posts,
                    rowcount: posts.length
                })
            });
    }
    handleSearchChange = (searchText, colInfos, multiColumnSearch) =>{
        //..
        this.refs.getTableDataIgnorePaging();  //'this' is undefined and I have no idea, how do I get current cell values
    }

    handleSelectChange = (params,filter_advanced) => {
        let getstr="";

        let filter = params[0].name;
        let filter_text = params[0].filter;

        switch (filter_advanced) {
            case 'individual':
                this.state.columns=colind;
                getstr = "http://localhost:3000/api/viewsInd/" + this.props.state.start_date.toISOString() + "/" + this.props.state.end_date.toISOString() + "/" + filter +"/"+ filter_text ;
                break;
            case 'group':
                getstr = "http://localhost:3000/api/viewsGrp/" + this.props.state.start_date.toISOString() + "/" + this.props.state.end_date.toISOString() + "/" + filter +"/"+ filter_text ;
                this.state.columns=colgrp;
                break;
            case 'user':
                getstr = "http://localhost:3000/api/viewsUsr/" + this.props.state.start_date.toISOString() + "/" + this.props.state.end_date.toISOString() + "/" + filter +"/"+ filter_text ;
                this.state.columns=colusr;
                break;
            default:
            // code block
        }
        console.log("here");
        this.setState({loading: true}, () => {
            axios.get(getstr)
                .then(result => this.setState({
                    loading: false,
                    posts: result.data.response,
                    rowcount: result.data.response.length
                }));
        });


    }

    render() {



        const options = {
            onSearchChange: this.handleSearchChange.bind(this),
            onFilterChange : this.handleSearchChange.bind(this)
        };
        const { posts, loading } = this.state;


        if( !this.state.posts) {
            // Note that you can return false it you want nothing to be put in the dom
            // This is also your chance to render a spinner or something...
            return <div>The responsive it not here yet!</div>
        }

        if ( this.state.posts.length === 0 ) {
            return <div>No result found </div>;
        }
        else {

            return (
                <div>
                    <ViewDynamicSelect arrayOfData={arrayOfData} start_date={this.props.state.start_date}
                                       end_date={this.props.state.end_date} onSelectChange={this.handleSelectChange}/>
                    {loading ? (
                        <LoadSpinner/>
                    ) : (
                        <div className="container" style={{marginTop: 50}}>
                            <span className="badge badge-default">{this.state.posts.length} Records</span>
                            <span className="badge badge-default">{this.state.rowCount} Filtered</span>
                            <BootstrapTable
                                filter={filterFactory()}
                                striped
                                filterPosition="top"
                                bootstrap4={true}
                                onDataSizeChange={this.handleDataChange}
                                hover
                                keyField='pid'
                                data={this.state.posts}
                                columns={this.state.columns}>
                            </BootstrapTable>
                        </div>

                    )}
                </div>


            );
        }
    }
}
export default Views;


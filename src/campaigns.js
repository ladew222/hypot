import React, { Component } from 'react';
import { Button } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Dialog from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter,dateFilter } from 'react-bootstrap-table2-filter';
import DynamicSelect from "./FilterSelector";
import axios from "axios";
import AutoComplete from "./AutoComplete";
import { usePromiseTracker } from "react-promise-tracker";
import LoadSpinner from "./loading";
import paginationFactory from "react-bootstrap-table2-paginator";
import Moment from 'moment';
var _ = require('lodash');



function createApiStr(params,val){
    let found = params.filter(obj => {
        return obj.name === val
    })
    if (found[0]){
        console.log("found:" + "/" + found[0].filter);
        return ("/" + found[0].filter);
    }
    else{
        console.log("notfound");
        return ("/" + "na");
    }


}

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
        id: 'content',
        name: 'content'
    },
    {
        id: 'source',
        name: 'source'
    },
    {
        id: 'medium',
        name: 'medium'
    },
    {
        id: 'campaign',
        name: 'campaign'
    }
];

class Campaigns extends Component {

    constructor(props){
        super(props)

      /*  this.state = {
            filter_text: "",
            filter_type: false,

        };*/

       /* this.state = {
            selectedValue: 'Nothing selected',
            filter_text: "",
            filter_type: false,
            columns: null,
            posts:null

        };*/

        /*   this.state={
               selectedValue: 'Nothing selected'
           }*/
    }


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
        columns: [
            {
                dataField: 'source',
                text: 'Source',
                sort: true,
                filter: textFilter(),
            },
            {
                dataField: 'medium',
                text: 'Medium',
                sort: true,
                filter: textFilter(),
            },
            {
                dataField: 'content',
                text: 'Content',
                sort: true,
                filter: textFilter(),
            }, {

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
                isDummyField: true,
                text: 'other pages',
                formatter: rankFormatter,
                sort: false,
            }
            ]
    }
    handleSearchChange = (searchText, colInfos, multiColumnSearch) =>{
        //..
        this.refs.getTableDataIgnorePaging();  //'this' is undefined and I have no idea, how do I get current cell values
    }
    handleSelectChange = (params,filter_advanced) => {
        let newstr = createApiStr(params, "campaign");
        newstr += createApiStr(params, "source");
        newstr += createApiStr(params, "medium");
        newstr += createApiStr(params, "content");

        let getstr = "";
        switch (filter_advanced) {
            case 'all':
                getstr = "http://localhost:3000/api/campaigns_content/" + this.props.state.start_date.toISOString() + "/" + this.props.state.end_date.toISOString() + newstr;
                break;
            case 'converters':
                getstr = "http://localhost:3000/api/campaigns_content_su/" + this.props.state.start_date.toISOString() + "/" + this.props.state.end_date.toISOString() + newstr;
                break;
            case 'merged':
                getstr = "http://localhost:3000/api/campaigns_content/" + this.props.state.start_date.toISOString() + "/" + this.props.state.end_date.toISOString() + newstr;
                this.state.columns.push( {
                    dataField: 'program_desc',
                    text: 'Program',
                    sort: true
                })
                this.state.columns.push( {
                    dataField: 'Opportgarefid',
                    text: 'Opportgarefid',
                    sort: true
                })
                break;
            default:
            // code block
        }
        console.log(getstr);
        if (filter_advanced!='merged') {
            this.setState({loading: true}, () => {
                axios.get(getstr)
                    .then(result => this.setState({
                        loading: false,
                        posts: result.data.response,
                        rowcount: result.data.response.length
                    }));
            });
        }
        else{
            this.setState({loading: true}, () => {
                let one = getstr;
                let two = "http://localhost:3000/test";
                const requestOne = axios.get(one);
                const requestTwo = axios.get(two);
                axios
                    .all([requestOne, requestTwo,])
                    .then(
                        axios.spread((...responses) => {
                            let a1 = responses[0];
                            let a2 = responses[1];
                            console.log("here");
                            console.log(responses[0]);
                            console.log(responses[1]);
                            let merged = [];
                            a1=a1.data.response;
                            console.log("a1");
                            console.log(a1);
                            a2=a2.data;
                            console.log("a2");
                            console.log(a2);
                            const mergeById = (a1, a2) =>
                                a1.map(itm => ({
                                    ...a2.find((item) => ('item.uid'== '111') ),
                                    ...itm
                                }));
                            merged=mergeById(a1, a2);
                            console.log("merged");
                            console.log(merged);
                            console.log("unique");
                            console.log(_.filter(merged, _.all));
                            this.setState({
                                loading: false,
                                posts: merged,
                                rowcount: merged.length
                            })
                            console.log("here2");
                            // use/access the results
                            //console.log(a1, a2);
                        })
                    )
                    .catch(errors => {
                        // react on errors.
                        console.error(errors);
                    });
            });


        }


    }


    componentDidMount() {
        var getstr = "";
        const { params } = this.props.match;
      /*  if (params.uid){
            getstr="http://localhost:3000/api/campaigns/"+params.uid;
        }
        else{
            getstr="http://localhost:3000/api/campaigns/";
        }*/


        getstr="http://localhost:3000/api/campaigns/";
        if (1==1) {
            axios.get(getstr)
                .then(res => {
                    const posts = res.data.response;
                    this.setState({posts});
                });
        }
        else{

        }
    }
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
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
         else{

            return (
                <div>
                    <DynamicSelect arrayOfData={arrayOfData} start_date={this.props.state.start_date} end_date={this.props.state.end_date} onSelectChange={this.handleSelectChange} />
                    {loading ? (
                        <LoadSpinner />
                    ) : (
                        <div className="container" style={{ marginTop: 50 }}>
                            <span className="badge badge-default">{this.state.posts.length} Records</span>
                            <span className="badge badge-default">{this.state.rowCount} Filtered</span>
                            <BootstrapTable
                                filter = { filterFactory() }
                                striped
                                filterPosition="top"
                                onDataSizeChange={ this.handleDataChange }
                                bootstrap4 = {true}
                                hover
                                keyField='pid'
                                data={ this.state.posts }
                                columns={ this.state.columns }
                                pagination={paginationFactory({})}
                            >
                            </BootstrapTable>
                        </div>

                    )}
                </div>




            );
         }

    }
}

export default Campaigns;


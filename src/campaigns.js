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

function createApiStr(params,val){
    let found = params.filter(obj => {
        return obj.Name === val
    })
    if (found){
        console.log("found:" + "/" + found.filter.toString());
        return "/" + found.filter.toString();
    }
    else{
        console.log("notfound");
        return "/" + "na";
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
        id: 'uid',
        name: 'uid'
    },
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
    handleSelectChange = (params,filter_advanced) =>{
        /*this.setState({
            selectedValue: selectedValue
        });*/
        var getstr = "";

        //newstr+= createApiStr(params,"source");
         //newstr+= createApiStr(params,"medium");
         //newstr+= createApiStr(params,"content");


         switch(filter_advanced) {
             case 'all':
                 getstr="http://localhost:3000/api/campaigns_content/"+this.props.state.start_date.toISOString()+"/"+ this.props.state.end_date.toISOString();
                 break;
             case 'converters':
                 getstr="http://localhost:3000/api/campaigns_content_su/"+this.props.state.start_date.toISOString()+"/"+ this.props.state.end_date.toISOString();
                 break;
             default:
             // code block
         }

         console.log(getstr);
         this.setState({ loading: true }, () => {
             axios.get(getstr)
                 .then(result => this.setState({
                     loading: false,
                     posts: result.data.response,
                     rowcount: result.data.response.length
                 }));
         });




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
        axios.get(getstr)
            .then(res => {
                const posts = res.data.response;
                this.setState({ posts });
            });
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


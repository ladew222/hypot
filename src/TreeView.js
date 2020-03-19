import React, { Component, useContext  } from 'react';
import { Button } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {dateFilter, textFilter} from 'react-bootstrap-table2-filter';
import axios from "axios";
import ViewDynamicSelect from "./ViewFilterSelector";
import LoadSpinner from "./loading";
import paginationFactory from "react-bootstrap-table2-paginator";
import GroupFilter from "./GroupFilter";
import Pane from "./pane";
import DyTree from "./tree";

const groupBy = (array, key) => {
                      return array.reduce((result, currentValue) => {
                        (result[eval('currentValue.'+key)] = result[eval('currentValue.'+key)] || []).push(
                          currentValue
                        );

                        console.log(result);
                        return result;
                      }, {});
                    };



function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        < div id={`${row.uid}-dropdown`}
            style={{ textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal" }}>
            <a href={`/users/${row.userid}`} >{row.username} </a>
            < div
                style={{ fontSize: 20 }}
                color="disabled"
            />
        </div>
    ); }


     let documents = [
    {
        dataField: 'uri',
        text: 'uri',
        sort: true,
        filter: textFilter(),
    },
    {
        dataField: 'commenters',
        text: 'commenters',
        sort: true,
        filter: textFilter(),
    }
];
let members = [{
                dataField: 'userid',
                text: 'userid',
                filter: textFilter()
            },
            {
                dataField: 'username',
                text: 'username',
                sort: true,
                filter: textFilter(),
            },
            {
                dataField: 'display_name',
                text: 'display_name',
                sort: true,
                filter: textFilter(),
            },
            {
                dataField: 'UserInfo',
                isDummyField: true,
                text: 'other pages',
                formatter: rankFormatter,
                sort: false,
            },
            ];


class TreeView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pane_open: false,
            filter:'Users',
            pane_values: {text:'',user:'',created:'',updated:'',uri:''}
        };

    }



    state = {

            columns: [{
                dataField: 'userid',
                text: 'userid',
                filter: textFilter()
            },
            {
                dataField: 'username',
                text: 'username',
                sort: true,
                filter: textFilter(),
            },
            {
                dataField: 'display_name',
                text: 'display_name',
                sort: true,
                filter: textFilter(),
            },
            {
                dataField: 'UserInfo',
                isDummyField: true,
                text: 'other pages',
                formatter: rankFormatter,
                sort: false,
            },
            ]
    }
    handleDataChange = ( tree ) => {
        console.log("tree");
        console.log(tree);

        this.setState({
                    loading: tree.loading,
                    posts: tree.data,
                    rowcount: tree.rowcount
                })
    }
    componentDidMount() {
        //const user = useContext(UserContext);
        //console.log(user.name);
        //let context = this.context;
        //console.log(context);
        //this.context ="eeee";
        var getstr = "";

        const { params } = this.props.match;
        console.log(this.props);
        getstr="https://api.hypothes.is/api/groups/" + this.props.state.groupId +"/members";

    }
    handleFilterChange = (value) =>{
        //..
        console.log("filter sent");
        console.log(value);
        this.setState({filter: value});

    }
    togglePane = (value) =>{
        //..
        console.log("click up");
        console.log(value);
        this.setState(prevState => ({
          pane_open: !prevState.pane_open,
            pane_values: {text:value.text.toString(),user:value.user.toString(),created:value.created.toString(),updated:value.updated.toString(),uri:value.uri.toString()},
        }));

    }
     onClosePane = () =>{
        //..
        this.setState({pane_open: false});

    }



    render() {

        const { posts, loading } = this.state;



        return (
            <div>
                <h2>Treeview--for details select and press a key</h2>
                    <div className="container" style={{marginTop: 50}}>
                          <Pane Toggle={this.state.pane_open} onClose={this.onClosePane} info={this.state.pane_values}/>
                        <GroupFilter onChange={this.handleFilterChange} />
                        <span className="badge badge-default">{ this.state.rowcount ? this.state.rowcount  : "0" } Records</span>
                        <span className="badge badge-default">{this.state.rowCount} Filtered</span>
                        <DyTree Super={this.props} onPanelClick={this.togglePane} filter={this.state.filter} updateTree={this.handleDataChange}/>
                    </div>
            </div>


        );

    }
}
export default TreeView;


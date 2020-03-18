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
            pane_open: false
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
    handleDataChange = ({ dataSize }) => {
        this.setState({ rowCount: dataSize });
    }
    componentDidMount() {
        //const user = useContext(UserContext);
        //console.log(user.name);
        //let context = this.context;
        //console.log(context);
        //this.context ="eeee";
        var getstr = "";

        const { params } = this.props.match;
        getstr="https://api.hypothes.is/api/groups/" + 'arVX9DZ4' +"/members";
        var config = {
          headers: {'Accept': 'application/json',  'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',}
        };

        axios.get(getstr, config)
            .then(res => {
                const posts = res.data;
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
    togglePane = (value) =>{
        //..
        console.log("click up");
        console.log(value);
        this.setState(prevState => ({
          pane_open: !prevState.pane_open,
            pane_value: value.toString(),
        }));

    }
     onClosePane = () =>{
        //..
        this.setState({pane_open: false});

    }

    handleFilterChange = (value) =>{
        console.log("filter change");
        const { params } = this.props.match;
        let getstr ="";
        this.setState({filter_value: value});
        switch (value) {
            case 'Members':
                this.state.columns=members;
                getstr = "https://api.hypothes.is/api/search?group="+this.props.state.groupId;
                break;
            case 'Documents':
                this.state.columns=documents;
                getstr = "https://api.hypothes.is/api/search?group="+this.props.state.groupId;
                break;
            case 'user':

                break;
            default:
            // code block
        }
        console.log(getstr);

        let config = {
          headers: {'Accept': 'application/json',  'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',}
        };

        this.setState({loading: true}, () => {
            axios.get(getstr,config)
              .then(function (result) {
                    console.log(result);

                    console.log("reorg-1");
                    const personGroupedByColor = groupBy(result.data.rows, "user");

                    console.log("reorg-2");
                    console.log(personGroupedByColor);
                    console.log("reorg-3");
                    this.setState({
                        loading: false,
                        posts: result.data.response,
                        rowcount: result.data.response.length
                    });
              })
              .catch(function (error) {
                    console.log(error);
              });

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
                    {loading ? (
                        <LoadSpinner/>
                    ) : (

                        <div className="container" style={{marginTop: 50}}>
                              <Pane Toggle={this.state.pane_open} onClose={this.onClosePane} ToggleValue={this.state.pane_value}/>
                            <GroupFilter onChange={this.handleFilterChange} />
                            <span className="badge badge-default">{this.state.posts.length} Records</span>
                            <span className="badge badge-default">{this.state.rowCount} Filtered</span>
                            <DyTree onPanelClick={this.togglePane}/>
                        </div>

                    )}
                </div>


            );
        }
    }
}
export default TreeView;


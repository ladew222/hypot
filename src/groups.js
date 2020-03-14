import React, { Component, useContext  } from 'react';
import { Button } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Dialog from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, {dateFilter, textFilter} from 'react-bootstrap-table2-filter';
import axios from "axios";
import ViewDynamicSelect from "./ViewFilterSelector";
import LoadSpinner from "./loading";
import paginationFactory from "react-bootstrap-table2-paginator";

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



class Groups extends Component {



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

    handleSelectChange = (params,filter_advanced) => {
        let getstr="";

        let filter = params[0].name;
        let filter_text = params[0].filter;

        getstr = "https://api.hypothes.is/api/groups/arVX9DZ4/members";
        const headers = {
          'Accept': 'application/json',
          'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',
        }
        console.log("here");

        this.setState({loading: true}, () => {
            axios.get(getstr, { headers: headers })
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
export default Groups;


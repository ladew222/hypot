import React, { Component,useState } from 'react';
import { Route, Link,Router } from 'react-router-dom';
import './App.css';
import {
  TreeDataState,
  CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import axios from "axios";




  const [columns] = [
    { name: 'uri', title: 'uri' },
    { name: 'user', title: 'user' },
    { name: 'created', title: 'created' },
    { name: 'text', title: 'text' },
        ];
  const [data] ="";
  const [tableColumnExtensions] = [
    { columnName: 'name', width: 300 },
  ];



const groupBy = (array, key) => {
                      return array.reduce((result, currentValue) => {
                        (result[eval('currentValue.'+key)] = result[eval('currentValue.'+key)] || []).push(
                          currentValue
                        );

                        console.log(result);
                        return result;
                      }, {});
                    };


class DropTable extends React.Component {

     constructor(props) {
        super(props);
    }
     componentWillMount() {

    }

    render() {

       let config = {
          headers: {'Accept': 'application/json',  'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',}
        };

        this.setState({loading: true}, () => {
            axios.get("https://api.hypothes.is/api/search?group=arVX9DZ4",config)
              .then(function (result) {
                    console.log(result);

                    console.log("reorg-1");
                    const personGroupedByColor = groupBy(result.data.rows, "user");

                    console.log("reorg-2");
                    console.log(personGroupedByColor);
                    console.log("reorg-3");
                    this.setState({
                        loading: false,
                        posts: personGroupedByColor,
                        rowcount: personGroupedByColor.length,
                    });
              })
              .catch(function (error) {
                    console.log(error);
              });

        });

       return (
            <div className="card">
            <Grid
              rows={data}
              columns={columns}
            >
              <TreeDataState />
              <CustomTreeData
                getChildRows={this.state.posts}
              />
              <Table
                columnExtensions={tableColumnExtensions}
              />
              <TableHeaderRow />
              <TableTreeColumn
                for="name"
              />
            </Grid>
          </div>

        );
    }



}
export default DropTable;


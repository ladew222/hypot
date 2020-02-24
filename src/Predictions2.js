import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import request from 'superagent';
import Table from "./Table";
import "./App.css";

fetchPhotos() {  //call api from drupal to get slides, stores in photos
  var randomstring = require("randomstring");
  randomstring.generate(7);
  request
      .get(this.server_name + this.monitor +'?'+ randomstring.generate(4))
      .then((res) => {
        this.setState({
          photos: res.body
        })
      })
}


function App() {
  this.columns = (
    () => [
      {
        Header: "TV Show",
        columns: [
          {
            Header: "Name",
            accessor: "uid"
          },
          {
            Header: "Type",
            accessor: "pred"
          },
          {
            Header: "Type",
            accessor: "action_date"
          }

        ]
      },

    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:3000/api/predictions");
      setData(result.data.response);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;

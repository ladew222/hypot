import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import request from 'superagent';
import Table from "./Table";
import "./App.css";

fetchPhotos() {  //call api from drupal to get slides, stores in photos

  request
      .get('http://localhost:3000/api/predictions')
      .then((res) => {
        this.setState({
          photos: res.body
        })
      })
}


function App() {
  this.columns = React.useMemo(
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
      setData(result.response);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;

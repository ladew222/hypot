import React from "react";
import ReactDOM from "react-dom";
import TreeView from "treeview-react-bootstrap";
import axios from "axios";

class Example extends React.Component {
    constructor() {
        super();
        // SET YOUR DATA
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        axios
            .get("https://api.hypothes.is/api/search")
            .then(data => {
                let transformedData = data.map(d => {
                    return {
                        text: d.text,
                        nodes: [
                            {
                                text: "dummy 1",
                                nodes: []
                            }
                        ]
                    };
                });
                this.setState({ data: transformedData });
            });
    }

    render() {
        return (
            // RENDER THE COMPONENT
            <TreeView data={this.state.data} />
        );
    }
}
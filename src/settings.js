import React, { Component, useContext  } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import DyDrop from "./DropDown";

//https://programmingwithmosh.com/react/localstorage-react/
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      group: null,
      groupId: null,
      success: false,
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({success:true})

  }
  componentWillMount() {
      this.setState({'key':this.props.state.key})
      this.setState({'group':this.props.state.group})
      this.setState({'groupId':this.props.state.groupId})
      this.state.success=false;
  }
  componentDidMount() {

  }
  dropChange = (value) => {
    this.setState({'group': value.name});
    this.setState({'groupId': value.value});
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (

        <div className="container">
          <div className="row">
          <form onSubmit={this.mySubmitHandler}>
            <h1>Hello {this.state.username} {this.state.age}</h1>
            <p>Enter your Dev Key:</p>
            <input
              type='text'
              name='key'
              style={{ width: "500px" }}
              value={this.state.key}
              onChange={this.myChangeHandler}
            />
            <p>Default Group:</p>
            <DyDrop value={{groupId:this.props.state.groupId,group:this.props.state.group}} onChange={this.dropChange} />
            <br/>
            {this.state.success
              ? <div className="alert alert-success"><strong>Success!</strong></div>
                : <span></span>
            }
            <br/>
            <input type='submit'/>
            </form>
          </div>

        </div>

    );
  }
}

export default Settings;


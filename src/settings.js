import React, { Component, useContext  } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

//https://programmingwithmosh.com/react/localstorage-react/
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      group: null,
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);


  }
  componentWillMount() {
      this.setState({'key':this.props.state.key})
      this.setState({'group':this.props.state.group})
  }
  componentDidMount() {

}
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (
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
      <input
        type='text'
        name='group'
        value={this.state.group}
        onChange={this.myChangeHandler}
      />
      <br/>
      <br/>
      <input type='submit'/>
      </form>
    );
  }
}

export default Settings;


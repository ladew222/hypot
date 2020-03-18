import React, { Component } from 'react';
import { Route, Link,Router } from 'react-router-dom';
import './App.css';
import Users from "./users";
import Moment from 'moment';
import idBox from "./IDbox";
import Groups from "./groups";
import Settings from "./settings";
import Select from 'react-select';
import DyDrop from "./DropDown";
import history from './history';
import DyTree from "./tree";
import Pane from "./pane"
import TreeView from "./TreeView";


const Home = () => (
    <div>
        <h2> Home </h2>
    </div>
);

const Airport = () => (
    <div>
        <ul>
            <li>Jomo Kenyatta</li>
            <li>Tambo</li>
            <li>Murtala Mohammed</li>
        </ul>
    </div>
);

const City = () => (
    <div>
        <ul>
            <li>San Francisco</li>
            <li>Istanbul</li>
            <li>Tokyo</li>
        </ul>
    </div>
);

class App extends Component {

    constructor(props) {
        super(props);

        console.log("start"); // ["name"]
        const key = localStorage.key;
        const group = localStorage.group;
        const groupId = localStorage.groupId;
        this.state = {
            key: key,
            group: group ? group: " ",
            groupId: groupId ? groupId: " ",
        };

    }
        onChangeDrop = (value) =>
    {
        console.log("event");
        this.setState({ group: value});

    }
       settingsChange = (value) =>
    {
        console.log("here");
        const { key, group,groupId } = value;
        localStorage.setItem('key', key);
        localStorage.setItem('group', group);
        localStorage.setItem('groupId', groupId);
        //this.setState({ group: group});
        //this.setState({ groupId: groupId});
        this.setState({ key: key});
        console.log("here2");

    }

    componentDidMount() {
        const key = localStorage.getItem('key');
        const group = localStorage.getItem('group');
        const groupId = localStorage.getItem('groupId');
        this.setState({ group: group});
        this.setState({ groupId: groupId});
        this.setState({ key: key});

    }
    handleChange = (field, value) =>{


    }
     onSubmit = (st) =>
    {
        const { key, group,groupId } = st;
        localStorage.setItem('key', key);
        localStorage.setItem('group', group);
        localStorage.setItem('groupId', groupId);
        this.setState({ group: group});
        this.setState({ groupId: groupId});
        this.setState({ key: key});
    }

    onIDChange = (event) =>
    {
        this.setState({ uid: event.target.value });
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light  bg-light">
                    <Link className="navbar-brand" to="/actions">Actions</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/predictions">Predictions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                        <li className="nav-item">
                             <Link className="nav-link" to="/groups">Group</Link>
                        </li>
                         <li className="nav-item">
                             <Link className="nav-link" to="/settings">Settings</Link>
                        </li>
                         <li className="nav-item">
                             <Link className="nav-link" to="/tree">Tree</Link>
                        </li>
                    </ul>
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <DyDrop onChange={this.onChangeDrop} value={{group:this.state.group,groupId:this.state.groupId}} /><input type="text" value={this.state.key+"a"} autoFocus="autofocus" onChange={this.onIDChange}/>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route path="/users/:uid?" render={(props) => <Users {...props} state={this.state} />} />
                <Route path="/groups/:gid?" render={(props) => <Groups {...props} state={this.state} />} />
                <Route path="/tree/:gid?/:uid?" render={(props) => <TreeView {...props} state={this.state} />} />
                <Route path="/settings" render={(props) => <Settings {...props} onSubmit={this.settingsChange} state={this.state} />} />
            </div>

        );
    }
}

export default App;
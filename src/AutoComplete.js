import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import Moment from 'moment';

//import './styles.css'

function getSuggestionValue(suggestion) {
    console.log("suggestion-value");
    console.log(suggestion);
    this.props.onSubmit("suggestion");
    return suggestion.name;
}


class AutoComplete extends React.Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      500,
      this.onSuggestionsFetchRequested
    )
  }
  renderSuggestion = suggestion => {
      console.log("render");
      this.setState({ value: suggestion.name });
       this.setState({ id: suggestion.id});
    return (
      <div className="result">
        <div>{suggestion.name}</div>
      </div>
    )
  }
  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
 /* onChange = (event, { newValue }) => {
    //let obj = this.state.suggestion.find(obj => obj.name == newValue);
    this.setState({ value: newValue })

  }*/
  onChange = e => {
    const { suggestions } = this.props.suggestion;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };


onSuggestionsFetchRequested = ({ value }) => {

         let getstr = 'https://api.hypothes.is/api/profile/groups';

         var config = {
          headers: {'Accept': 'application/json',  'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',}
        };

         axios.get("https://api.hypothes.is/api/profile/groups", config)
            .then(res => {
                const posts = res.data.rows;
                let new_arr=[];
                console.log(res.data);
                Object.keys(res.data).forEach(function (item) {
                    console.log(item); // key
                    console.log(res.data[item]); // value
                    new_arr.push({name:res.data[item].name,id:res.data[item].id});
                });
                this.setState({suggestions: new_arr});
        });



}

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: 'Name',
      value,
      onChange: this.onChange
    }

    return (
      <div className="as">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    )
  }
}
export default AutoComplete;
import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import Moment from 'moment';

//import './styles.css'

function getSuggestionValue(suggestion) {
    console.log(suggestion);
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
      console.log(suggestion);
      this.setState({ value: suggestion.name })
    return (
      <div className="result">
        <div>{suggestion.name}</div>
      </div>
    )
  }
  onChange = (event, { newValue }) => {
    let obj = this.state.suggestion.find(obj => obj.name == newValue);
    this.setState({ value: newValue })
      this.props.onSubmit(obj.id);
  }


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
                    new_arr.push({name:res.data[item].name,id:res.data[item]});
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
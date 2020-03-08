import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import DynamicSelect from "./FilterSelector";
import Moment from 'moment';

//import './styles.css'

function getSuggestionValue(suggestion) {
    console.log(suggestion);
    return suggestion;
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
      this.setState({ value: suggestion })
    return (
      <div className="result">
        <div>{suggestion}</div>
      </div>
    )
  }
  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
      this.props.onSubmit(newValue);
  }


onSuggestionsFetchRequested = ({ value }) => {
      if(this.props.use==true){
          let getstr = 'http://localhost:3000/api/dist/' + this.props.start_date.toISOString() + "/" + this.props.end_date.toISOString() + "/" +  value + "/" + this.props.filter_type ;

        axios
            .get(getstr, {
                query: {
                    multi_match: {
                        query: value,
                        fields: [this.props.filter_type]
                    }
                },

            })
            .then(res => {
                console.log(res );
                //const results = res.data.response;
                //const results = res.data.response.map(h => h.content);
                const results = eval('res.data.response.map(h => h.' +this.props.filter_type + ')');
                //const results = res.data.hits.hits.map(h => h.content)
                this.setState({ suggestions: results });
            })
      }
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
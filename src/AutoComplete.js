import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import DynamicSelect from "./FilterSelector";

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
    return (
      <div className="result">
        <div>{suggestion}</div>
        <div className="shortCode">{suggestion}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
      this.props.onSubmit(newValue);
  }

  onSuggestionsFetchRequested = ({ value }) => {
      axios.get('http://localhost:3000/api/distinct_content')
          .then(res => {
              const posts = res.data.response;
              this.setState({ suggestions: posts });
          });
  }

onSuggestionsFetchRequested = ({ value }) => {
    axios
        .get('http://localhost:3000/api/dist_content/'+value, {
            query: {
                multi_match: {
                    query: value,
                    fields: ['content']
                }
            },

        })
        .then(res => {
            console.log(res );
            //const results = res.data.response;
            const results = res.data.response.map(h => h.content)
            //const results = res.data.hits.hits.map(h => h.content)
            this.setState({ suggestions: results })
        })
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
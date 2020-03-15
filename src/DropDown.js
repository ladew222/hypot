import React from 'react';
import Select from 'react-select';
import axios from "axios";

class DyDrop extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        selectedOption: '',
        value: '',
        clearable: true,
        groups: [],
     }
   }
   componentDidMount() {
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
                this.setState({groups: new_arr});
        });
   }
   handleChange = (event) => {
        console.log(event);
        this.setState({value: event.value});
        this.setState({selectedOption: event.label});
        this.props.onChange({name: event.label,value: event.value});
    }


   render(){
        let options = this.state.groups.map(function (option) {
            return { value: option.id, label: option.name };
        })
         return (
              <div>
                   <Select
                        name="form-field-name"
                        defaultValue={{ label: this.props.value.group, value: this.props.value.groupId }}
                        onChange={this.handleChange}
                        clearable={this.state.clearable}
                        searchable={this.state.searchable}
                        options={options}
                    />
              </div>
          )
        }
}
export default DyDrop;
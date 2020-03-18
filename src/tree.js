import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import * as moment from 'moment'
import axios from "axios";


const StyledAnnotation = (data) => {
    console.log('iiiin');
    console.log(data);
    console.log(data.data.id);
    const create_date = new moment(data.data.created).format('DD/MM/YYYY');
    const modify_date = new moment(data.data.updated).format('DD/MM/YYYY');
  return (
      <div className="blurb">
          <div className="row">
              <div className="col-8"><a href={data.data.links.incontext}>{data.data.uri}</a></div>
              <div className="col-2">{create_date}</div>
              <div className="col-2">{modify_date}</div>
          </div>
      </div>

  )
}

const GroupedAnnotations = ({ qualifier, data,cnt }) => {
    console.log("data");
    console.log(data);
    console.log(data);
  return (
    <div>
        {Object.keys(data).map(key => (
            <TreeItem nodeId={data[key].id} label={<StyledAnnotation data={data[key]}/>} />
      ))}

    </div>
  )
}




const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});



const groupBy = (array, key) => {

                      return array.reduce((result, currentValue) => {
                        (result[eval('currentValue.'+key)] = result[eval('currentValue.'+key)] || []).push(
                          currentValue
                        );
                        return result;
                      }, {});
                    };



class DyTree extends React.Component {
    constructor() {
        super();
        // SET YOUR DATA


        this.state = {
            data: []
        };
    }
    componentDidMount() {
        let config = {
          headers: {'Accept': 'application/json',  'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',}
        };

         this.setState({loading: true}, () => {
            axios.get("https://api.hypothes.is/api/search?group=arVX9DZ4", config)
                .then(response => {
                    //...
                    const ee =groupBy(response.data.rows,"user");
                    return (ee);
                  })
                .then(
                    result => this.setState({
                    loading: false,
                    data: result,
                    rowcount: result.length
                }));
        });
         console.log("it");



    }

    render() {


        console.log("data:");
        console.log(this.state.data);
        console.log("Len:");
        console.log('======= Object.keys ==========');

        let itemList=[];
        let x=0;
        Object.keys(this.state.data).forEach(key => {
          let value = this.state.data[key];
          console.log("here");
          console.log(value);
            itemList.push(<TreeItem nodeId={'g-'+x.toString()} label={key}><GroupedAnnotations data={value}  Qualifier={"aa"}/></TreeItem>);
        });
        console.log("array");
        console.log(itemList);

        return (

            <div>


       <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>

       </TreeView>


            <TreeView

      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Applications">
      <TreeItem nodeId="2" label="Calendar" />
      <TreeItem nodeId="3" label="Chrome" />
      <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
       {itemList}
    </TreeView>
            </div>
        );
    }
}
export default DyTree;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import * as moment from 'moment'
import axios from "axios";
import { Manager, Reference, Popper } from 'react-popper';

let count =0;

const StyledAnnotation = ({data,click_handler}) => {
    console.log('iiiin');
    console.log(data);
    console.log(data.uri);
    console.log("out");
    const create_date = new moment(data.created).format('DD/MM/YYYY');
    const modify_date = new moment(data.updated).format('DD/MM/YYYY');
    const extra = data.text.length>38 ? "..." : ""
  return (
      <div className="blurb"><div className="row">
              <div className="col-5"><a href={data.links.incontext}>{data.uri}</a></div>
              <div className="col-2">{data.user.substring(5)}</div>
              <div className="col-1">{create_date}</div>
              <div className="col-1">{modify_date}</div>
              <div className="col-3">{data.text.substring(0,38)+ extra }</div>
          </div>

      </div>

  )
}

const GroupedAnnotations = ({ data,click_handler}) => {
    console.log("data");
    console.log(data);
    console.log(data);
  return (
    <div>
        {Object.keys(data).map(key => (
            <TreeItem  nodeId={'i-'+data[key].id.toString()} onKeyDown={() => click_handler({text: data[key].text,updated: data[key].updated,user:data[key].user,created:data[key].created,uri:data[key].uri})} nodeId={data[key].id} label={<StyledAnnotation data={data[key]} click_handler={click_handler}/>} />
      ))}

    </div>
  )
}





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
        this.setState({
                        loading: false,
                        data:[],
                        rowcount:0,
                    })


    }
    componentDidUpdate(prevProps) {
      let getstr="";
      console.log("got update--");
      let search_key="";
      console.log(prevProps.filter);
      console.log("=");
      console.log(this.props.filter);

      if (this.props.filter !== prevProps.filter) {
         console.log("--got update2--");
         let config = {
          headers: {'Accept': 'application/json',  'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',}
         };
         //rerun query
         console.log("swtich");
         console.log(this.props.filter);
         switch (this.props.filter) {
            case 'Users':
                //this.state.columns=Users;
                getstr = "https://api.hypothes.is/api/search?group="+this.props.Super.state.groupId;
                search_key="user";
                break;
            case 'Document':
               // this.state.columns=Documents;
                getstr = "https://api.hypothes.is/api/search?group="+this.props.Super.state.groupId;
                search_key="uri";
                break;
            case 'Week':
                //this.state.columns=Week;
                getstr = "https://api.hypothes.is/api/search?group="+this.props.Super.state.groupId;
                search_key="user";
                break;
            case 'user':

                break;
            default:
            // code block
        }
         console.log("running::");
         console.log(getstr);
         this.setState({loading: true}, () => {
            axios.get(getstr, config)
                .then(response => {
                    //...
                    const ee =groupBy(response.data.rows,search_key);
                    return (ee);
                  })
                .then(result => {
                    //...
                    this.setState({
                        loading: false,
                        data: result,
                        rowcount:Object.keys(result).length,
                    })
                  })
                .then(response2 => {
                    //...
                    this.props.updateTree(this.state);
                });

        });
         console.log("it");
      }
    }
    componentDidMount() {
        let config = {
          headers: {'Accept': 'application/json',  'Authorization':  'Bearer 6879-lEKYN1uJ5X_gTVo5u6avX4-jAbUcY0EMFoKsakPIfug',}
        };
        console.log("this.props");
        console.log(this.props);
         this.setState({loading: true}, () => {
            axios.get("https://api.hypothes.is/api/search?group="+this.props.Super.state.groupId, config)
                .then(response => {
                    //...
                    const ee =groupBy(response.data.rows,"user");
                    return (ee);
                  })
                .then(result => {
                    //...
                    this.setState({
                        loading: false,
                        data: result,
                        rowcount:Object.keys(result).length,
                    })
                  })
                .then(response2 => {
                    //...
                    this.props.updateTree(this.state);
                });

        });
         console.log("it");



    }
     handleClick = (event) =>
    {
        console.log("click happened");
        console.log(event);
        console.log(event.target);
        this.props.onPanelClick(event);
    }


    render() {

        let itemList=[];
        if(this.state && this.state.rowcount>0){
            let x=0;
            Object.keys(this.state.data).forEach(key => {
              let value = this.state.data[key];
              console.log("here");
              console.log(value);
                itemList.push(<TreeItem nodeId={'g-'+ x.toString()} label={key}><GroupedAnnotations data={value} click_handler={this.handleClick}  /></TreeItem>);
                x++;
            });
            console.log("array");
            console.log(itemList);
        }
        else{

        }



        return (

            <div>


       <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>

       </TreeView>


            <TreeView

      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >

        {itemList}
    </TreeView>
            </div>
        );
    }
}
export default DyTree;
import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import matchSorter from 'match-sorter'
import "react-table-v6/react-table.css"
import {Link} from 'react-router-dom'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Nvt from "../Nvt.png";
import './style.css'
import config from "../config";

const theme = {
    blue: {
        default: "#3B5998",
        hover: "#283593"
    },
    pink: {
      default: "#e91e63",
      hover: "#ad1457"
    }
  };


//Field, Application & Entity- switching button styling
  const Button = styled.button`
  background-color: ${props => theme[props.theme].default};
  color: white;
  font-size: 15px;
  text-shadow: 2px 1px 2px #000;
  padding: 10px 20px;
  border-radius: 12px;
  margin: -10px 0px -25px;
  width: 10%;
  float:center;
  text-shadow: 2px 4px 2px #000;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.9;
    cursor: default;
  }
`;

// Header Content Area Styling
const Wrapper1 = styled.section`
  background-color: #3b5998;
  //padding-bottom: 0.1em;
  margin-bottom: 0px;
  `;

// NOVARTIS Image position styling
  const Wrapper11 = styled.section`
  float: right;
  margin-top: -90px;
  margin-right: 25px;
  `;

//Sub-Header styling
const Wrapper3 = styled.section`
padding-top: 2.5em;
margin-top: -30px;
padding-bottom: 35px;
  background-color: whitesmoke;
//   border-bottom: 1px solid black;
`;

// Heading Content text styling
const Title = styled.h1`
font-size: 2.5em;
font-family: Sylfaen;
  text-align: left;
  text-shadow: 2px 4px 2px #000;
  margin-top: 0.1%;
  padding-top: 7px;
  padding-bottom:10px;
  margin-left: 20px;
  color: white;
`;

//Page Information styling
const Context= styled.p`
font-size: 1.0em;
font: Arial;
font-weight:bold;
//text-shadow: 4px 3px 2px #000;
  text-align: left;
  margin-top: -60px;
  margin-left: 20px;
  margin-bottom: -20px;
  color: black;
  background

`;

//Search Information styling
const Disclaimer= styled.p`
font-size: 1em;
font: Arial;
 text-shadow: 1px 0px 0px #000;
  text-align: center;
  margin-top: 10px;
 
  margin-bottom: -20px;
  color: black;
  background

`;

//React Table styling
const Styles = styled.div`
  padding: 1em;
  margin-top:10px;
//   border-left: 2px solid black;
//   border-right: 2px solid black;    

    th{
        border-left: 2px solid black;
    }`;


Button.defaultProps = {
    theme: "blue"
  };

class Test1 extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            columns :[] , //To store heading of columns of the table.
            message :[],  // To store content of table.
        }
    }
    componentDidMount(){
        this.clickHandlerField(); //By Default display the field details in the table.
    }
    clickHandlerField= () =>{

        const url=`${config.url.BACKEND_API1}`;
        fetch(url, {
            method:"GET"
        }).then(reponse => reponse.json()).then(posts =>{
            this.setState({message:posts[0]})
        })

        this.setState({
            columns :[
                {
                    Header:"ID",
                    accessor:"ID",
                    filterMethod: (filter, rows) => // For searching in the particular column. 
                        matchSorter(rows, filter.value, { keys: ["ID"] }),
                    filterAll: true,width: 90,
                    
                },
                {
                    Header:"DH_Schema_Name",
                    accessor:"DH_Schema_Name",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["DH_Schema_Name"] }),
                    filterAll: true
                },
                {
                    Header:"DH_Entity_Name",
                    accessor:"DH_Entity_Name",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["DH_Entity_Name"] }),
                    filterAll: true
                },
                {
                    Header:"DH_Attribute_Name",
                    accessor:"DH_Attribute_Name",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["DH_Attribute_Name"] }),
                    filterAll: true,
                    Cell: ( {row} ) => (<Link to={{pathname:`/${row.DH_Attribute_Name}/field/${row.DH_Entity_Name}` } }>{row.DH_Attribute_Name}</Link>)
                    //Making the attribute name "clickable" so that when it gets clicked it redirects to next page containing specific details of attribute. 
                }
            ]
        })
    }

    clickHandlerEntity= () =>{ //Function that gets called when entity button is clicked, fetches all the entity data and display it in the table.
        const url=`${config.url.BACKEND_API1}`;
        fetch(url, {
            method:"GET"
        }).then(reponse => reponse.json()).then(posts =>{
            this.setState({message:posts[1]})
        })
        this.setState({
            columns :[
                {
                    Header:"ID",
                    accessor:"ID",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["ID"] }),
                    filterAll: true,width: 90,
                    resizable: true,
                },
                {
                    Header:"DH_Schema_Name",
                    accessor:"DH_Schema_Name",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["DH_Schema_Name"] }),
                    filterAll: true,
                },
                {
                    Header:"DH_Entity_Name",
                    accessor:"DH_Entity_Name",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["DH_Entity_Name"] }),
                    filterAll: true,
                    Cell: ( {row} ) => (<Link to={{pathname:`/entity/${row.DH_Entity_Name}` } }>{row.DH_Entity_Name}</Link>)
                }
            ]          
        })
    }
    
    clickHandlerApplication= () =>{ //Function that gets called when application button is clicked, fetches all the application data and display it in the table.
        const url=`${config.url.BACKEND_API1}`;
        fetch(url, {
            method:"GET"
        }).then(reponse => reponse.json()).then(posts =>{
            this.setState({message:posts[2]})
        })
        this.setState({
            columns :[
                {
                    Header:"ID",
                    accessor:"ID",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["ID"] }),
                    filterAll: true,width: 90,
                    resizable: false,
                },
                {
                    Header: "Application_Name",headerStyle: {textAlign: 'left'},
                    accessor:"Application_Name",className: "left",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["Application_Name"] }),
                    filterAll: true,
                    Cell: ( {row} ) => (<Link to={{pathname:`/application/${row.Application_Name}` } }>{row.Application_Name}</Link>)
                },
                {
                    Header:"Application_User_ID",headerStyle: {textAlign: 'left'},
                    accessor:"Application_User_ID",className: "left",
                    filterMethod: (filter, rows) =>
                        matchSorter(rows, filter.value, { keys: ["Application_User_ID"] }),
                    filterAll: true
                },
                    ]
        })
    }

    render() {

        const style={
            Paper:{paddingLeft:250,paddingRight:250,marginTop:0,marginBottom:0},
            ReactTable:{backgroundColor: "whitesmoke",fontSize: '15px',fontWeight:"bold"},
            butl:{marginTop:5,backgroundColor:"teal",marginRight:-80}
        }
        return (
            <div >
                <Wrapper1><Title>Data Lineage</Title></Wrapper1>
                <Wrapper11><img src={Nvt} alt="NVT"/><br />
                <button class="btn btn-primary " style={style.butl} //Logout Button
                    onClick={() => {
                        this.props.history.push("/");}}>Logout
                </button>
                
                </Wrapper11>
                
{/* Field,Entity,Application Button */}
                <Wrapper3>
                
                <Button onClick={this.clickHandlerField}>FIELD</Button> {' '}
                <Button  onClick={this.clickHandlerEntity}>ENTITY</Button>{' '}
                <Button onClick={this.clickHandlerApplication}>APPLICATION</Button>{' '}
                <Context>The site will help you find the lineage modelling of various Fields, Entities and Applications.</Context>
                </Wrapper3>
                 
{/*React Table displaying entity,field,application */}    
                <Grid item xs={15}>
                        <Paper style={style.Paper}>
                        <Disclaimer>Search in Indivdual Search bars of Each Column</Disclaimer>
                        <Styles><ReactTable style={style.ReactTable} data={this.state.message}  filterable defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                columns={this.state.columns}  defaultPageSize={30}  className="-striped -highlight" ></ReactTable>
                        </Styles></Paper>
                </Grid>
            </div>
        )
    }
}

export default Test1

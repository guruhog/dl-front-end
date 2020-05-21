import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tree from 'react-d3-tree';

import styled from "styled-components";
import Nvt from "../Nvt.png";

import MUIDataTable from "mui-datatables";

import Modal from 'react-modal';


import { FaExpand } from 'react-icons/fa';
import { FaCompress } from 'react-icons/fa';

import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const Wrapper1 = styled.section`
  background-color: #3b5998;
  padding-bottom: 0.1em;
  `;

 const Wrapper11 = styled.section`
  float: right;
  margin-top: -70px;
  margin-right: 25px;
  `;

const Title = styled.h1`
font-size: 2.5em;
font-family: Sylfaen;
  text-align: left;
  text-shadow: 2px 4px 2px #000;
  margin-top: 0.3%;
  margin-left: 20px;
  color: white;
`;

const Context= styled.p`
font-size: 1.0em;
font: Arial;
text-shadow: 4px 3px 2px #000;
  text-align: left;
  margin-top: 0px;
  margin-left: 20px;
  padding-bottom: 5px;
  color: white;
  background

`;

const svgSquare = {
  x: 500, y: 50,
  shape:'circle',
  shapeProps: {r: 10,}
}


const options = {                             //Setting parameters for Information Context box
    responsive: "scroll",
    pagination: false,
    sort:false,
    sortFilterList:false,
    filter:false,
    viewColumns:false,
    selectableRows:"none",
    print:false
  };

const styleModal = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.66)",
      zIndex: 10000
    },
    content:{
        backgroundColor: "#dfe3ee",
    }
    
  };

class Display_Application extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            displayArray:[],
            data1:[
                {
                    name:""
                }
              ],
            translate:{},         //For adjusting the location of tree.
            isOpen:false          //For modal display.
        }
    }
    

        componentDidMount(){
            const url=`http://localhost:8001/${this.props.match.params.id}/${this.props.match.params.id}/${this.props.match.params.id}`;
            fetch(url, {
                method:"GET"
            }).then(reponse => reponse.json()).then(posts =>{
                this.setState({displayArray:posts})
            })

            fetch(`http://localhost:8002/application/name=/${this.props.match.params.id}`)
            .then((reponse) => reponse.json())
            .then(booksList => {
                this.setState({data1:booksList});
            });

            const dimensions = this.treeContainer.getBoundingClientRect();  //For positioning the tree
            this.setState({
            translate: {
                x: dimensions.width /16,
                y: dimensions.height / 2
            }
            });
        }

        handleOpenModal = () => {
    
            this.setState({ isOpen: !this.state.isOpen })
          }
        
        getMuiTheme = () => createMuiTheme({
            overrides: {
              MUIDataTable: {
                root: {
                },
                paper: {
                  boxShadow: "none",
                }
              },
              MUIDataTableBodyRow: {
                root: {
                  '&:nth-child(odd)': { 
                    backgroundColor: '#D3D3D3'
                  }
                }
              },
              MUIDataTableBodyCell: {
              }
            }
          })
    
    
    render() {

        const data = [
            ['Application_Name', this.state.displayArray[0]],
            ['Application_Clarity_ID',this.state.displayArray[1] ],
            ['Business_Context',this.state.displayArray[2] ],
            ['Privacy_Classification',this.state.displayArray[3] ],
            ['Application_User_ID', this.state.displayArray[4] ],
            ['Data_Refresh_frequency', this.state.displayArray[5] ],
            ['Data_Transfer_Method', this.state.displayArray[6] ],
            ['Integration_Type',this.state.displayArray[7] ],
            ['Active_Status',this.state.displayArray[8] ],
            ['Comments',this.state.displayArray[9] ],
        ]

        const columns = [
            {
            },
            {
            },
        ];
        const style={
            Paper_Information_Context:{padding:20,background: "#dfe3ee",marginLeft:60,marginTop:10,marginBottom:10},
            Paper_Data_Lineage:{padding:20,background: "#dfe3ee",marginTop:10,marginBottom:10,marginRight:30}
        }
        return (
            <div>
                <Wrapper1><Title>Data Lineage - Application Description</Title></Wrapper1>
                <Wrapper11><img src={Nvt} alt="NVT"/></Wrapper11>

                <Grid container spacing={5}>
                    <Grid item xs={5}>
                        <Paper style={style.Paper_Information_Context}>
                            <MuiThemeProvider theme={this.getMuiTheme()}>
                                <MUIDataTable
                                    title={<h4>INFORMATION CONTEXT</h4>}
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />
                            </MuiThemeProvider>
                        <h4 />
                        </Paper>
                    </Grid>
                    <Grid item xs={7} >
                        <Paper style={style.Paper_Data_Lineage}>
                            <h3>DATA LINEAGE</h3>
                            <div align="right" onClick={this.handleOpenModal}>
                                <Tooltip overlay="Full Screen" placement="top">
                                    <FaExpand className="icon" size={40} />
                                </Tooltip>
                            </div>
                            <Modal isOpen={this.state.isOpen} onRequestClose={this.handleOpenModal} style={styleModal} >
                                <div id="treeWrapper" style={{height: '40em'}} ref={tc => (this.treeContainer = tc)}>
                                    <div align="left" onClick={this.handleOpenModal}>
                                    <FaCompress className="icon" size={48}/>
                                    </div>
                                    <Tree data={this.state.data1} nodeSize={svgSquare} nodeSvgShape={svgSquare} translate={this.state.translate} zoom={0.9}/>
                                </div>
                            </Modal>
                            
                            <div id="treeWrapper" style={{height: '30em'}} ref={tc => (this.treeContainer = tc)}>
                                <Tree data={this.state.data1} nodeSize={svgSquare} nodeSvgShape={svgSquare} translate={this.state.translate} zoom={0.29} zoomable={false} />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Display_Application

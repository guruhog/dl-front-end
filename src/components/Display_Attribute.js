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

const Wrapper2 = styled.section`
  background-color: black;
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
  x: 600, y: 50,
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


export class Display_Attribute extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            displayArray:[],      //For Displaying the content of Information Context.
            data1:[               //For Displaying the tree structure.
              {
                  name:""
              }
            ],
            num:0,                //For displaying the number of application being consumed.
            translate:{},         //For adjusting the location of tree.
            isOpen:false          //For modal display.
        }
    }
    
    
    componentDidMount(){
        const url=`http://localhost:8001/${this.props.match.params.id1}/${this.props.match.params.id2}`;
        fetch(url, {
            method:"GET"
        }).then(reponse => reponse.json()).then(posts =>{
            this.setState({displayArray:posts})
        })

        fetch(`http://localhost:8002/${this.props.match.params.id2}/${this.props.match.params.id1}`)
        .then((reponse) => reponse.json())
        .then(booksList => {
            this.setState({data1:booksList[0]});
            this.setState({num:booksList[1]});
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
    
    render(props) {

        const data = [
            ['Data_Type', this.state.displayArray[0]],
            ['Data_Length',this.state.displayArray[1] ],
            ['Data_Precision',this.state.displayArray[2] ],
            ['ID',this.state.displayArray[3] ],
            ['Attribute_Business_Name', this.state.displayArray[4] ],
            ['Business_Context', this.state.displayArray[5] ],
            ['Privacy_Classification', this.state.displayArray[6] ],
            ['DH_Schema_Name',this.state.displayArray[7] ],
            ['DH_Entity_Name',this.state.displayArray[8] ],
            ['DH_Attribute_Name',this.state.displayArray[9] ],
            ['Attribute_Sample_Values',this.state.displayArray[10] ],
            ['DV12N_Published_Path',this.state.displayArray[11] ],
            ['APIGW_Published_Service_URL',this.state.displayArray[12] ],
            ['DV12N_Published_Attribute_Name',this.state.displayArray[13] ],
            ['APIGW_Published_Attribute_Name',this.state.displayArray[14] ],
            ['Active_Status',this.state.displayArray[15] ],
            ['Source_System_UI_Mapping',this.state.displayArray[16] ],
            ['Source_System_Attribute_Name',this.state.displayArray[17] ],
            ['Comments',this.state.displayArray[18] ],
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
                <Wrapper1><Title>Data Lineage - Field Description</Title></Wrapper1>
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
                        <h4 align="center">Number of Application Consuming this Attribute : {this.state.num}</h4>
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
                            
                            <div id="treeWrapper" style={{height: '32.5em'}} ref={tc => (this.treeContainer = tc)}>
                                <Tree data={this.state.data1} nodeSize={svgSquare} nodeSvgShape={svgSquare} translate={this.state.translate} zoom={0.29} zoomable={false} />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Display_Attribute

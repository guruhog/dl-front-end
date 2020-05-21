import React, { Component } from 'react'
import styled from "styled-components";
import Nvt from "../Nvt.png";
import Nvts from "../Nvts.png";
import DL from "../DL.png"
import './style.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import auth from "./auth";

const Wrapper1 = styled.section`
  background-color: #3B5998;
  // padding-bottom: 5px;
  margin-bottom: 0px;
  `;

const Wrapper11 = styled.section`
  float: right;
  margin-top: -90px;
  margin-right: 25px;
  `;

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

const Context= styled.p`
  font-size: 0.8em;
  font: Arial;
  text-shadow: 4px 3px 2px #000;
  text-align: left;
  margin-top: -30px;
  margin-left: 20px;
  padding-top:2px;
  padding-bottom: 2px;
  color: white;
`;

const Wrapper3 = styled.section`
  padding-top: 1.5em;
  margin-top: -40px;
  padding-bottom: 25px;
  background-color: whitesmoke;
//   border-bottom: 1px solid black;
`;

const Title1 = styled.h1`
font-size: 3.5em;
font-family: Sylfaen;
  text-align: center;
  text-shadow: 1px 2px 2px #000;
  margin-top: 0.1%;
  padding-top: 55px;
  margin-left: 10px;
  color: #3B5998;
  `;

const Image = styled.img`
  // width: 46%;
  float: left;
  padding-top: 50px;
  margin-left: 80px;
  margin-right: 10px;

`;

const Title2 = styled.h1`
  font-size: 3.5em;
  font-family: Sylfaen;
    text-align: left;
    text-shadow: 1px 1px 1px #000;
    margin-top: 10px;
    padding-top: 60px;
    margin-bottom: 30%;
    margin-left: 30px;
    padding-left: 10px; 
    //  background-color: white;

    color: #3B5998;`;


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false,username: '',password:'' }
    }
    
    componentDidMount = () => {
        console.log('Done ', this.state)
    }
    
    handleOpenModal = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    
    onSubmit = () => {
        if (`${this.state.username}`== "Admin" && `${this.state.password}`== `1234`)
        {
    
          auth.login(() => {
            this.props.history.push("/Login");
          });
            //  this.props.history.push('/Login');
        }
        else if (`${this.state.username}`== "*[a-z,A-Z]" && `${this.state.password}`== ``)
            {
              alert("Hi  " + `${this.state.username}`+ " , Please enter a password.")
            }
        else if(`${this.state.username}`== "" && (`${this.state.password}`== `` || `${this.state.password}`!= `1234` ))
            {
              alert("Hi, Please Enter a valid Username and Password.")
            }
        else
            {
              alert("Hi  " + `${this.state.username}`+ " , the password is incorrect or you are not Authorized.")
            }
         
        }

  handleUsernameChange = (event) =>{
    this.setState({
        username: event.target.value
    })

} 
handlePasswordChange = (event) =>{
    this.setState({
        password: event.target.value
    })

} 
  
  render() {
    const style={
      Paper1:{backgroundColor:"white",padding:0,paddingLeft:50,paddingRight:50,marginTop:-30,paddingBottom:60},
      Paper2:{backgroundColor:"whitesmoke",     marginTop:-50,paddingBottom:72,   // backgroundImage: `url(${Nvts})`,
        backgroundPosition: 'center',backgroundSize: 'Cover',textAlign:"left",fontSize:17,fontWeight:"bold"},
        imgr:{marginTop:20}                      
    }
    return (
        <div>
            <Wrapper1><Title>Data Lineage</Title></Wrapper1>
            <Wrapper11><img src={Nvt} alt="NVT"/></Wrapper11>

            <Grid container spacing={0}>
                <Grid item xs={8}>
                    <Paper style={style.Paper1}>
                        <div >
                            <Title1>Data Lineage-Summary</Title1>
                            <h3 align='justify'>Data lineage is defined as a data life cycle that includes the data's origins and where it moves over time. It describes what happens to data as it goes through diverse processes. It helps provide visibility into the analytics pipeline and simplifies tracing errors back to their sources.</h3>
                            <img src={DL} alt="DL" />  
                            <br />
                            <br />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper style={style.Paper2}>
                        <div>
                            <Image src={Nvts} alt="Nvts" />
                            <div class="login">
                                <form onSubmit={this.onSubmit}  >
                                    <Title2 >Welcome</Title2>
                                    <br/>
                                    <label>Username:</label>
                                    <input type="text" 
                                    value={this.state.username} 
                                    onChange={this.handleUsernameChange} placeholder="521 ID" />
                                    <label>Password:</label>
                                    <input type="password" 
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange} placeholder="4 digit Password" /><br/><br/>
                                    <button type="submit"  class="btn btn-primary btn-block btn-large" >Log In</button>
                                </form>
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
                
    )
  }
}

export default Login;
import React,{ useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './components/Login.js'

import ReactDOM from "react-dom";

import Test1 from './components/Test1.js'
import Display_Entity from './components/Display_Entity.js'
import Display_Attribute from './components/Display_Attribute.js'
import Display_Application from './components/Display_Application.js'
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/'exact component={Login} />
          <Route exact path="/Login" component={Test1} />
          <Route path='/entity/:id'exact component={Display_Entity} />
          <Route path='/:id1/field/:id2'exact component={Display_Attribute} />
          <Route path='/application/:id'exact component={Display_Application} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

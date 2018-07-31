import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import Home from "./Components/Home";
import LoginPage from "./Components/LoginPage";
import Nav from './Components/Nav';

class App extends Component {
  render() {
    return (
      <div>
        <div className='container'>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={LoginPage}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

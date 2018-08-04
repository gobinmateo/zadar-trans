import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './Components/Home';
import LoginPage from "./Components/LoginPage";
import Nav from './Components/Nav';
import Intervention from './Components/Intervention/Intervention';

class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/intervention' component={Intervention}/>
        </Switch>
      </div>
    );
  }
}

export default App;

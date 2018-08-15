import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Containers/HomePage';
import Intervention from './Components/Intervention';
import LoginPage from './Containers/LoginPage';
import RequireLogin from './HOC/RequireLogin';

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ RequireLogin(HomePage) }/>
          <Route path='/login' component={ LoginPage }/>
          <Route path='/intervention' component={ Intervention }/>
        </Switch>
      </div>
    );
  }
}

export default App;

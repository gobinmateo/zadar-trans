import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Containers/HomePage';
import InterventionPage from './Containers/InterventionPage';
import LoginPage from './Containers/LoginPage';
import RequireLogin from './HOC/RequireLogin';

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ RequireLogin(HomePage) }/>
          <Route path='/login' component={ LoginPage }/>
          <Route path='/intervention' component={ InterventionPage }/>
        </Switch>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { Switch, Route } from 'react-router-dom'

import LoginPage from './LoginPage';
import Home from './Home';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={LoginPage}/>
    </Switch>
  </main>
);

export default Main;

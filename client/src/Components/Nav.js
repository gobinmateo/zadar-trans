import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { socket } from '../index';
import { inject, observer } from "mobx-react";

import Store from '../stores/Store';

@inject('Store')
@observer
class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newNotification: false,
    }
  }

  componentDidMount() {
    socket.on('INTERVENTION_NOTIFICATION', (newNotification) => {
      this.setState({ newNotification });
    });
  }

  handleNewIntervention = () => {
    const { history } = this.props;
    history.push('/intervention');
  };

  handleLogoClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { newNotification } = this.state;
    const { Store } = this.props;
    return (
      <nav className="nav-bar blue-grey darken-1">
        <div className="container">
          <a onClick={this.handleLogoClick} className="brand-logo center">
            <i className="material-icons">drive_eta</i>
            ZADAR TRANS
          </a>
            {Store.isLoggedIn &&
            <ul className="left">
              <li><NavLink to='/'> <i className="material-icons">account_box</i> </NavLink></li>
              <li><NavLink to='/'> HOME </NavLink></li>
            </ul>
            }
            {!Store.isLoggedIn &&
              <ul className="left">
                <li><NavLink to='/login'> LOGIN </NavLink></li>
                <li><NavLink to='/'> HOME </NavLink></li>
              </ul>
            }
          {newNotification &&
            <p> **NEW** </p>}
          <button
            className="btn-floating pulse btn-large waves-effect waves-light blue-grey darken-3 right"
            onClick={this.handleNewIntervention}>
            <i className="material-icons">add</i>
          </button>
        </div>
      </nav>
    );
  }
};

export default withRouter(Nav);

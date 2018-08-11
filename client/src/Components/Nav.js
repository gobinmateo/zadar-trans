import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { socket } from '../index';
import { inject, observer } from 'mobx-react';
import * as M from 'materialize-css';
import styled from 'styled-components';

import Store from '../Store/Store';

const BtnCustom = styled.button`
  margin-right: 5%;
`;

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
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.sidenav');
      const options = {};
      const instances = M.Sidenav.init(elems, options);
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
      <div>
        <nav className="nav-extended blue-grey darken-1">
          <div className="nav-wrapper">
            <a onClick={this.handleLogoClick} className="brand-logo center">
              <i className="material-icons">drive_eta</i>
              ZD-TRANS
            </a>
            <a href="#" data-target="mobile-sidenav" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            {Store.isLoggedIn &&
            <ul className="left hide-on-med-and-down">
              <li><NavLink to='/'> <i className="material-icons">account_box</i> </NavLink></li>
              <li><NavLink to='/'> HOME </NavLink></li>
            </ul>}
            {!Store.isLoggedIn &&
            <ul className="left hide-on-med-and-down">
              <li><NavLink to='/login'> LOGIN </NavLink></li>
              <li><NavLink to='/'> HOME </NavLink></li>
            </ul>}
            {newNotification &&
              <p> **NEW** </p>}
          </div>
          <div className="nav-content">
            <BtnCustom
              className="btn-floating pulse halfway-fab btn-large waves-effect waves-light blue-grey darken-3 right"
              onClick={this.handleNewIntervention}>
                <i className="material-icons">add</i>
            </BtnCustom>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-sidenav">
          <li><NavLink to='/login'> LOGIN </NavLink></li>
          <li><NavLink to='/'> HOME </NavLink></li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Nav);

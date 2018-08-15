import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import API from '../../Api';
import socket from '../../Socket';
import * as M from 'materialize-css';
import styled from 'styled-components';

import Cookies from 'js-cookie';
import Store from '../../Store/Store';

const BtnCustom = styled.button`
  margin-right: 5%;
`;

@inject('Store')
@observer
class Navbar extends Component {

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
      const sideNavElems = document.querySelectorAll('.sidenav');
      const sideNavInstances = M.Sidenav.init(sideNavElems, {});
    });
  }

  handleNewInterventionClick = () => {
    const { history } = this.props;

    history.push('/intervention');
  };

  handleLogoClick = () => {
    const { history } = this.props;

    history.push('/');
  };

  handleLogoutClick = async () => {
    const { history } = this.props;

    try {
      const response = await API.get('/auth/logout');

      if(response.status === 200) {
        this.props.Store.login(false);

        Cookies.remove('token');
      }
    } catch(error) {
      console.log(error);
    }
  };

  render() {
    const { newNotification } = this.state;
    const { Store } = this.props;

    const isUserLoggedIn = Cookies.get('token') !== undefined;

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
            <ul className="left hide-on-med-and-down">
              <li><NavLink to='/'> HOME </NavLink></li>
              { isUserLoggedIn ?
                <li><NavLink to='/login'><div onClick={this.handleLogoutClick}> LOGOUT </div></NavLink></li> :
                <li><NavLink to='/login'> LOGIN </NavLink></li>
              }
            </ul>
            {newNotification &&
              <p> **NEW** </p>}
          </div>
          <div className="nav-content">
            <BtnCustom
              className="btn-floating pulse halfway-fab btn-large waves-effect waves-light blue-grey darken-3 right"
              onClick={this.handleNewInterventionClick}>
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

export default withRouter(Navbar);

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Nav extends Component {

  handleNewIntervention = () => {
    const { history } = this.props;
    history.push('/intervention');
  };

  handleLogoClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <nav className="nav-bar blue-grey darken-1">
        <div className="container">
          <a onClick={this.handleLogoClick} className="brand-logo center">
            <i className="material-icons">drive_eta</i>
            ZADAR TRANS
          </a>
          <ul className="left">
            <li><NavLink to='/'> HOME </NavLink></li>
            <li><NavLink to='/login'> LOGIN </NavLink></li>
          </ul>
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

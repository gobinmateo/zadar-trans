import React, { Component } from 'react';
import * as M from 'materialize-css';

class ProfileDropdown extends Component{

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.dropdown-trigger');
      const options = {};
      const instances = M.Dropdown.init(elems, options);
    });
  }

  render() {
    return (
      <div>
        <a className='dropdown-trigger btn' href="#" data-target='profile-dropdown'>
          <i className="material-icons">
            account_box
          </i>
        </a>
        <ul id='profile-dropdown' className='dropdown-content'>
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li className="divider" tabIndex="-1"></li>
          <li><a href="#!">three</a></li>
          <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
          <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
        </ul>
      </div>
    )
  }
};

export default ProfileDropdown;

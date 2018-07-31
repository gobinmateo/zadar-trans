import React from 'react';
import { NavLink } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';

const Nav = () => {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/' component={Home}>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/login' component={LoginPage}>Login</NavLink>
      </li>
    </ul>
  );
};

export default Nav;

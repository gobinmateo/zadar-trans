import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'react-emotion';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

const Nav = () => {
  return (
    <div>
      <AppBar position="static">
        <ToolBar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Button
            color="inherit"
            component={ NavLink }
            to='/'
          >
            Zd-trans
          </Button>
          <Button
            color="inherit"
            component={ NavLink }
            to='/login'
          >
            Login
          </Button>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default Nav;

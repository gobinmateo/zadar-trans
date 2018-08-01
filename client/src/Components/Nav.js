import React from 'react';
import { NavLink } from 'react-router-dom';
import Home from './Home';
import LoginPage from './LoginPage';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
          <Typography variant="title" color="inherit">
            Zd-trans
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Login</Button>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default Nav;


import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Power from './Power';
import StatusMonitor from './StatusMonitor';
import { getByLink } from '../Shared/Config/navConfig';

export const Header = props => {

  const { 
    page, 
    jmriApi, 
    jmriReady, 
    apiReady,
    onSSLAuth: handleSSLAuth 
  } = props;

  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ menu, setMenu ] = useState(null);
  const navItem = getByLink(page);

  const handleClose = () => {
    setMenu(null);
  };

  return (
    <AppBar position="sticky" className="app-header-menu">
      <Toolbar>
        <Typography variant="h6" className="title">
          {navItem ? navItem.label : '[unknown]'}
        </Typography>
        <StatusMonitor jmriReady={jmriReady} apiReady={apiReady} />

        <Power jmriApi={jmriApi} jmriReady={jmriReady} />
      </Toolbar>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!menu}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSSLAuth}>View API Host</MenuItem>
      </Menu>
    </AppBar>
  );

}

export default Header;
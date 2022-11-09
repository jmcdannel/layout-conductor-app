import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stop from './Stop';
import Power from './Power';
import StatusMonitor from './StatusMonitor';
import { getByLink } from '../Shared/Config/navConfig';
import { useLocation } from "react-router-dom";

export const Header = props => {

  const { 
    jmriApi, 
    jmriReady, 
    apiReady
  } = props;

  let location = useLocation();
  const navItem = getByLink(location.pathname);

  return (
    <AppBar position="sticky" className="app-header-menu">
      <Toolbar>
        <Typography variant="h6" className="title">
          {navItem ? navItem.label : '[unknown]'}
        </Typography>
        <StatusMonitor jmriReady={jmriReady} apiReady={apiReady} />
        <Stop jmriApi={jmriApi} jmriReady={jmriReady} />
        <Power jmriApi={jmriApi} jmriReady={jmriReady} />
      </Toolbar>
    </AppBar>
  );

}

export default Header;
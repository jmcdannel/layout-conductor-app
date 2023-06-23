import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stop from './Stop';
import Power from './Power';
import StatusMonitor from './StatusMonitor';
import { getByLink } from '../Shared/Config/Navigation';
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
        <Paper sx={{ padding: '.6rem', marginRight: '2rem' }}>
          <StatusMonitor jmriReady={jmriReady} apiReady={apiReady} />
        </Paper>
        <Paper sx={{ padding: '.5rem 1rem' }}>
          <Stop jmriApi={jmriApi} jmriReady={jmriReady} />
          <Power jmriApi={jmriApi} jmriReady={jmriReady} />
        </Paper>
      </Toolbar>
    </AppBar>
  );

}

export default Header;
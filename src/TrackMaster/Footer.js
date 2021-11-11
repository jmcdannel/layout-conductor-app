import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TrainIcon from '@mui/icons-material/Train';
import navConfig from '../Shared/Config/navConfig';

export const Footer = props => {

  const { page, modules, onNavigate: handleNavigate } = props;

  return (
    <BottomNavigation
      value={page}
      className="App-footer"
    >
      <BottomNavigationAction 
        label="Conductor" 
        value="/" 
        to="/" 
        icon={<TrainIcon />} 
        component={Link} 
      />
      {modules && modules.filter(module => !!navConfig[module]).map(module => (
        <BottomNavigationAction 
          key={module} 
          label={navConfig[module].link} 
          value={`${navConfig[module].link}`} 
          to={`${navConfig[module].link}`} 
          icon={navConfig[module].icon} 
          component={Link} 
        />
      ))}
    </BottomNavigation>
  );

}

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TrainIcon from '@mui/icons-material/Train';
import navConfig from '../Shared/Config/navConfig';
import { useLocation } from "react-router-dom";

export const Footer = props => {

  const { modules } = props;

  let location = useLocation();

  return (
    <BottomNavigation
      value={location.pathname}
      className="app-footer"
    >
      <BottomNavigationAction 
        label="Conductor" 
        value="conductor" 
        to="/" 
        icon={<TrainIcon />} 
        component={Link} 
      />
      {modules && modules.filter(module => !!navConfig[module]).map(module => (
        <BottomNavigationAction 
          key={module} 
          label={navConfig[module].label} 
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
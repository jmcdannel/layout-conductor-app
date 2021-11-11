import React from 'react';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
// import CallSplit from '@mui/icons-material/CallSplit';
import MapIcon from '@mui/icons-material/Map';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
// import SettingsIcon from '@mui/icons-material/Settings';
import TrainIcon from '@mui/icons-material/Train';
import navConfig from '../Shared/Config/navConfig';


function LandingMenu({ modules, onNavigate }) {

  const handleClick = (e, module) => {
    onNavigate(e, navConfig[module].link)
  }

  const getdModuleLink = module => {

    let moduleLink;
  
    switch(module) {
      case 'map' :
        moduleLink = (
          <>
            Map 
            <MapIcon />
          </>
        );
        break;
      case 'throttles' :
        moduleLink = (
          <>
            Throttles 
            <UnfoldMoreIcon />
          </>
        );
        break;
      case 'conductor' :
        moduleLink = (
          <>
            Conductor 
            <TrainIcon />
          </>
        );
        break;
      case 'turnouts' :
        moduleLink = (
          <>
            Turnouts 
            <TrainIcon />
          </>
        );
        break;
    }
    return (
      <Grid item xs={6} className="trackmaster__menu-item" key={module}>
        <Link to={`module.link`}>
          {moduleLink}
        </Link>
      </Grid>
    );

    
  }

  return (
    <Grid container spacing={8}>

      {modules.filter(module => !!navConfig[module]).map(getdModuleLink)}
      
    </Grid>
  )

}

export default LandingMenu;
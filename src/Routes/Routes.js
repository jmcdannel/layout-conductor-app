import React, { useContext, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import withRouteEngine from '../Routes/withRouteEngine';
import Route from '../Routes/Route';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import './Routes.scss';

const lineColors = {
  'Valley': 'rgb(13, 242, 40)',
  'Tamarack Station': 'rgb(0, 255, 253)',
  'Valley City': 'rgb(206, 217, 38)'
}

const Routes = props => {

  const { 
    handleRouteToggle, 
    handleSetRoute, 
    handleClearRoute ,
    computedRoutes,
    disableClear,
    disableSet,
    view
  } = props;


  return (
    <Grid container>
      <Grid item sm={10} >
        <Grid container spacing={1} className={`routes routes--${view}`}>
          {computedRoutes().map(rte => (
            <Grid item xs="auto" key={rte.routeId} sx={{ borderBottomColor: lineColors[rte.line] }}>
              <Route className={rte.className} route={rte} handleRouteToggle={handleRouteToggle} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item sm={2}>
        <Button 
          onClick={handleClearRoute} 
          sx={{ m: '0.25rem' }} 
          variant="outlined" 
          disabled={disableClear} 
          fullWidth>
            Clear
        </Button>
        <Button 
          onClick={handleSetRoute} 
          sx={{ m: '0.25rem' }} 
          variant="contained" 
          disabled={disableSet} 
          fullWidth>
            Set Route
        </Button>
      </Grid>
    </Grid>
  );

}

export default withRouteEngine(Routes);
import React, { useContext, useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { Context } from '../Store/Store';

import './DispatcherMenu.scss';

export const DispatcherMenu = props => {

  const { handleTurnoutsAction } = props;
  const [ state, dispatch ] = useContext(Context);
  
  const views = [
    { label: 'Pill', value: 'pill' },
    { label: 'Tiny', value: 'tiny' },
    { label: 'Compact', value: 'compact' },
    { label: 'Comfy', value: 'comfy' },
  ];

  const view = state.userPreferences.turnoutView;
  const dispatcherLayout = state.userPreferences.dispatcherLayout;

  const handleViewClick = async event => {    
    await dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: {
      turnoutView: event.target.value
    }});
  }

  const hanldeLayoutClick = async event => {
    await dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: { 
      dispatcherLayout: { ... dispatcherLayout, ...{ [event.target.value]: event.target.checked } } 
    } });
  }

  console.log('dispatcherLayout', dispatcherLayout);

  return (
    <AppBar position="relative" className="menu" color="secondary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <ButtonGroup color="secondary">
          <Button onClick={() => handleTurnoutsAction('straight')}>All Straight</Button>
          <Button onClick={() => handleTurnoutsAction('divergent')}>All Divergent</Button>
          <Button onClick={() => handleTurnoutsAction('toggle')}>Toggle All</Button>
          <Button onClick={() => handleTurnoutsAction('sweep')}>Sweep All</Button> 
        </ButtonGroup>
        <Box>
          <FormControlLabel control={
            <Switch 
              checked={dispatcherLayout.map}
              onChange={hanldeLayoutClick}
              value="map"
              color="secondary"
            />
          } label="Show Map" />

          <FormControlLabel control={
            <Switch 
              checked={dispatcherLayout.routes}
              onChange={hanldeLayoutClick}
              value="routes"
              color="secondary"
            />
          } label="Show routes" />

          <FormControlLabel control={
            <Switch 
              checked={dispatcherLayout.turnouts}
              onChange={hanldeLayoutClick}
              value="turnouts"
              color="secondary"
            />
          } label="Show turnouts" />

        </Box>
        <Box>
          <FormControl variant="filled" fullWidth sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="view-throttles-label">View</InputLabel>
            <Select
              labelId="view-throttles-label"
              id="view-throttles"
              value={view}
              label="View"
              size="small"
              onChange={handleViewClick}
            >
              {views.map(vw => (
                <MenuItem key={vw.value} value={vw.value}>{vw.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );

}

DispatcherMenu.defaultProps = {
  view: 'tiny'
};

export default DispatcherMenu;
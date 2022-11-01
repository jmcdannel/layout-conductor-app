import React, { useContext, useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { Context } from '../Store/Store';

export const TurnoutsMenu = props => {

  const { handleTurnoutsAction } = props;
  const [ state, dispatch ] = useContext(Context);
  const [ list, setList ] = useState('turnouts');

  const views = [
    { label: 'Pill', value: 'pill' },
    { label: 'Tiny', value: 'tiny' },
    { label: 'Compact', value: 'compact' },
    { label: 'Comfy', value: 'comfy' },
  ];
  const view = state.userPreferences.turnoutView;

  const handleViewClick = async event => {    
    await dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: {
      turnoutView: event.target.value
    }});
  }

  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <ButtonGroup>
          <Button onClick={() => handleTurnoutsAction('straight')}>All Straight</Button>
          <Button onClick={() => handleTurnoutsAction('divergent')}>All Divergent</Button>
          <Button onClick={() => handleTurnoutsAction('toggle')}>Toggle All</Button>
          <Button onClick={() => handleTurnoutsAction('sweep')}>Sweep All</Button> 
        </ButtonGroup>
        <Box sx={{ minWidth: '10rem' }}>
          <FormControl fullWidth>
            <InputLabel id="view-throttles-label">View</InputLabel>
            <Select
              labelId="view-throttles-label"
              id="view-throttles"
              value={view}
              label="View"
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

TurnoutsMenu.defaultProps = {
  view: 'tiny'
};

export default TurnoutsMenu;
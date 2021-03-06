import React, { useState, useEffect, useContext } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import ConductorMenu from './ConductorMenu';
import Turnouts from '../Turnouts/Turnouts';
import Throttles from '../Throttles/Throttles';
import Effects from '../Effects/Effects';

import './Conductor.scss';

export const Conductor = props => {

  const defaultMenu = window.localStorage.getItem('menu') 
    ? JSON.parse(window.localStorage.getItem('menu'))
    : {
      view: 'pill',
      showMaps: true,
      group: '',
      lineFilters: [],
      sectionFilters: []
    };

  const [ menu, setMenu ] = useState(defaultMenu);

  useEffect(() => {
    window.localStorage.setItem('menu', JSON.stringify(menu));
  }, [menu])

  const handleMenuChange = event => {
    console.log('handleMenuChange', event);
    // window.localStorage.setItem('throttleView', event.target.value);
    setMenu({ ...menu, ...event });
  }

  const filterTurnouts = turnouts => {
    let filtered = turnouts ? [...turnouts] : [];
    if (menu.lineFilters && menu.lineFilters.length > 0) {
      filtered = filtered.filter(t => menu.lineFilters.includes(t.line));
    }
    if (menu.sectionFilters && menu.sectionFilters.length > 0) {
      filtered = filtered.filter(t => menu.sectionFilters.includes(t.section));
    }
    return filtered;
  }

  return (
    // <Grid container className="conductor" spacing={2} >
    <Grid container
      direction="row"
      justifyContent="space-between"
      alignItems="stretch">
      <Grid item xs={8} className="flex">
        <Throttles />
      </Grid>
      <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item>
              <Paper elevation={3} style={{ padding: '0.5rem' }}>
                <h2>Turnouts</h2>
                {/* <ConductorMenu 
                  onChange={handleMenuChange} 
                  defaults={defaultMenu}
                /> */}
                <Turnouts 
                  view={menu.view}
                  groupBy={menu.group}
                  filter={filterTurnouts} 
                />
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={3} style={{ padding: '0.5rem' }}>
                <h2>Effects</h2>
                <Effects view={menu.view} />
              </Paper>              
            </Grid>
          </Grid>
      </Grid>
    </Grid>

  )
};

export default Conductor;
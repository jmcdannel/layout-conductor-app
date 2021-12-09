import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

import ConductorMenu from './ConductorMenu';
import Turnouts from '../Turnouts/Turnouts';
import Throttles from '../Throttles/Throttles';
import Effects from '../Effects/Effects';

import './Conductor.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

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

  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

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
      <Grid item xs={8} className="flex App-content-column">
        <Throttles />
      </Grid>
      <Grid item xs={4} className=" App-content-column">
        <Grid container direction="column">
          <Grid item>
            <Paper elevation={3} style={{ padding: '0.5rem' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                  <Tab label="Turnouts" />
                  <Tab label="Effects" />
                  <Tab label="Signals" />
                </Tabs>
              </Box>
              <TabPanel value={tab} index={0}>
                <Turnouts 
                  view={menu.view}
                  groupBy={menu.group}
                  filter={filterTurnouts} 
                />
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <Effects view={menu.view} />
              </TabPanel>
              <TabPanel value={tab} index={2}>
                <Effects view={menu.view} />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  )
};

export default Conductor;
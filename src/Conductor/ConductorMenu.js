import React, { useState, useEffect, useContext } from 'react';

import * as Colors from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Popover from '@mui/material/Popover';

// import FilterListIcon from '@mui/icons-material/FilterList';
// import DoneIcon from '@mui/icons-material/Done';

import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

import { Context } from '../Store/Store';

export const linesConfig = [
  { lineId: 'Mainline Red', color: Colors.red[500] },
  { lineId: 'Mainline Green', color: Colors.green[500] },
  { lineId: 'Tamarack Station', color: Colors.cyan[500] }
];

export const sectionsConfig = [
  { sectionId: 'Tamarack South', color: Colors.blueGrey[500] },
  { sectionId: 'Tamarack North', color: Colors.purple[500] }
];

export const ConductorMenu = props => {

  const [ state, dispatch ] = useContext(Context);

  const { turnouts } = state;

  const { onChange, defaults } = props;

  const [ group, setGroup ] = useState(defaults.group);
  const [ view, setView ] = useState(defaults.view);
  const [ showMaps, setShowMaps ] = useState(defaults.showMaps);
  const [ filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [ lineFilters, setLineFilters ] = useState(defaults.lineFilters);
  const [ sectionFilters, setSectionFilters ] = useState(defaults.sectionFilters);

  const views = [
    { label: 'Pill', shortLabel: 'S', value: 'pill' },
    { label: 'Tiny', shortLabel: 'M', value: 'tiny' },
    { label: 'Compact', shortLabel: 'L', value: 'compact' }
  ];

  const groups = [
    { label: '', value: '' },
    { label: 'By Section', value: 'board' },
    { label: 'By Line', value: 'line' },
  ];

  const lines = turnouts.reduce((acc, curr) => {
    if (!acc.includes(curr.line)) {
      acc.push(curr.line);
    }
    return acc;
  }, []);

  const sections = turnouts.reduce((acc, curr) => {
    if (!acc.includes(curr.section)) {
      acc.push(curr.section);
    }
    return acc;
  }, []);

  useEffect(() => {
    onChange({ lineFilters })
  }, [lineFilters]);

  useEffect(() => {
    onChange({ sectionFilters })
  }, [sectionFilters]);

  useEffect(() => {
    onChange({ view })
  }, [view]);

  useEffect(() => {
    onChange({ group })
  }, [group]);

  const handleViewChange = (event, newView) => {
    console.log('handleViewChange', newView);
    setView(newView);
  }

  const handleShowFiltersClick = (event) => {
    setFilterAnchorEl(filterAnchorEl === null ? event.currentTarget : null);
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  }

  const handleGroupedChange = (event) => {
    setGroup(event.target.value);
  };

  const handleMapsChange = event => {
    setShowMaps(event.target.checked);
  }

  const handleLineFilterClick = filterValue => {
    let updatedList = [...lineFilters];
    
    lineFilters.includes(filterValue)
      ? updatedList = updatedList.filter((line) => line !== filterValue)
      : updatedList.push(filterValue);
       
    setLineFilters(updatedList);
    
  }

  const handleSectionFilterClick = filterValue => {
    let updatedList = [...sectionFilters];
    
    sectionFilters.includes(filterValue)
      ? updatedList = updatedList.filter((section) => section !== filterValue)
      : updatedList.push(filterValue);
       
    setSectionFilters(updatedList);
  }

  return (
    <Grid 
      container 
      spacing={1} 
      className="conductor-menu" 
      direction="row"
      justify="space-between"
      alignItems="center">
      <Grid item>

        <FormControl >
          <ToggleButtonGroup 
            size="small" 
            exclusive={true}
            onChange={handleViewChange}
            value={view}>
            {views.map(v => (
              <ToggleButton 
                key={v.value}
                color="primary"
                value={v.value}>
                  {v.shortLabel}
              </ToggleButton>))}
          </ToggleButtonGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl >
          <InputLabel htmlFor="group">Group By</InputLabel>
          <Select
            native
            size="small" 
            value={group}
            onChange={handleGroupedChange}
            inputProps={{
              name: 'group',
              id: 'group',
            }}
          >
            {groups.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>

        <FormControlLabel
          control={
            <Switch
              checked={showMaps}
              onChange={handleMapsChange}
              size="small" 
              name="showMaps"
              color="primary"
            />
          }
          label="Show Maps"
        />
      </Grid>
      <Grid item>

        <FormControl className="filter">
          {/* <IconButton color="primary" onClick={handleShowFiltersClick} size="small">
            <FilterListIcon />
          </IconButton> */}
          <Popover 
            open={filterAnchorEl !== null}
            anchorEl={filterAnchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div
              style={{
                padding: '0.25rem 0.5rem',
                display: 'flex',
                flexDirection: 'column'
              }}>
              {lines.map(f => (
                <Chip 
                  clickable
                  onClick={() => handleLineFilterClick(f)}
                  key={f} 
                  label={`Line: ${f}`} 
                  size="small"
                  icon={<ViewModuleIcon style={{ opacity: lineFilters.includes(f) ? '1' : '0.15' }} />}
                  variant="outlined"
                  style={{  
                    margin: '0.25rem 0', 
                    padding: '0.25rem 0', 
                    justifyContent: 'flex-start',
                    borderColor: linesConfig.find(l => l.lineId === f).color 
                  }}
                />
              ))}
              {sections.map(f => (
                <Chip 
                  clickable
                  onClick={() => handleSectionFilterClick(f)}
                  key={f} 
                  label={`Section: ${f}`} 
                  size="small"
                  icon={<ViewModuleIcon style={{ opacity: sectionFilters.includes(f) ? '1' : '0.15' }} />}
                  variant="outlined"
                  style={{  
                    margin: '0.25rem 0', 
                    padding: '0.25rem 0', 
                    justifyContent: 'flex-start',
                    borderColor: sectionsConfig.find(s => s.sectionId === f).color 
                  }}
                />
              ))}
            </div>
          </Popover>
        </FormControl>

        
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ margin: '0.25rem' }}>
          {lineFilters.map(f => (
            <Chip 
              clickable
              onClick={() => handleLineFilterClick(f)}
              key={f} 
              label={`Line: ${f}`} 
              size="small"
              variant="outlined"
              icon={<ViewModuleIcon />}
              style={{  
                margin: '0.25rem', 
                padding: '0.25rem 0', 
                justifyContent: 'flex-start',
                backgroundColor: linesConfig.find(s => s.lineId === f).color 
              }}
            />
          ))}
          {sectionFilters.map(f => (
            <Chip 
              clickable
              onClick={() => handleSectionFilterClick(f)}
              key={f} 
              label={`Section: ${f}`} 
              size="small"
              variant="outlined"
              icon={<ViewModuleIcon />}
              style={{  
                margin: '0.25rem', 
                padding: '0.25rem 0', 
                justifyContent: 'flex-start',
                bordercClor: sectionsConfig.find(s => s.sectionId === f).color 
              }}
            />
          ))}
          </Paper>
      </Grid>
    </Grid>

  )
};

export default ConductorMenu;
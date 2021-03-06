import React, { useContext, useState } from 'react';
import * as Colors from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CallSplit from '@mui/icons-material/CallSplit';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Loading from '../Shared/Loading/Loading';
import ApiError from '../Shared/ApiError/ApiError';
import api, { apiStates } from '../Api';
import { Context } from '../Store/Store';
import Turnout from '../Turnouts/Turnout';

export const linesConfig = [
  { lineId: 'Mainline Red', label: 'Mainline SB', color: Colors.red[500] },
  { lineId: 'Mainline Green', label: 'Mainline NB', color: Colors.green[500] },
  { lineId: 'Tamarack Station', label: 'Tamarack Station North', color: Colors.cyan[500] }
];

export const districtsConfig = [
  { districtId: 'tampass', label: 'Tamarack Pass', boards: [0, 1] },
  { districtId: 'tamstation', label: 'Tamarack Station', boards: [2, 3, 4] },
  { districtId: 'city', label: 'Tamarack City', boards: [5, 6] }
];

export const ThrottleTurnouts = props => {


  const [ state, dispatch ] = useContext(Context);

  // const { turnouts, turnoutsStatus, onChange } = props;
  const { turnouts, layout } = state;

  const views = [
    { label: 'Tiny', value: 'tiny' },
    { label: 'Compact', value: 'compact' },
    { label: 'Comfy', value: 'comfy' },
  ];
  const [view, setView] = useState(window.localStorage.getItem('turnoutView') || views[0].value);

  const handleViewClick = event => {
    setView(event.target.value);
    window.localStorage.setItem('throttleView', event.target.value);
  }

  const toggleTurnout = async ( { turnoutId, current, straight, divergent }) => {
    console.log('toggleTurnout22', turnoutId, current, straight, divergent);
    const turnout = await api.turnouts.put(layout.layoutId, {
      turnoutId,
      current: current === divergent ? straight : divergent
    });
    await dispatch({ type: 'UPDATE_TURNOUT', payload: turnout });
  }

  return (
    <Grid container className={`grow throttle-turnouts throttle-turnouts--${view}`}>
      {/* <Grid item zeroMinWidth>
        <FormControl >
          <InputLabel shrink id="view-turnouts-label">
            View
          </InputLabel>
          <Select
            labelId="view-throttles-label"
            id="view-throttles"
            value={view}
            onChange={handleViewClick}
            displayEmpty
          >
            {views.map(view => (
              <MenuItem key={view.value} value={view.value}>{view.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid > */}
      <Grid item className="turnout__grid-item">
        {turnouts.map(turnout => (
          <Chip
            key={turnout.turnoutId}
            size="small"
            label={`${turnout.abbr}`}
            icon={<CallSplit />}
            variant="outlined"
            onClick={() => toggleTurnout(turnout)}
            style={{ margin: '0.25rem', backgroundColor: linesConfig.find(l => l.lineId === turnout.line).color }}
            clickable
          />
        ))}
      </Grid>
    </Grid>
  );

}

export default ThrottleTurnouts;
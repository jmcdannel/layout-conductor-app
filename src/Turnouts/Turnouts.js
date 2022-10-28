import React, { useContext, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AltRouteIcon from '@mui/icons-material/AltRoute';

import Turnout from './Turnout';
import TurnoutsMenu from './TurnoutsMenu';
import TamSouth from '../Layout/images/tam/TamSouth';

import { Context } from '../Store/Store';
import api from '../Api';
import './Turnouts.scss';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const TURNOUT_DELAY = 1000; // ms

export const Turnouts = props => {

  const { filter, showMenu } = props;
  const [ state, dispatch ] = useContext(Context);
  const { turnouts, routes } = state;
  const [ routeOrigin, setRouteOrigin ] = useState(undefined);
  const [ routeDestination, setRouteDestination ] = useState(undefined);
  const view = state.userPreferences.turnoutView;

  const handleTurnoutsAction = async action => {
    console.log('handleTurnoutsAction', action);
    switch(action) {
      case 'straight':
        await setTurnouts(turnouts.map(t => ({ turnoutId: t.turnoutId, state: true })));
        break;
      case 'divergent':
        await setTurnouts(turnouts.map(t => ({ turnoutId: t.turnoutId, state: false })));
        break;
      case 'toggle':
        await setTurnouts(turnouts.map(t => ({ turnoutId: t.turnoutId, state: !t.state })));
        break;
      case 'sweep':
        await setTurnouts(turnouts.map(t => ({ turnoutId: t.turnoutId, state: !t.state })));
        await setTurnouts(turnouts.map(t => ({ turnoutId: t.turnoutId, state: !t.state })));
        break;
    }
  }

  const setTurnouts = async deltas => {
    deltas.map(async (delta, idx) => {
      await sleep(idx * TURNOUT_DELAY);
      await setTurnout(delta);
    });
  }

  const setTurnout = async delta => {
    try {
      // await api.turnouts.put(delta);
      await dispatch({ type: 'UPDATE_TURNOUT', payload: delta });
    } catch (err) {
      console.error(err);
      // throw err;
    }   
  }

  const handleMapRouteClick = svgId => {
    const rte = routes.destinations.find(r => r.svgId === svgId);
    console.log('handleMapRouteClick', svgId, rte);
    handleRouteToggle(rte);
  }

  const handleMapTurnoutClick = svgId => {

    const getTurnoutId = svgId => {
      if (svgId.startsWith('lbl')) {
        return parseInt(svgId.replace(/lbl/g, ''));
      } else if (svgId.startsWith('_')) {
        return parseInt(svgId.replace(/_/g, ''));
      }
    }

    const turnout = turnouts.find(t => t.turnoutId === getTurnoutId(svgId));
    turnout && setTurnout({
      turnoutId: turnout.turnoutId,
      state: !turnout.state
    });
  }

  const handleRouteToggle = async rte => {
    if (routeDestination && rte.routeId === routeDestination.routeId) {
      setRouteDestination(undefined);
    } else if (routeOrigin && rte.routeId !== routeOrigin.routeId) { // origin is already selected, set this as the destination
      setRouteDestination(rte);
    } else if (!routeOrigin) {
      setRouteOrigin(rte);
    } else if (routeOrigin && rte.routeId === routeOrigin.routeId) {
      setRouteOrigin(undefined);
    }
  }

  const handleClearRoute = () => {
    setRouteDestination(undefined);
    setRouteOrigin(undefined);
  }

  const handleSetRoute = async () => {
    const path = routes.paths.find(path => path.destinations.includes(routeOrigin.routeId) && path.destinations.includes(routeDestination.routeId))
     await setTurnouts(path.turnouts);
    setTimeout(() => {
      setRouteDestination(undefined);
      setRouteOrigin(undefined);
    }, 3000);
  }

  const isRouteConnected = (originId, destinationId) => {
    return !!routes.paths.find(path => path.destinations.includes(originId) && path.destinations.includes(destinationId));
  }

  const computedRoutes = () => {

    const computedRouteProps = rte => {
      const classNames = ['route'];
      let disabled = false;
      let variant = 'contained';
      if (routeDestination && routeDestination.routeId === rte.routeId) {
          classNames.push('route__destination');
      } else if (routeOrigin && routeOrigin.routeId === rte.routeId) {
          classNames.push('route__origin');
      } else if (!routeDestination && routeOrigin) {
        if (isRouteConnected(routeOrigin.routeId, rte.routeId)) {
          classNames.push('route__available-option');
          variant = 'outlined';
        } else {
          classNames.push('route__unavailable-option');
          disabled = true;
          variant = 'outlined';
        }
      } else if (routeDestination && routeOrigin) {
        classNames.push('route__unavailable-option');
        disabled = true;
        variant = 'outlined';
      }
      return {
        className: classNames.join(' '),
        disabled,
        variant
      };
    }

    console.log('routes', routes);

    return routes.destinations.map(rte => ({
      ...rte,
      ...computedRouteProps(rte)
    }));
  }
  
  return turnouts ? (
    <Grid container sx={{ alignContent: 'flex-start' }}>
      {showMenu && (<Grid item sm={12} >
        <TurnoutsMenu handleTurnoutsAction={handleTurnoutsAction} />
      </Grid>)}
      <Grid item sm={12} >
        <TamSouth handleMapRouteClick={handleMapRouteClick} handleMapTurnoutClick={handleMapTurnoutClick} />
      </Grid>
      <Grid item sm={12} >
        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#000' }}>
          <Grid container>
            <Grid item sm={10} >
              <Grid container spacing={1}>
                {computedRoutes().map(rte => (
                  <Grid item xs="auto" key={rte.routeId} className={rte.className}>
                    <Chip
                      label={`${rte.name}`}
                      variant={rte.variant}
                      icon={<AltRouteIcon />}
                      clickable
                      disabled={rte.disabled}
                      onClick={e => handleRouteToggle(rte)}
                    />
                    {/* <pre>{JSON.stringify(rte, null, 2)}</pre> */}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item sm={1}>
              <Button onClick={handleClearRoute} sx={{ m: '0.25rem' }} variant="outlined" disabled={!routeOrigin}>Clear</Button>
            </Grid>
            <Grid item sm={1}>
              <Button onClick={handleSetRoute} sx={{ m: '0.25rem' }} variant="contained" disabled={!routeDestination}>Set Route</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={12} >
        <Paper elevation={2} sx={{ p: 2, backgroundColor: '#000' }}>
          <Grid container className={`turnouts turnouts--${view}`} spacing={2}>
            <Grid item sm={12} className="turnout__grid-item">
              {turnouts.filter(filter).map(turnout => (
                <div key={`turnout$${turnout.turnoutId}`} className="turnout__container">
                    <Turnout turnout={turnout} setTurnout={setTurnout} />
                </div>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  ) : null;

}

Turnouts.defaultProps = {
  filter: turnouts => turnouts,
  showMenu: true
};

export default Turnouts;
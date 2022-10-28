import React, { useContext, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import DispatcherMenu from './DispatcherMenu';
import TamSouth from '../Layout/images/tam/TamSouth';
import Routes from '../Routes/Routes';
import RouteMap from '../Routes/RouteMap';
import Turnout from '../Turnouts/Turnout';

import { Context } from '../Store/Store';
import './Dispatcher.scss';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const TURNOUT_DELAY = 1000; // ms

export const Dispatcher = props => {

  const { filter, showMenu } = props;
  const [ state, dispatch ] = useContext(Context);
  const { turnouts, routes } = state;
  const view = state.userPreferences.turnoutView;
  const dispatcherLayout = state.userPreferences.dispatcherLayout;

  const handleTurnoutsAction = async action => {
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
      await handleTurnoutChange(delta);
    });
  }

  const handleMapRouteClick = svgId => {
    const rte = routes.destinations.find(r => r.svgId === svgId);
    console.log('handleMapRouteClick', svgId, rte);
    // handleRouteToggle(rte);

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
    turnout && handleTurnoutChange({
      turnoutId: turnout.turnoutId,
      state: !turnout.state
    });
  }

  const handleTurnoutChange = async delta => {
    try {
      // await api.turnouts.put(delta);
      await dispatch({ type: 'UPDATE_TURNOUT', payload: delta });
    } catch (err) {
      console.error(err);
      // throw err;
    }   
  }
  
  return turnouts ? (
    <Grid container sx={{ alignContent: 'flex-start' }}>
      {showMenu && (
        <Grid item sm={12} >
          <DispatcherMenu handleTurnoutsAction={handleTurnoutsAction}  />
        </Grid>
      )}

      {dispatcherLayout.map && (
        <Grid item sm={12} >
          {/* <TamSouth handleMapRouteClick={handleMapRouteClick} handleMapTurnoutClick={handleMapTurnoutClick} /> */}
          <RouteMap setTurnouts={setTurnouts} />
        </Grid>
      )}

      {dispatcherLayout.routes && (
        <Grid item sm={12} p={2}>
          <Routes setTurnouts={setTurnouts} />
      </Grid>
      )}
      
      {dispatcherLayout.turnouts && (
        <Grid item sm={12} p={2}>
          <Grid container className={`turnouts turnouts--${view}`} spacing={2}>
            <Grid item sm={12} className="turnout__grid-item">
              {turnouts.filter(filter).map(turnout => (
                <div key={`turnout$${turnout.turnoutId}`} className="turnout__container">
                    <Turnout turnout={turnout} handleTurnoutChange={handleTurnoutChange} />
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  ) : null;

}

Dispatcher.defaultProps = {
  filter: turnouts => turnouts,
  showMenu: true
};

export default Dispatcher;
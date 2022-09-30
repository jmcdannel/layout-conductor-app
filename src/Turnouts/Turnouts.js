import React, { useContext, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Turnout from './Turnout';
import MapTurnout from './MapTurnout';
import tamarackStationSouthImage from '../Layout/images/tam/tamarack-station-south.png';
import { ReactComponent as Turnout4Left } from '../Shared/Images/TurnoutMasks/4-left.svg';
// import { ReactComponent as TamSouth } from '../Layout/images/tam/tam-south-lines.svg';
// import { ReactComponent as TamSouth } from '../Layout/images/tam/tam-south-lines-0.001.svg';
import TamSouth from '../Layout/images/tam/TamSouth';

import { Context } from '../Store/Store';
import api from '../Api';
import './Turnouts.scss';

export const Turnouts = props => {

  const { filter, view } = props;
  const [ state, dispatch ] = useContext(Context);
  const { turnouts } = state;

  console.log('TURNOUTS VIEW', view);

  return turnouts ? (
    <Grid container className={`turnouts turnouts--${view}`}>
      {/* <Grid item sm={12} className={tunroutStateClasses()}>
        <TamSouth />
      </Grid> */}
        <Grid item sm={12} className="turnout__grid-item">
          {turnouts.filter(filter).map(turnout => (
            <div key={`turnout${turnout.turnoutId}`} className="turnout__container">
               <Turnout turnout={turnout} />
            </div>
          ))}
        </Grid>
    </Grid>
  ) : null;

}

Turnouts.defaultProps = {
  filter: turnouts => turnouts,
  view: 'comfy'
};

export default Turnouts;
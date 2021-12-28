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

  const { filter, groupBy } = props;

  const view = 'tiny';

  const [ state, dispatch ] = useContext(Context);
  const { turnouts } = state;

  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('attaching listeners');
    

  });

  const lines = filter(turnouts).reduce((acc, curr) => {
    if (!acc.includes(curr.line)) {
      acc.push(curr.line);
    }
    return acc;
  }, []);

  const sections = filter(turnouts).reduce((acc, curr) => {
    if (!acc.includes(curr.section)) {
      acc.push(curr.section);
    }
    return acc;
  }, []);

  const tunroutStateClasses = () => turnouts.map(t => 
    `turnout-${t.turnoutId}-${t.current === t.straight ? 'straight' : 'divergent'}`
  ).join(' ');

  // const handleMapClick = async (e) => {
  //   console.log('handleMapClick', e);
  //   console.log('e.target', e.target);
  //   console.log('id', e.target.id);
  //   const id = e.target.id && e.target.id.startsWith('t')
  //     ? Number(e.target.id.substring(1))
  //     : null;
  //   if (id) {
  //     let turnout = turnouts.find(t => t.turnoutId === id);
  //     console.log('turnout', turnout);

  //     try {
  //       const newCurrent = (turnout.current === turnout.divergent) ? turnout.straight : turnout.divergent;
  //       turnout = await api.turnouts.put({ turnoutId: turnout.turnoutId, current: newCurrent });
  //       await dispatch({ type: 'UPDATE_TURNOUT', payload: turnout });
  //     } catch (err) {
  //       console.error(err);
  //       setError(err.toString());
  //     }

  //   }
  // }


  return turnouts ? (
    <Grid container className={`turnouts turnouts--${view}`}>
      <Grid item sm={12} className={tunroutStateClasses()}>
        <TamSouth />
      </Grid>
      {groupBy === '' && (
        <Grid item sm={12} className="turnout__grid-item">
          {turnouts.map(turnout => (
            <div key={`turnout${groupBy}${turnout.turnoutId}`} className="turnout__container">
               <Turnout config={turnout} />
            </div>
          ))}
        </Grid>
      )}
      {groupBy === 'line' && lines.map(line => (
        <div key={`line-${line}`}>
          <Grid item sm={12} className="turnout__grid-item">
            <h3>{line}</h3>
          </Grid>
          <Grid item sm={12} className="turnout__grid-item">
            {turnouts.filter(t => t.line === line).map(turnout => (
              <div key={`turnout${groupBy}${turnout.turnoutId}`} className="turnout__container">
              {console.log('line', turnout, turnout.turnoutId)}
                <Turnout config={turnout} />
              </div>
            ))}
          </Grid>
        </div>
      ))}
      {groupBy === 'board' && sections.map(section => (
        <div key={`section-${section}`}>
          <Grid item sm={12} className="turnout__grid-item">
            <h3>{section}</h3>
          </Grid>
          <Grid item sm={12} className="turnout__grid-item">
            {turnouts.filter(t => t.section === section).map(turnout => (
              <div key={`turnout${groupBy}${turnout.turnoutId}`} className="turnout__container">
                <Turnout config={turnout} />
              </div>
            ))}
          </Grid>
          <Grid item sm={12} className="turnout__grid-item">
            

            <div className="turnout__layout">
              <img src={tamarackStationSouthImage} />
              {/* <button className="turnout__layout__switch turnout__layout__switch--ts10 turnout__layout__switch--ts10--divergent"><Turnout4Left className="turnout__layout__switch__img" /></button> */}
              {turnouts.filter(t => t.section === section).map(turnout => (
                <MapTurnout key={`mapturnout${groupBy}${turnout.turnoutId}`} config={turnout} />
              ))}
              
              
            </div>
          </Grid>
        </div>
      ))}
    </Grid>
    
  ) : null;

}

Turnouts.defaultProps = {
  initialView: 'compact',
  groupBy: '',
  filter: turnouts => turnouts
};

export default Turnouts;
import React, { useContext, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Turnout from './Turnout';
import TurnoutsMenu from './TurnoutsMenu';
import TamSouth from '../Layout/images/tam/TamSouth';
// import MapTurnout from './MapTurnout';
// import tamarackStationSouthImage from '../Layout/images/tam/tamarack-station-south.png';
// import { ReactComponent as Turnout4Left } from '../Shared/Images/TurnoutMasks/4-left.svg';
// import { ReactComponent as TamSouth } from '../Layout/images/tam/tam-south-lines.svg';
// import { ReactComponent as TamSouth } from '../Layout/images/tam/tam-south-lines-0.001.svg';

import { Context } from '../Store/Store';
import api from '../Api';
import './Turnouts.scss';

const panels = {
  routes: 'Routes',
  turnouts: 'Turnouts'
}

export const Turnouts = props => {

  const { filter } = props;
  const [ state, dispatch ] = useContext(Context);
  const { turnouts } = state;
  const [selectedPanel, setSelectedPanel] = useState(panels.routes)
  const view = state.userPreferences.turnoutView;

  console.log('state', state)

  return turnouts ? (
    <Grid container className={`turnouts turnouts--${view}`}>
      <Grid item sm={12} >
        <TamSouth />
      </Grid>
      <Grid item sm={12} >
        <TurnoutsMenu />
      </Grid>
      <Grid item sm={12} className="turnout__grid-item">
      <Accordion expanded={selectedPanel === panels.routes} onChange={setSelectedPanel(panels.routes)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
           <h2>Routes</h2>
        </AccordionSummary>
        <AccordionDetails>
          {turnouts.filter(filter).map(turnout => (
            <div key={`turnout${turnout.turnoutId}`} className="turnout__container">
                <Turnout turnout={turnout} />
            </div>
          ))}         
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === panels.turnouts} onChange={setSelectedPanel(panels.turnouts)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
         <h2>Turnouts</h2>
        </AccordionSummary>
        <AccordionDetails>
          {turnouts.filter(filter).map(turnout => (
            <div key={`turnout${turnout.turnoutId}`} className="turnout__container">
                <Turnout turnout={turnout} />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      




      </Grid>
    </Grid>
  ) : null;

}

Turnouts.defaultProps = {
  filter: turnouts => turnouts
};

export default Turnouts;
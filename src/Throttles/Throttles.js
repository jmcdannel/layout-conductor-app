import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Throttle from './Throttle';
import MiniThrottles from './MiniThrottles';
import { Context } from '../Store/Store';
import jmriApi from '../Shared/jmri/jmriApi';

import './Throttles.scss';

export const Throttles = props => {

  const [ state, dispatch ] = useContext(Context);
  const { locos } = state;
  
  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Box 
        flexGrow={1} 
        display="flex" 
        flexDirection="row" 
        className={`throttles__acquired  throttles__acquired--view-comfy`}>
        {locos.filter(loco => loco.isAcquired && !loco.cruiseControl).map(loco => 
            <Throttle key={loco.address} jmriApi={jmriApi} loco={loco} />
        )}        
      </Box>
      <Box className={`throttles__cruise-control`}>
        <MiniThrottles 
          locos={locos.filter(loco => loco.isAcquired && loco.cruiseControl)} 
          jmriApi={jmriApi} 
        />
      </Box>
      <Box className="throttles__unaquired">
        <MiniThrottles 
          locos={locos.filter(loco => !loco.isAcquired)} 
          jmriApi={jmriApi}  
        />
      </Box>
    </Box>
  );

}

export default Throttles;
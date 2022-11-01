import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Throttle from './Throttle';
import MiniThrottle from './MiniThrottle';
import { Context } from '../Store/Store';
import jmriApi from '../Shared/jmri/jmriApi';

import './Throttles.scss';

export const Throttles = props => {

  const [ state, dispatch ] = useContext(Context);
  const { locos } = state;

  const maxAcquired = 2;
  const maxCruiseControl = 4;

  const acquiredLocos = locos 
    ? locos
        .filter(loco => loco.isAcquired && !loco.cruiseControl) 
        .sort((objA, objB) => Number(objA.lastAcquired) - Number(objB.lastAcquired))
    : [];
  const cruiseLocos  = locos 
    ? locos
      .filter(loco => loco.isAcquired && loco.cruiseControl) 
      .sort((objA, objB) => Number(objA.lastAcquired) - Number(objB.lastAcquired))
    : [];
  const availableLocos  = locos ? locos.filter(loco => !loco.isAcquired) : [];
  
  return locos && locos.length  ? (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Box 
        flexGrow={1} 
        display="flex" 
        flexDirection="row" 
        className={`throttles__acquired  throttles__acquired--view-comfy`}>
        {acquiredLocos.map(loco => 
            <Throttle 
              key={loco.address}
              jmriApi={jmriApi} 
              loco={loco}
              cruiseDisabled={cruiseLocos.length >= maxCruiseControl}
             />
        )}        
      </Box>
      <Box className={`throttles__cruise-control`}>
          <Box display="flex" flexDirection="row"  flexWrap="wrap" >
            {cruiseLocos.map(loco => 
              <Box key={loco.address}>
                <MiniThrottle loco={loco} jmriApi={jmriApi} disabled={acquiredLocos.length >= maxAcquired} />
              </Box>
            )}
          </Box>
      </Box>
      <Box className="throttles__unaquired">
        <Box display="flex" flexDirection="row"  flexWrap="wrap" >
          {availableLocos.map(loco => 
            <Box key={loco.address}>
              <MiniThrottle loco={loco} jmriApi={jmriApi} disabled={acquiredLocos.length >= maxAcquired}/>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  ) : null;

}

export default Throttles;
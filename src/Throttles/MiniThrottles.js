import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PanToolIcon from '@mui/icons-material/PanTool';
import MiniThrottle from './MiniThrottle';
import './MiniThrottles.scss';

export const MiniThrottles = ({ locos, jmriApi, onLocoClick }) => {

  return locos.length > 0 
    ? (
        <Box display="flex" flexDirection="row"  flexWrap="wrap" >
          {locos.map(loco => (
            <Box key={loco.address}>
              <MiniThrottle loco={loco} jmriApi={jmriApi} onLocoClick={onLocoClick} />
            </Box>
          ))}
        </Box>
    ) : null;

}

export default MiniThrottles;

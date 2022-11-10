import React, { useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import TrainIcon from '@mui/icons-material/Train';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import IconButton from '@mui/material/IconButton';
import { Context } from '../Store/Store';

import './MiniThrottle.scss';

export const AvailableThrottle = props => {

  const [ , dispatch ] = useContext(Context);
  
  const { 
    jmriApi, 
    onLocoClick, 
    loco, 
    throttleIdx, 
    disabled, 
    loco: {  address } 
  } = props;

  const handleLocoClick = async () => {
    console.log('handleLocoClick', loco, throttleIdx, disabled);
    loco.throttleIdx = throttleIdx;
    try {
      await dispatch({ type: 'UPDATE_LOCO', payload: { address, throttleIdx } });
      await jmriApi.requestLoco(address);
    } catch (err) {
      console.error(err);
    }
    
    if (onLocoClick) {
      onLocoClick(loco);
    }
  }

  useEffect(() => {
    jmriApi.on('acquire', 'Throttles',  async (address) => {
      console.log('handleLocoAcquired', address);
      await dispatch({ type: 'UPDATE_LOCO', payload: { address, isAcquired: true, lastAcquired: new Date() } });
    });
  }, [jmriApi, dispatch]);

  return (
    <Paper 
      display="flex"
      sx={{
        justifyContent: 'space-between'
      }}
      elevation={3} 
      className="available-throttle">
        <Chip
            label={`${loco.address}`}
            icon={<TrainIcon />}
            className="chip"
            variant={'outlined'}
            clickable
            disabled={disabled}
            onClick={handleLocoClick}
          />
      
        <IconButton 
          variant="outlined" 
          size="medium"
          color="primary" 
          disabled={disabled}
          onClick={handleLocoClick}>
            <OpenInBrowserIcon />
          </IconButton>
      </Paper>
  )

}

export default AvailableThrottle;

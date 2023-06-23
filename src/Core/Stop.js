import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import PanToolIcon from '@mui/icons-material/PanTool';
import { Context } from '../Store/Store';

const STOP = '0.0';

export const Stop = props => {

  const { jmriApi, jmriReady } = props;
  const [ state, dispatch ] = useContext(Context);
  const { locos } = state;

  const handleStopClick = () => {
    console.log('handleStopClick');
    locos && locos.filter(loco => loco.isAcquired).map(async loco => {
      console.log('Stopping', { address: loco.address, speed: STOP }, STOP);
      try {
        await jmriApi.throttle(loco.address, STOP);
      } catch (err) { console.error(err); }
      try {
        await dispatch({ type: 'UPDATE_LOCO', payload: { address: loco.address, speed: STOP } });
      } catch (err) { console.error(err); }
      console.log('Stopped', loco, STOP);
    });
  }

  return (
    <Button
      onClick={handleStopClick} 
      color="error"
      variant="contained"
      disabled={!jmriReady}
      startIcon={<PanToolIcon />}
    >
      <Hidden smDown>Stop</Hidden>
    </Button>)
}

export default Stop;
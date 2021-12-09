import React, { useState, useEffect, useContext } from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import TrainIcon from '@mui/icons-material/Train';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import ThrottleSpeed from './ThrottleSpeed';
import JmriThrottleController from './JmriThrottleController';
import PanToolIcon from '@mui/icons-material/PanTool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Context } from '../Store/Store';
import useDebounce from '../Shared/Hooks/useDebounce';

export const MiniThrottle = props => {

  const [ state, dispatch ] = useContext(Context);
  const maxSpeed = 100;
  const minSpeed = -maxSpeed;
	const STOP = '0.0';

  const { jmriApi, onLocoClick, loco, loco: { 
    address, 
    isAcquired, 
    speed, 
    forward
  } } = props;


  const initialUiSpeed = speed * 100 * (forward === true ? 1 : -1);

  const [ uiSpeed, setUiSpeed ] = useState(initialUiSpeed);
  const [ dirty, setDirty ] = useState(speed ? speed * 100 : 0);
  const debouncedSpeed = useDebounce(uiSpeed, 100);

  const handleLocoAcquired = async address => {
    await dispatch({ type: 'UPDATE_LOCO', payload: { address, isAcquired: true } });
  }

  const handleStopClick = () => {
    setUiSpeed(parseInt(STOP));
  }

  const handleUpClick = () => {
    setUiSpeed(uiSpeed + 1);
  }

  const handleDownClick = () => {
    setUiSpeed(uiSpeed - 1);
  }

  const handleLocoClick = async () => {
    try {
      if (isAcquired) {
        await dispatch({ type: 'UPDATE_LOCO', payload: { address, cruiseControl: false } });
      } else {
        await jmriApi.requestLoco(address);
      }
    } catch (err) {
      console.error(err);
    }
    
    if (onLocoClick) {
      onLocoClick(loco);
    }
  }

  const handleParkClick = async () => {
    try {
      console.log('handleParkClick', address);
      const res = await jmriApi.releaseLoco(address);
      console.log('releaseLoco', res);
      await dispatch({ type: 'UPDATE_LOCO', payload: { address, isAcquired: false, cruiseControl: false } });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    jmriApi.on('acquire', 'Throttles', handleLocoAcquired);
  }, [jmriApi, handleLocoAcquired]);

  const computedClassName = () => {
    return ['mini-throttle', 
      `mini-throttle--${loco.name.replace(' ', '')}  mini-throttle--${loco.road.replace(' ', '')}`,
      isAcquired ? 'mini-throttle__acquired' : 'mini-throttle__notacquired'].join(' ');
  }

  return (
    <Paper elevation={3} className={computedClassName()}>
        <Chip
            label={`${loco.address}`}
            icon={<TrainIcon />}
            className="chip"
            variant={isAcquired ? 'default' : 'outlined'}
            clickable
            onClick={handleLocoClick}
          />
      {isAcquired ? (
        <>
          <JmriThrottleController speed={debouncedSpeed} address={address} jmriApi={jmriApi} forward={forward} />
          <ThrottleSpeed speed={debouncedSpeed} idleByDefault={loco.idleByDefault} />
          
          <ButtonGroup
                      orientation="horizontal"
                      className="throttle__controls__group"
                      aria-label="vertical outlined primary button group"
                    >
            <IconButton 
              className="speed-down-btn"
              size="lamediumrge" 
              disabled={speed === minSpeed} 
              onClick={handleDownClick}>
                <RemoveIcon />
            </IconButton>
            <IconButton 
              className="speed-stop-btn"
              size="medium" 
              disabled={!isAcquired} 
              color="primary" 
              onClick={handleStopClick} >
                <PanToolIcon />
              </IconButton>
            <IconButton 
              className="speed-up-btn"
              size="medium" 
              disabled={speed === maxSpeed} 
              onClick={handleUpClick}>
                <AddIcon />
            </IconButton>
          </ButtonGroup>

          <IconButton size="medium" onClick={handleParkClick} ><LocalParkingIcon /></IconButton>
                  
          
          {/* <IconButton  size="medium" disabled={speed === minSpeed} onClick={handleDownClick}><RemoveIcon /></IconButton>
          <IconButton size="medium"  disabled={!isAcquired} variant="contained" color="primary" onClick={handleStopClick} ><PanToolIcon /></IconButton>
          <IconButton variant="outlined" size="medium" disabled={speed === maxSpeed} onClick={handleUpClick}><AddIcon /></IconButton> */}
        </>
      ) : ( 
        <IconButton variant="outlined" size="medium" variant="contained" color="primary" onClick={handleLocoClick}><OpenInBrowserIcon /></IconButton>
      )}
      </Paper>
  )

}

export default MiniThrottle;

import React, { useState, useEffect, useContext } from 'react';
import * as Colors from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import TrainIcon from '@mui/icons-material/Train';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PanToolIcon from '@mui/icons-material/PanTool';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ReportIcon from '@mui/icons-material/Report';
import ExpandIcon from '@mui/icons-material/Expand';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import CompressIcon from '@mui/icons-material/Compress';
import HighlightIcon from '@mui/icons-material/Highlight';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ThrottleSlider from './ThrottleSlider';
import ThrottleSpeed from './ThrottleSpeed';
import JmriThrottleController from './JmriThrottleController';
import Functions from './Functions';
import { Context } from '../Store/Store';
import useDebounce from '../Shared/Hooks/useDebounce';
import './Throttle.scss';

/*
[ ] Cruise Control / Park
[ ] Sticky Slider
[ ] Slider maxSpeed
*/

export const Throttle = props => {

  // const EMERGENCY_STOP = '-1.0';
	const STOP = '0.0';
  // const FULL_SPEED = '1.0';

  const { jmriApi, loco, onLocoClick, loco: { 
    address, 
    isAcquired, 
    speed, 
    autoStop,
    forward
  } } = props;
  
  const initialMaxSpeed = 100;
  const initialUiSpeed = speed * 100 * (forward === true ? 1 : -1);

  const [ state, dispatch ] = useContext(Context);
  // const [ initialized, setInitialized ] = useState(false);
  const [ uiSpeed, setUiSpeed ] = useState(initialUiSpeed);
  const [ maxSpeed, setMaxSpeed ] = useState(initialMaxSpeed);
  const [ minSpeed, setMinSpeed ] = useState(-initialMaxSpeed);
  const debouncedSpeed = useDebounce(uiSpeed, 100);

  // useEffect(() => {
  //   if (!initialized) { // TODO: move to store
  //     const jmriState = jmriApi.getState();
  //     if (jmriState.ready) {
  //       jmriReady();
  //     } else {
  //       jmriApi.on('ready', 'Throttle', jmriReady);
  //     }
  //   }
  // }, [ initialized, jmriApi ]);

  // const jmriReady = () => {
  //   setInitialized(true);
  // }

  const handleSliderSpeed = value => {
    setUiSpeed(value);
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

  const handleLocoClick = () => {
    if (onLocoClick) {
      onLocoClick(loco);
    }
  }

  const handleCruiceControlClick = async () => {
    try {
      await dispatch({ type: 'UPDATE_LOCO', payload: { address, cruiseControl: true } });
    } catch (err) {
      console.error(err);
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

  const handleStickyThrottleClick = () => {
    console.log('not implemented');
  }

  const handleThrottlePrecisionClick = () => {
    console.log('not implemented');
  }

  const handleMaxSpeedChange = (event) => {
    setMaxSpeed(event.target.value);
    setMinSpeed(-event.target.value);
  };

  const roadClassName = () => {
    return loco.road.toLowerCase().replace(/ /g, '-');
  }

  const formattedAddress = () => loco.address && loco.address.length > 2
    ? loco.address.substring(0, 2)
    : loco.address;

  return (
    <Card 
      className={`throttle throttle--${loco.name.replace(' ', '')}  throttle--${loco.road.replace(' ', '')}`} >

      <CardHeader
        title={loco.name}
        avatar={
          <Chip
              label={`${loco.address}`}
              icon={<TrainIcon />}
              className={roadClassName()}
              clickable
              onClick={handleLocoClick}
            />
        }
        // action={
        //   <IconButton aria-label="settings" onClick={handleMenuClick}>
        //     <MoreVertIcon />
        //   </IconButton>
        // }
      />
      <CardContent className="throttle__content grow flex">
        {(true || loco.isAcquired) && 
          <Grid container spacing={1} className="grow">
            <Grid item xs={5} flexGrow={1} display="flex">
                {isAcquired && (
                  <JmriThrottleController speed={debouncedSpeed} address={address} jmriApi={jmriApi} forward={forward} />
                )}
                <ThrottleSlider max={maxSpeed} className="throttle__slider__control" speed={uiSpeed} autoStop={autoStop} onChange={handleSliderSpeed} />
            </Grid>
            <Grid item xs={7} display="flex">
              {/* <Functions /> */}
              {/* <div className="throttle__space"></div> */}
              <div className="throttle__controls">
                <Paper elevation={3} className="" display="flex" direction="column">
                  {/* <pre>speed={loco.speed}</pre>
                  <pre>uiSpeed={uiSpeed}</pre> */}
                  <ThrottleSpeed speed={uiSpeed} />
                  <ButtonGroup
                      orientation="vertical"
                      className="throttle__controls__group"
                      aria-label="vertical outlined primary button group"
                    >
                    <IconButton 
                      className="speed-up-btn"
                      size="large" 
                      disabled={speed === maxSpeed} 
                      onClick={handleUpClick}>
                        <AddIcon />
                      </IconButton>
                    <IconButton 
                      className="speed-stop-btn"
                      size="large" 
                      disabled={!isAcquired} 
                      color="primary" 
                      onClick={handleStopClick} >
                        <PanToolIcon />
                      </IconButton>
                    <IconButton 
                      className="speed-down-btn"
                      size="large" 
                      disabled={speed === minSpeed} 
                      onClick={handleDownClick}>
                        <RemoveIcon />
                    </IconButton>
                  </ButtonGroup>

                </Paper>
                <div>
                  <IconButton size="large" onClick={handleCruiceControlClick} ><SpeedIcon /></IconButton>
                  <IconButton size="large" onClick={handleParkClick} ><LocalParkingIcon /></IconButton>
                  <IconButton size="large" onClick={handleStickyThrottleClick} ><ExpandIcon /></IconButton>
                  {/* <IconButton size="medium" ><CompressIcon /></IconButton> */}
                  <IconButton size="large" onClick={handleThrottlePrecisionClick} ><ThermostatAutoIcon/></IconButton>
                  {/* <IconButton size="large" ><HighlightIcon/></IconButton>                  
                  <IconButton size="large" disabled><SettingsIcon/></IconButton>                  
                  <IconButton size="large" disabled ><FavoriteIcon/></IconButton>                   */}
                </div>
              </div>
            </Grid>
          </Grid>
        }
      </CardContent>
      
    </Card>
  )
}

export default Throttle;
import React, { useState, useEffect, useContext } from 'react';
import * as Colors from '@mui/material/colors';
// import SwitchImg from './switch.svg';
import { ReactComponent as Logo } from './switch.svg';
import { ReactComponent as TurnoutStriaghtImage } from '../Shared/Images/turnout-straight.svg';
import { ReactComponent as TurnoutDivergentImage } from '../Shared/Images/turnout-divergent.svg';
import { ReactComponent as TurnoutDImage } from '../Shared/Images/turnout-export.svg';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Switch from '@mui/material/Switch';

// import CallSplit from '@mui/icons-material/CallSplit';
import RestoreIcon from '@mui/icons-material/Restore';
import PowerIcon from '@mui/icons-material/Power';
import TuneIcon from '@mui/icons-material/Tune';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import LinkIcon from '@mui/icons-material/Link';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import myIcon from '@mui/icons-material/'
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import PortableWifiOffIcon from '@mui/icons-material/PortableWifiOff';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Settings from './Settings';
import { Context } from '../Store/Store';
import api from '../Api';
import './Turnout.scss';
// import { linesConfig } from '../Api';


export const linesConfig = [
  { lineId: 'Demo Track', label: 'Mainline SB', color: Colors.red[500] }
];
const defaultLine = { lineId: 'Unknown Line', label: 'Unknown Line', color: Colors.grey[500] };

export const Turnout = props => {

  const { turnout } = props;  
  const [ state, dispatch ] = useContext(Context);

  const [isDivergent, setIsDivergent] = useState(!turnout.state);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isPristine, setIsPristine] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setIsDivergent(turnout.state);
  }, [turnout.state]);

  const handleToggle = async e => {
    if (isLoading) { 
      return;
    }
    try {
      setIsLoading(true);
      setIsPristine(false);
      const newState = !turnout.state;
      const turnout = await api.turnouts.put({ 
        turnoutId: turnout.turnoutId, 
        state: newState 
      });
      await dispatch({ type: 'UPDATE_TURNOUT', payload: turnout });
    } catch (err) {
      console.error(err);
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
    
  }

  const getLineColor = () => {
    return defaultLine.color;
  }

  const handleReset = async e => {
    if (isLoading) { 
      return;
    }
    try {
      setIsLoading(true);
      setIsPristine(false);
      const turnout = await api.turnouts.put({ 
        turnoutId: turnout.turnoutId, 
        state: false 
      });
      await dispatch({ type: 'UPDATE_TURNOUT', payload: turnout });
    } catch (err) {
      console.error(err);
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }

    const turnout = await api.turnouts.put({ 
      turnoutId: turnout.turnoutId, 
      state: false 
    });
    await dispatch({ type: 'UPDATE_TURNOUT', payload: turnout });
  }

  const handleSettings = () => setShowSettings(true);

  const hideSettings = () => setShowSettings(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(undefined);
  };


	return (
    <Card className={`turnout turnout--compact`}>
      <CardHeader className="turnout__header">
        <Chip
            label={`${turnout.name}`}
            // icon={<CallSplit />}
            variant="outlined"
            className="chip"
            size="small"
            style={{ backgroundColor: getLineColor() }}
            clickable
            onClick={handleToggle}
          />
          <Box className="turnout__header__status">
            {isLoading || isPristine 
              ? <PortableWifiOffIcon style={{color: 'gray'}} /> 
              :  <WifiTetheringIcon style={{color: 'green'}} />}
            {/* {relay && (
              <PowerIcon style={{ color: 'green'}}
              />
            )} */}
        </Box>
      </CardHeader>
      <CardContent className="turnout__id">


        <CardActionArea className={`turnout__state ${isLoading ? 'loading' : ''}`} onClick={handleToggle}>
          <CardMedia
            component="div"
            height="100%"
            title="Turnout State"
            className="media-container"        
          >
            <div className="svg-wrapper">
              {/* <Logo width="90" className={`turnout-image ${isDivergent ? 'divergent' : 'straight'}`} /> */}
              {isDivergent ? <TurnoutDivergentImage width="90" /> : <TurnoutStriaghtImage width="90" />}
            </div>
            {isLoading && (<CircularProgress color="primary" className="spinner" />)}
          </CardMedia>
        </CardActionArea>
          
        <Box my={1} className="turnout__desc compact-hidden">
          <Typography component="h6" variant="h6" gutterBottom>
            {turnout.name}
          </Typography>
          {/* <Typography component="small" gutterBottom>
            Angle: {current}
          </Typography> */}
          {/* {(crossover || reverse) && (
          <Box className="turnout__link">
              {crossover && (
                <Chip
                  label={`Crossover`}
                  icon={<ShuffleIcon />}
                  color={`${isLinked ? 'primary' : 'default'}`}
                  size="small"
                />
              )}
              {reverse && (
                <Chip
                  label={`Reverse: ${linkedTurnout.label}`}
                  icon={<SettingsBackupRestoreIcon />}
                  color={`${isLinked ? 'primary' : 'default'}`}
                  size="small"
                />
              )}
              <Switch checked={isLinked} onChange={handleLinkedChange} name="islinked" />
              {isLinked 
                    ? <LinkIcon style={{color: 'green'}} />
                    : <LinkOffIcon style={{color: 'gray'}} />
                  }
          </Box>)} */}
          
        </Box>

      </CardContent>
      <CardActions className="tournout__actions">
        <Button 
          className="compact-hidden"
          variant="contained" 
          color="primary" 
          onClick={handleToggle}
          // startIcon={<CallSplit />}
          >
            Toggle
        </Button>
        <span>
          <IconButton variant="outlined" onClick={handleReset} color="primary" disabled={isLoading}>
            <RestoreIcon />
          </IconButton>
          {/* <IconButton variant="outlined" color="default">
            <MapIcon />
          </IconButton> */}
          <IconButton variant="outlined" color="default" onClick={handleSettings}>
            <TuneIcon />
          </IconButton>
        </span>
      </CardActions>
      {/* <Settings 
        open={showSettings} 
        turnout={turnout} 
        onClose={hideSettings}
      /> */}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error} />
    </Card>
	)

}

export default Turnout;
import React, { useContext, useState } from 'react';
import * as Colors from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HighlightIcon from '@mui/icons-material/Highlight';
// import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import TrafficIcon from '@mui/icons-material/Traffic';
import Signal from './Signal';
import { Context } from '../Store/Store';
import api from '../Api';
import { getSectionColor, getLineColor, getEffectColor } from '../config/config';



export const Effect = props => {

  const { effect, effect: { effectId }, view } = props;

  const [ state, dispatch ] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [isPristine, setIsPristine] = useState(true);

  const handleSwitchChange = (event) => {
    updateEffect({ effectId, state: event.target.checked ? 1 : 0 })
  };

  const handleButtonClick = (event) => {
    updateEffect({ effectId, state: 1 })
  };

  const updateEffect = async (changedEffect) => {
    if (isLoading) { 
      return;
    }
    try {
      setIsLoading(true);
      setIsPristine(false);
      const newEffect = await api.effects.put(changedEffect);
      await dispatch({ type: 'UPDATE_EFFECT', payload: newEffect });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getMetaData = effect => (
    <div className="effect__meta">
      <p>
        <strong>{effect.actions.length}</strong> Actions 
        | 
        State: <strong>{effect.state}</strong>
      </p>
      {effect.line && (<Chip 
        label={`Line: ${effect.line}`} 
        size="small"
        variant="outlined"
        style={{  
          margin: '0.25rem',
          borderColor: getLineColor(effect.line) 
        }}
      />)}
      {effect.section && (<Chip 
        label={`Section: ${effect.section}`} 
        size="small"
        variant="outlined"
        style={{  
          margin: '0.25rem',
          borderColor: getSectionColor(effect.section)
        }}
      />)}
    </div>
  );

  const isSmallView = (view === 'pill' || view === 'tiny');
  const size = isSmallView ? 'small' : 'large';

  const getAvatar = () => {
    switch(effect.type.toLowerCase()) {
      case 'light':
        return (<HighlightIcon fontSize={size} />);
      case 'lighting animation':
        return (<MovieFilterIcon fontSize={size} />);
      case 'signal':
        return (<TrafficIcon fontSize={size} />);
      case 'sound':
      case 'sound loop':
        return (<MusicNoteIcon fontSize={size} />);
      default:
        return effect.type.substring(0, 1);                                                                                
    }
  }

  const getAction = () => {
    switch(effect.type.toLowerCase()) {
      case 'signal':
        return null;
      case 'sound':
        return (
            <Button 
              onClick={handleButtonClick} 
              color="secondary" 
              size="small"
              variant="outlined" 
              startIcon={<MusicNoteIcon />}>
                Play
            </Button>
          );
      default:
        return (
          <Switch
            checked={!!effect.state}
            onChange={handleSwitchChange}
            name="effectSwitch"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        )                    
    }
  }

  const renderContent = () => {
    switch(effect.type.toLowerCase()) {
      case 'signal':
        return (<Signal effect={effect} getMetaData={getMetaData} onChange={updateEffect} view={view} />);
      default:
        return (
        <Grid container direction="row">
          {!isSmallView && (<Grid item xs={9}>
            {getMetaData(effect)}
          </Grid>)}
          <Grid item xs={isSmallView ? 12 : 3}>
            {getAction()}
          </Grid>
        </Grid>);
    }
  }

  return (
    <Card className="effect">
      <CardHeader
        avatar={
          <Avatar>
            {getAvatar()}
          </Avatar>}
        title={effect.name}
      />
      <CardContent>
          {renderContent()}
      </CardContent>
      
    </Card>
  )

}

export default Effect;
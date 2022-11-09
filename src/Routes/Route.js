import React, { useState, useEffect, useContext } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardContent';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import AltRouteIcon from '@mui/icons-material/AltRoute';
import TuneIcon from '@mui/icons-material/Tune';

import './Route.scss';

const lineColors = {
  'Valley': 'rgb(13, 242, 40)',
  'Tamarack Station': 'rgb(0, 255, 253)',
  'Valley City': 'rgb(206, 217, 38)'
}

export const Route = props => {

  const { route, handleRouteToggle } = props;  

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isPristine, setIsPristine] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const handleSettings = () => setShowSettings(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(undefined);
  };

  const handleToggle = async e => {
    if (isLoading) { 
      return;
    }
    try {
      setIsLoading(true);
      setIsPristine(false);
      await handleRouteToggle(route);
    } catch (err) {
      console.error(err);
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }    
  }

  return (
    <Card className={route.className}>
      <CardHeader className="route__header">
          <Chip
            label={`${route.name}`}
            variant={route.variant}
            icon={<AltRouteIcon />}
            size="small"
             sx={{ borderColor: lineColors[route.line] }}
            clickable
            disabled={route.disabled}
            onClick={e => handleRouteToggle(route, true)}
          />
      </CardHeader>
      <CardContent className="route__id">
        <Typography variant="body2" gutterBottom>
          {route.line}
        </Typography> 
      </CardContent>
      <CardActions className="route__actions">
        <span>          
          <IconButton variant="outlined" color="default" onClick={handleSettings}>
            <TuneIcon />
          </IconButton>
        </span>
        <Button 
          className="compact-hidden"
          variant="contained" 
          color="primary" 
          onClick={handleToggle}
          >
            Toggle
        </Button>
      </CardActions>
      {/* <Settings 
        open={showSettings} 
        turnout={turnout} 
        onClose={hideSettings}
      /> */}

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error} />
    </Card>
  );
}

export default Route;
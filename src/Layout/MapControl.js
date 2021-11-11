import React, { useState } from 'react';
// import { ReactComponent as LayoutSVG } from './layout.svg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
// import DoneIcon from '@mui/icons-material/Done';
// import { MapInteractionCSS } from 'react-map-interaction';

import { linesConfig } from '../Api';
import TurnoutSwitch from './Switch';
import baseImg from './images/IDAWANY-base.png';
import './MapControl.scss';

function MapControl(props) {

  const { turnouts, onChange } = props;

  const hideLines = ['Brown', 'Blue', 'Purple'];
  const initialLines = linesConfig.map(line => ({ visible: !hideLines.includes(line.name), ...line }));

  const [lines, setLines] = useState(initialLines);
  const [showTurnouts, setShowTurnouts] = useState(true);

  const [zoomState, setZoomState] = useState({
    scale: 1,
    translation: { x: 0, y: 0 }
  });

  const handleTurnoutSwitch = e => {
    setShowTurnouts(e.target.checked);
  }

  const toggleLine = _line => {
    const line = lines.find(line => line.name === _line.name);
    line.visible = !line.visible;
    setLines([...lines]);
  }

  const getSVGClassName = () => {
    const classes = 
      lines.filter(line => line.visible).map(line => `show-line-${line.line}`);
    if (showTurnouts) {
      classes.push('show-turnouts');
    }
    return `layout-img ${classes.join(' ')}`;
  }

  const getTurnoutById = id => turnouts.find(t => id === t.turnoutId);

  const getLinkedTurnout = turnout => 
    turnout.crossover
      ? getTurnoutById(turnout.crossover)
      : turnout.reverse
        ? getTurnoutById(turnout.reverse)
        : null;

  return (
    <Paper>
      <Grid container width="100%" direction="row" >
        <Grid item xs={12} className="filters">
          
          <Box>
            <Typography component="h5" variant="h5" gutterBottom>
              Lines
            </Typography>

            {lines.map((line, idx) => (
              <Chip
                key={idx}
                size="small"
                label={`${line.name}`}
                variant="outlined"
                className="line-toggle"
                style={{ backgroundColor: line.color, opacity: line.visible ? 1 : 0.3 }}
                onClick={() => toggleLine(line)}
                onDelete={() => toggleLine(line)}
                deleteIcon={line.visible ? null : null}
                clickable
              />
            ))}
            <FormControlLabel control={
                <Switch value="showTurnouts" onChange={handleTurnoutSwitch} checked={showTurnouts} />
              } label="Show Turnouts" />
          </Box>

        </Grid>
        <Grid item xs={12}>
          {/* <MapInteractionCSS
            scale={zoomState.scale}
            translation={zoomState.translation}
            onChange={({ scale, translation }) => setZoomState({ scale, translation })}
            defaultScale={1}
            defaultTranslation={{ x: 0, y: 0 }}
            minScale={0.05}
            maxScale={5}
            showControls>
            <div className="map-control">
              <div className={getSVGClassName()}>
                <img src={baseImg} className="layout-base-layer"  alt="test" width="100%" />
                {lines.filter(line => line.visible).map((line, idx) => (
                  <img key={idx} src={line.img} className="layout-layer" alt="test" width="100%" />
                ))}
                {showTurnouts && (
                  <div className="switch-container">
                    {turnouts && turnouts.map(turnout => (
                      <TurnoutSwitch key={turnout.turnoutId} className="layout-switch" config={turnout} linked={getLinkedTurnout(turnout)} onChange={onChange} />
                    ))}
                  </div>
                )}
              </div>
                
               
              </div>
          </MapInteractionCSS> */}
              
        </Grid>
      </Grid>
    </Paper>
  );
}


export default MapControl;

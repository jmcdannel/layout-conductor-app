import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const ThrottleSlider = props => {

  const { speed, autoStop, onChange } = props;
  const [ idle, setIdle] = useState(autoStop);

  const scale = 100;
  const step = 10;
  const marks = Array.apply(null, Array(scale * 2 / step + 1)).map((x, i) => {
    const mark = (scale * -1) + i * step;
    return {
      label: mark,
      value: mark
    };
  });

  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleIdleChange = event => {
    setIdle(event.target.checked);
    onChange(0);
  }

  const handleChangeCommitted = (event, newValue) => {
    if (idle) {
      onChange(0);
    }
  };

  return (
    <Box display="flex" className="throttle__slider__container">
      <Slider
        orientation="vertical"
        defaultValue={0}
        min={-scale}
        max={scale}
        marks={marks}
        value={speed}
        track={false}
        aria-labelledby="vertical-slider"
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        className={`throttle__slider 
        ${speed < 0 
          ? 'throttle__speed--reverse' 
          : 'throttle__speed--forward'}`}
          
      />
      {/* <Grid item>
        <FormControlLabel
          control={<Switch checked={idle} onChange={handleIdleChange} name="isIdle" />}
          label="Idle"
        />
      </Grid> */}
    </Box>
  );

}

export default ThrottleSlider;
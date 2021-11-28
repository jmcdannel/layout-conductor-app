import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { Context } from '../Store/Store';
import Effect from './Effect';
import './Effects.scss';

export const Effects = props => {

  const { view, filter, groupBy } = props;

  const [ state, dispatch ] = useContext(Context);
  const { effects, sensors } = state;

  return (
    <Grid container className={`effects  effects--${view}`} spacing={2}>  
      {effects && effects.map(effect => (
        <Grid item key={`effect${effect.effectId}`} className="effects__grid-item" xs="auto">
            <Effect effect={effect} sensors={sensors} view={view} key={effect.effectId} />
        </Grid>
      ))}
    </Grid>    
  );

}

Effects.defaultProps = {
  initialView: 'compact',
  groupBy: '',
  filter: turnouts => turnouts
};

export default Effects;
import React, { useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import api from '../../../Api';
import { Context } from '../../../Store/Store';

export const TamSouth = ({
  handleMapRouteClick,
  handleMapTurnoutClick
}) => {
  const [ state, dispatch ] = useContext(Context);
  const { turnouts } = state;
  const dispatcherLayout = state.userPreferences.dispatcherLayout;

  const [error, setError] = useState(false);

  const handleMapClick = async (e) => {
    const svgBtn = findClickableParent(e.target);    
    if (svgBtn) {
      switch(svgBtn.type) {
        case 'Routes':
          handleMapRouteClick(svgBtn.target.id);
          break;
        case 'Turnouts':
        case 'TurnoutLabels':
          handleMapTurnoutClick(svgBtn.target.id);
          break;
      }
    }

    // const id = e.target.id && e.target.id.startsWith('t')
    //   ? Number(e.target.id.substring(1))
    //   : null;
    // if (id) {
    //   let turnout = turnouts.find(t => t.turnoutId === id);
    //   console.log('turnout', turnout);

    //   try {
    //     const newCurrent = (turnout.current === turnout.divergent) ? turnout.straight : turnout.divergent;
    //     turnout = await api.turnouts.put({ turnoutId: turnout.turnoutId, current: newCurrent });
    //     await dispatch({ type: 'UPDATE_TURNOUT', payload: turnout });
    //   } catch (err) {
    //     console.error(err);
    //     setError(err.toString());
    //   }

    // }
  }

  const findClickableParent = target => {
    const clickableContainers = ['Routes', 'Turnouts', 'TurnoutLabels']; 
    let found = false;
    let currentTarget = target;
    let targetType = '';
    while(!found && currentTarget && currentTarget.parentNode) {
      if (currentTarget.parentNode.nodeName.toLowerCase() === 'svg') {
        currentTarget = null;
      } else if (clickableContainers.includes(currentTarget.parentNode.id)) {
        targetType = currentTarget.parentNode.id;
        found = true;
      } else {
        currentTarget = currentTarget.parentNode;
      }
    }
    return found ? { target: currentTarget, type: targetType } : null;
  }

  const handleTouchEnd = async (e) => {
    setError(`handleTouchEnd: ${e} `);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(undefined);
  };
 
  const getClassNames = () => {
    const classNames = [];
    if (!dispatcherLayout.routes) {
      classNames.push('hide-routes');
    }
    if (!dispatcherLayout.turnouts) {
      classNames.push('hide-turnouts');
    }
    return classNames.concat(turnouts.map(t => `turnout-${t.turnoutId}-${t.state ? 'straight' : 'divergent'}`)).join(' ');
  };

  /*
  https://transform.tools/html-to-jsx
  
  REPLACE:
  xmlns:serif="http://www.serif.com/" 
   serif:id=".+?"
   serif:id=\{.+?\}

  ADD:
  <svg> --> onClick={handleMapClick}
  */

  return (
    <div className={getClassNames()}>
     
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error} />
    </div>
  );
}

export default TamSouth;
import React, { useState, useEffect, useContext } from 'react';

import Snackbar from '@mui/material/Snackbar';

import { Context } from '../Store/Store';

export const withMapEngine = WrappedComponent => props => {

  const { handleRouteToggle } = props;

  const [ state, dispatch ] = useContext(Context);
  const [ error, setError] = useState(false);
  const { turnouts, routes } = state;
  const dispatcherLayout = state.userPreferences.dispatcherLayout;

  const handleMapClick = async (e) => {
    const svgBtn = findClickableParent(e.target);    
    console.log('handleMapClick', svgBtn);
    if (svgBtn) {
      switch(svgBtn.type) {
        case 'Routes':
          handleMapRouteClick(svgBtn.target.id);
          break;
        case 'Turnouts':
        case 'TurnoutLabels':
          // handleMapTurnoutClick(svgBtn.target.id);
          break;
      }
    }

  }

  const handleMapRouteClick = svgId => {
    const rte = routes.destinations.find(r => r.svgId === svgId);
    console.log('handleMapRouteClick', svgId, rte);
    handleRouteToggle(rte, true);

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

  return (
    <div className={getClassNames()}>
      <WrappedComponent 
        handleMapClick={handleMapClick}
        { ...props } 
      />
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error} />
    </div>
  );
}

export default withMapEngine;
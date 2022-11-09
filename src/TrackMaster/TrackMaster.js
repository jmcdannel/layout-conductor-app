import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';

// Modules
import Conductor from '../Conductor/Conductor';
import Dispatcher from '../Dispatcher/Dispatcher';
// import Layout from '../Layout/Layout';
import Throttles from '../Throttles/Throttles';
// import Signals from '../Signals/Signals';
import Effects from '../Effects/Effects';
import Pinout from '../Settings/Pinout';
import LandingMenu from './LandingMenu';

// Store
import { MenuContext, menuConfig } from '../Shared/Context/MenuContext';
import { Context } from '../Store/Store';

// APIs
import { getAppConfig } from '../config/config';
import api, { apiStates } from '../Api';
import jmriApi from '../Shared/jmri/jmriApi';

import './TrackMaster.scss';
import { ModeNight } from '@mui/icons-material';

function TrackMaster(props) {

  const appConfig = getAppConfig();

  const [ state, dispatch ] = useContext(Context);
  const { signals, effects, sensors, turnouts, modules } = state;

  const [menu, setMenu] = useState(menuConfig);

  const [jmriInitialized, setJmriInitialized] = useState(false);
  const [sensorsInitialized, setSensorsInitialized] = useState(false);
  const [jmriReady, setJmriReady] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    const initialize = async function() {
      try {
        const apiInitState = await api.initialize();
        const newState = await dispatch({ type: 'INIT_STATE', payload: apiInitState });
        console.log('INIT_STATE', newState, apiInitState);
        setApiReady(true);
      } catch (err) {
        console.error('api initialization error', err);
      }
    };
    
    initialize();
  }, []);

  // Initialize JMRI Websocket connection
  useEffect(() => {
    const initJmri = async () => {
      jmriApi.on('ready', 'TrackMaster', handleJmriReady.bind(this));
      const isSetup = await jmriApi.setup(appConfig.jmri);
      setJmriInitialized(isSetup);
    }
    if (!jmriInitialized) {
      initJmri();
    }
  }, [jmriInitialized]);


  useEffect(() => {
    if (!sensorsInitialized && jmriReady && sensors && sensors.length > 0) {
      console.log('watchSensors', sensors);
      jmriApi.watchSensors([...sensors]);
      jmriApi.on('sensor', 'TrackMaster', handleSensor);
      setSensorsInitialized(true);
    }
  }, [jmriApi, jmriReady, sensorsInitialized, sensors]);


  // Event Handlers
  const handleJmriReady = isReady => {
    setJmriReady(isReady);
  }

  const handleSensor = ({ name, inverted, state }) =>{
    const setSignal = (action, actionState) => {
      if (actionState === 4) {
        api.signals.put({ 
          signalId: action.signalId, 
          state: actionState === 4 ? 1 :0 
        });
      }
      return action;
    }
    const sensor = sensors.find(sensor => sensor.pin == parseInt(name.substring(2)));
    sensor.HIGH.map(sensorAction => setSignal(sensorAction, state));
    sensor.LOW.map(sensorAction => setSignal(sensorAction, state));
  }

  const handleMenuClick = menuChange => {
    const m = {...menu, ...menuChange};
    setMenu(m);
  }

  const getRoutedModule = module => {
    switch(module) {
      case 'locos' :
        return (
          <Route path="/throttles" key={module} element={
            <Throttles jmriApi={jmriApi} />
          } />
        );
      case 'turnouts' :
        return (
          <Route path="/dispatcher" key={module} element={
            <Dispatcher view={state.userPreferences.turnoutView} />
          } />
        );
      // case 'signals' :
      //   return (
      //     <Route path="/signals" key={module} element={
      //       <Signals signals={signals} sensors={sensors} />
      //     } />
      //   )
      case 'effects' :
        return (
          <Route path="/effects" key={module} element={
            <Effects />
          } />
        )
    }
  }

  return (
    <MenuContext.Provider value={menu}>
        <Box display="flex" flexDirection="column" height="100%">
          <Box>
            <Header 
              handleMenuClick={handleMenuClick} 
              jmriApi={jmriApi}
              jmriReady={jmriReady}
              apiReady={apiReady}
            />
            
          </Box>
          <Box flexGrow={1} display="flex" width="100%" height="100%" alignContent="center" className="App-content" mt={1}>
            {apiReady && (<Routes>
              <Route path="/" exact element={<Conductor />} />
              <Route path="/pinout" exact element={<Pinout />} />
              {modules && modules.map(getRoutedModule)}
            </Routes>)}
          </Box>
          <Box mt={1}>

            <Footer modules={modules} />

          </Box>
        </Box>
      </MenuContext.Provider>
  );
}

export default TrackMaster;

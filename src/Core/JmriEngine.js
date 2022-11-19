import React, { useEffect, useState } from 'react';

import { getAppConfig } from '../config/config';
import jmriApi from '../Shared/jmri/jmriApi';

function JmriEngine(props) {

  const { onReady } = props;
  const [ init, setInit ] = useState(false);
  const appConfig = getAppConfig();

  // Initialize JMRI Websocket connection
  useEffect(() => {
    const initJmri = async () => {
      try {
        setInit(true);
        jmriApi.on('ready', 'TrackMaster', isReady => {
          onReady(isReady);
        });
        await jmriApi.setup(appConfig.jmri);
        console.log('JMRI Initialized');
      } catch (err) {
        setInit(false);
        console.error('api initialization error', err);
      }
    };
    !init && initJmri();
  }, [appConfig.jmri, onReady, init]);

  return (<></>);
}

JmriEngine.defaultProps = {
  onReady: () => { console.log('JMRI Ready'); }
}

export default JmriEngine;
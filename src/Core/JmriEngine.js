import React, { useEffect } from 'react';

import { getAppConfig } from '../config/config';
import jmriApi from '../Shared/jmri/jmriApi';

function JmriEngine(props) {

  const { onReady } = props;
  const appConfig = getAppConfig();

  // Initialize JMRI Websocket connection
  useEffect(() => {
    const initJmri = async () => {
      jmriApi.on('ready', 'TrackMaster', isReady => {
        onReady(isReady);
      });
      await jmriApi.setup(appConfig.jmri);
      console.log('JMRI Initialized');
    }
    initJmri();
  }, [appConfig.jmri,onReady ]);

  return (<></>);
}

JmriEngine.defaultProps = {
  onReady: () => { console.log('JMRI Ready'); }
}

export default JmriEngine;
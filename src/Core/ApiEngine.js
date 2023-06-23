import React, { useContext, useEffect, useState } from 'react';
import api from '../Api';
import { Context } from '../Store/Store';
import log from '../Shared/utils/logger';

function ApiEngine(props) {

  const { onReady } = props;
  const [ state, dispatch ] = useContext(Context);
  const [ init, setInit ] = useState(false);
  const { layoutId } = state;

  useEffect(() => {
    layoutId && onReady();
  }, [layoutId, onReady]);

  useEffect(() => {
    const initialize = async function() {
      try {
        setInit(true);
        await api.initializeWS(dispatch);
      } catch (err) {
        setInit(false);
        log.error('api initialization error', err);
      }
    };
    
    !init && initialize();
  }, [onReady, init, dispatch]);


  return (<></>);
}

ApiEngine.defaultProps = {
  onReady: () => { log.info('API Ready'); }
}

export default ApiEngine;
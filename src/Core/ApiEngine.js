import React, { useContext, useEffect } from 'react';
import api from '../Api';
import { Context } from '../Store/Store';

function ApiEngine(props) {

  const { onReady } = props;
  const [ , dispatch ] = useContext(Context);

  useEffect(() => {
    const initialize = async function() {
      try {
        const apiInitState = await api.initialize();
        await dispatch({ type: 'INIT_STATE', payload: apiInitState });
        console.log('API Initialized');
        onReady();
      } catch (err) {
        console.error('api initialization error', err);
      }
    };
    
    initialize();
  }, [dispatch, onReady]);

  return (<></>);
}

ApiEngine.defaultProps = {
  onReady: () => { console.log('API Ready'); }
}

export default ApiEngine;
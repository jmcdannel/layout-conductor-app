import React, { useContext, useEffect, useState } from 'react';
import api from '../Api';
import { Context } from '../Store/Store';

function ApiEngine(props) {

  const { onReady } = props;
  const [ , dispatch ] = useContext(Context);
  const [ init, setInit ] = useState(false);

  useEffect(() => {
    const initialize = async function() {
      try {
        setInit(true);
        const apiInitState = await api.initialize();
        await dispatch({ type: 'INIT_STATE', payload: apiInitState });
        console.log('API Initialized');
        onReady();
      } catch (err) {
        setInit(false);
        console.error('api initialization error', err);
      }
    };
    
    !init && initialize();
  }, [dispatch, onReady, init]);

  return (<></>);
}

ApiEngine.defaultProps = {
  onReady: () => { console.log('API Ready'); }
}

export default ApiEngine;
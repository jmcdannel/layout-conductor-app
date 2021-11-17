import * as Colors from '@mui/material/colors';
import blueLineImg from './Layout/images/IDAWANY-blueline.png';
import brownLineImg from './Layout/images/IDAWANY-brownline.png';
import greenLineImg from './Layout/images/IDAWANY-greenline.png';
import magentaLineImg from './Layout/images/IDAWANY-magentaline.png';
import orangeLineImg from './Layout/images/IDAWANY-orangeline.png';
import purpleLineImg from './Layout/images/IDAWANY-purpleline.png';
import redLineImg from './Layout/images/IDAWANY-redline.png';
import yellowLineImg from './Layout/images/IDAWANY-yellowline.png';
// import { getApi as getApiHostName, getConfig } from './config/config';
import { getAppConfig } from './config/config';

const appConfig = getAppConfig();

export const linesConfig = [
  { name: 'Red', color: Colors.red[500], img: redLineImg },
  { name: 'Green', color: Colors.green[500], img: greenLineImg },
  { name: 'Magenta', color: Colors.pink[500], img: magentaLineImg },
  { name: 'Yellow', color: Colors.yellow[500], img: yellowLineImg },
  { name: 'Orange', color: Colors.orange[500], img: orangeLineImg },
  { name: 'Blue', color: Colors.blue[500], img: blueLineImg },
  { name: 'Brown', color: Colors.brown[500], img: brownLineImg },
  { name: 'Purple', color: Colors.purple[500], img: purpleLineImg }
];

const locoDefaults = {
  isAcquired: false,
  cruiseControl: false,
  autoStop: true,
  speed: 0,
  forward: null
};

// const appConfig = getConfig();
// let apiHost = getApiHostName();

async function get(type = null, Id = null) {
  try {
    const response = type !== null
      ? Id !== null
        ? await fetch(`${appConfig.api}/${type}s/${Id}`)
        : await fetch(`${appConfig.api}/${type}s`)
      : await fetch(`${appConfig.api}/`);
    return response.json();
  } catch (err) {
    console.error(err);
    throw new Error('Unable to read', type, `Id=${Id}`);
  }
}

async function initialize() {
  const layoutConfig = await api.get();
  console.log('appConfig', appConfig);
  console.log('layoutConfig', layoutConfig);
  const getModules = layoutConfig.modules.reduce((reqs, module) => api[module] && api[module].get ? [...reqs, module] : [...reqs], []);
  console.log('getModules', getModules);
  const results = await Promise.all(
    getModules.map(req => api[req].get()
      .then(resp => api[req].initialize ? api[req].initialize(resp) : resp))
  );
  const initialState = getModules.reduce((state, module, index) => ({ ...state, [module]: results[index] }), {});
  return initialState
}

async function put(type, data) {
  try {
    const response = await fetch(`${appConfig.api}/${type}s/${data[`${type}Id`]}`, {
      method: 'PUT',
      cache: 'no-cache',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (err) {
    console.error(err)
    throw new Error('Unable to update', type, data);
  }
}

function initializeLocos(locos) {
  return locos.map(loco => ({...loco, ...locoDefaults }));
}

export const apiStates = {
  idle: 'idle',
  pending: 'pending',
  done: 'done',
  error: 'error'
}

export const api = {
  initialize,
  get,
  put,
  turnouts: {
    get: args => get('turnout', args),
    put: args => put('turnout', args)
  },
  // signals: {
  //   get: args => get('signal', args),
  //   put: args => put('signal', args)
  // },
  effects: {
    get: args => get('effect', args),
    put: args => put('effect', args)
  },
  locos: {
    get: args => get('loco', args),
    initialize: initializeLocos
  },
  sensors: {
    get: args => get('sensor', args)
  }
}

export default api;

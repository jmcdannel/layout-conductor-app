import { getAppConfig } from './config/config';
import log from './Shared/utils/logger';

const appConfig = getAppConfig();
const { layoutId } = appConfig;

let ws;
let dispatch;

const locoDefaults = {
  isAcquired: false,
  cruiseControl: false,
  autoStop: true,
  maxSpeed: 100,
  speed: 0,
  forward: true,
  lastAcquired: null,
  lastUpdated: null
};

function onOpen() {
  log.start('onOpen');
  ws.send(JSON.stringify({
    action: 'initialize', payload: { layoutId }
  }));
}

function onError(event) {
  log.error('Websocket error');
}

function onMessage(event) {
  try {
    reduceMessage(JSON.parse(event.data));
  } catch { 
    log.warn('Message not in JSON format.', event.data); 
  }
}

const reduceMessage = async ({ action, payload}) => {
  log.debug('reduceMessage', action);
  switch(action) {
    case 'initialize':
      await dispatch({ type: 'INIT_STATE', payload });
      log.start('WS Initialized');
      initializeModules(payload);
      break;
    case 'turnouts':
      await dispatch({ type: 'UPDATE_TURNOUTS', payload });
      break;
    case 'effects':
      await dispatch({ type: 'UPDATE_EFFECTS', payload });
      break;
    case 'locos':
      await dispatch({ type: 'UPDATE_LOCOS', payload });
      break;
    case 'routes':
      await dispatch({ type: 'UPDATE_ROUTES', payload });
      break;
    case 'message':
      log.debug(payload);
      break;
    default:
      log.warn('default message reducer', action);
      break;
  };
}

async function initializeWS(_dispatch) {
  dispatch = _dispatch;
  ws = new WebSocket(appConfig.api);
  ws.onerror = onError;
  ws.addEventListener('open', onOpen);   
  ws.addEventListener('message',  onMessage);
}

const initializeModules = layoutConfig => {
  const getModules = layoutConfig.modules.reduce((reqs, module) => api[module] && api[module].get ? [...reqs, module] : [...reqs], []);
  getModules.map(req => api[req].get());
}

// async function initialize() {
//   const layoutConfig = await api.get();
//   const getModules = layoutConfig.modules.reduce((reqs, module) => api[module] && api[module].get ? [...reqs, module] : [...reqs], []);
//   const results = await Promise.all(
//     getModules.map(req => api[req].get()
//       .then(resp => api[req].initialize ? api[req].initialize(resp) : resp))
//   );
//   const initialState = getModules.reduce((state, module, index) => ({ 
//     ...state, 
//     [module]: results[index] 
//   }), { modules: layoutConfig.modules, initialized: true });
//   return initialState;
// }

async function getWS(type = null, Id = null) {
  try {    
    ws.send(JSON.stringify({
      action: type || 'initialize', payload: { Id }
    }));
  } catch (err) {
    log.error('api.get', err);
    throw new Error('Unable to read', err, type, `Id=${Id}`);
  }
}

async function putWS(type, data, idField) {
  try {
    const Id = idField ? data[idField] : data[`${type}Id`];
    log.debug('putWS', {
      action: type, payload: { Id, data }
    });
    ws.send(JSON.stringify({
      action: type, payload: { Id, data }
    }));
  } catch (err) {
    log.error('api.put', err)
    throw new Error('Unable to update', err, type, data);
  }
}

function initializeLocos(locos) {
  return locos.map(loco => ({ ...locoDefaults, ...loco }));
}

export const apiStates = {
  idle: 'idle',
  pending: 'pending',
  done: 'done',
  error: 'error'
}

export const api = {
  // initialize,
  initializeWS,
  get: getWS,
  put: putWS,
  turnouts: {
    get: args => getWS('turnouts', args),
    put: args => putWS('turnouts', args)
  },
  effects: {
    get: args => getWS('effects', args),
    put: (...args) => putWS('effects', ...args)
  },
  locos: {
    get: args => getWS('locos', args, 'address'),
    put: args => putWS('locos', args, 'address'),
    initialize: initializeLocos
  },
  sensors: {
    get: args => getWS('sensors', args)
  },
  routes: {
    get: args => getWS('routes', args)
  }
}

export default api;

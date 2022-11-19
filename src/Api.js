import { getAppConfig } from './config/config';

const appConfig = getAppConfig();

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

async function initialize() {
  const layoutConfig = await api.get();
  const getModules = layoutConfig.modules.reduce((reqs, module) => api[module] && api[module].get ? [...reqs, module] : [...reqs], []);
  const results = await Promise.all(
    getModules.map(req => api[req].get()
      .then(resp => api[req].initialize ? api[req].initialize(resp) : resp))
  );
  const initialState = getModules.reduce((state, module, index) => ({ 
    ...state, 
    [module]: results[index] 
  }), { modules: layoutConfig.modules, initialized: true });
  return initialState;
}

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

async function put(type, data, idField) {
  try {
    const id = idField ? data[idField] : data[`${type}Id`];
    const response = await fetch(`${appConfig.api}/${type}s/${id}`, {
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
  return locos.map(loco => ({ ...locoDefaults, ...loco }));
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
  effects: {
    get: args => get('effect', args),
    put: args => put('effect', args)
  },
  locos: {
    get: args => get('loco', args, 'address'),
    put: args => put('loco', args, 'address'),
    initialize: initializeLocos
  },
  sensors: {
    get: args => get('sensor', args)
  },
  routes: {
    get: args => get('route', args)
  }
}

export default api;

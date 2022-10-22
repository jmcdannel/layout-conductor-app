import { apiStates } from '../Api';

export const initialState = {
  layout: null,
  userPreferences: {
    turnoutView: window.localStorage.getItem('turnoutView') || 'tiny'
  }
};

export default initialState;

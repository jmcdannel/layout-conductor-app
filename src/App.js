import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TrackMaster from './TrackMaster/TrackMaster';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import Store from './Store/Store';
import { BrowserRouter } from "react-router-dom";
import theme from './theme';
import './App.scss';

function App() {

  return (
    <MuiThemeProvider theme={theme}>
      <Store>
        <CssBaseline />
        <BrowserRouter>
          <TrackMaster />
        </BrowserRouter>
      </Store>
    </MuiThemeProvider>
  );
}

export default App;

import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import Conductor from '../Conductor/Conductor';
import Pinout from '../Settings/Pinout';
import Dispatcher from '../Dispatcher/Dispatcher';
import Throttles from '../Throttles/Throttles';
import Effects from '../Effects/Effects';
import { Context } from '../Store/Store';

function Modules(props) {

  const [ state ] = useContext(Context);
  const { modules } = state;

  const getRoutedModule = module => {
    switch(module) {
      case 'locos' :
        return (
          <Route path="/throttles" key={module} element={
            <Throttles />
          } />
        );
      case 'turnouts' :
        return (
          <Route path="/dispatcher" key={module} element={
            <Dispatcher view={state.userPreferences.turnoutView} />
          } />
        );
      case 'effects' :
        return (
          <Route path="/effects" key={module} element={
            <Effects />
          } />
        )
      default:
        return null;
    }
  }

  return modules ? (
    <Routes>
      <Route path="/" exact element={<Conductor />} />
      <Route path="/pinout" exact element={<Pinout />} />
      {modules.map(getRoutedModule)}
    </Routes>) : <></>;
}

export default Modules;
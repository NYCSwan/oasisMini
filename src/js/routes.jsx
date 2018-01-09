import React from 'react';
import { Router } from 'react-router-dom';
import history from './history';
import AppLayout from './app_layout.react';
import Auth from '../Auth/Auth';

const auth = new Auth();

export const makeMainRoutes = () => { // eslint-disable-line
  return ( // eslint-disable-line
    <Router history={history}>
      <AppLayout auth={auth} history={history} />
    </Router>
  )
}

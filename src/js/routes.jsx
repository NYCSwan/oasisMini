import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from './history';
import MonitorSubLayout from './monitor_sublayout.react';
import ControlSubLayout from './control_sublayout.react';
import PlantsSubLayout from './plants_sublayout.react';
import Callback from '../Callback/Callback.react';
import App from './app.react';
import Homepage from './Homepage.react';
import Auth from '../Auth/Auth';
import Tutorials from './tutorials.react';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => { // eslint-disable-line
  return ( // eslint-disable-line
    <Router history={history} >
      <main>
          <Route path="/" render={(props) => <App auth={auth} {...props} />}  />
          <Route path="/home" render={(props) => <Homepage auth={auth} {...props} />}  />
          <Route path="/monitor" render={(props) => <MonitorSubLayout auth={auth} {...props} />} />
          <Route path="/plants" render={(props) => <PlantsSubLayout auth={auth} {...props} />} />
          <Route path="/controls" render={(props) => <ControlSubLayout auth={auth} {...props} />} />
          <Route path="/tutorials" render={(props) => <Tutorials auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
                      handleAuthentication(props);
                      return <Callback {...props} /> }} />
      </main>
    </Router>
  )
}

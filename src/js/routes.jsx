import React from 'react';
import {  BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import history from './history';
import MonitorSubLayout from './monitor_sublayout.react';
import ControlSubLayout from './control_sublayout.react';
import PlantsSubLayout from './plants_sublayout.react';
import Callback from '../Callback/Callback.react';
import AppLayout from './app_layout.react';
import Auth from '../Auth/Auth';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const FourOhFour = () => <h1>404</h1>;

export const makeMainRoutes = () => { // eslint-disable-line
  return ( // eslint-disable-line
    <Router history={history} auth={auth}>
      <main>
        <Switch>
          <Route path="/" render={(props) => <AppLayout auth={auth} {...props} />}  />
          <Route path="/monitor" render={(props) => <MonitorSubLayout auth={auth} {...props} />} />
          <Route path="/plants" component={PlantsSubLayout} />
          <Route path="/controls" component={ControlSubLayout} />
          <Route path="/callback" render={(props) => {
                      handleAuthentication(props);
                      return <Callback {...props} /> }} />
          <Route component={FourOhFour} />
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

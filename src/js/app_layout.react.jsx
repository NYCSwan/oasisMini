import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';

import Homepage from './Homepage.react';
import App from './app.react';

const AppLayout = (props) => (
  <div className="app-sub-layout">
    <Switch>
      <Route path='/' exact component={App} />
      <Route path={`${props.match.path}/home`} component={Homepage} />
    </Switch>
  </div>
)


export default AppLayout;

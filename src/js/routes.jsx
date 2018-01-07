import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Callback from '../Callback/Callback.react';
import Auth from '../Auth/Auth';
import history from './history';
import App from './App.react';
import Preload from '../../data.json';
import Homepage from './Homepage.react';
import NewGrow from './new_grow.react';
import ExistingGrow from './existing_grow.react';
import Monitor from './monitor.react';
import Tutorials from './tutorials.react';
import Sensor from './sensor.react';
import Progress from './progress.react';
import ControlSettings from './control_settings.react';

const FourOhFour = () => <h1>404</h1>;
const auth = new Auth();

export const makeMainRoutes = () => { // eslint-disable-line
  return ( // eslint-disable-line
    <BrowserRouter history={history} component={App}>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Homepage auth={auth} {...props} />} />
          <Route
            path="/newgrow"
            render={(props) => <NewGrow auth={auth} {...props} />}
          />
          <Route
            path="/existinggrow"
            render={(props) => <ExistingGrow auth={auth} currentGrows={Preload.growing_plants} chambers={Preload.chambers} climates={Preload.climates} plantTypes={Preload.plantTypes} {...props} />}
          />
          <Route
            path="/controls"
            render={(props) => <ControlSettings auth={auth} currentGrows={Preload.growing_plants} chambers={Preload.chambers} climates={Preload.climates} plantTypes={Preload.plantTypes} {...props} />}
          />
          <Route
            path="/monitor"
            render={(props) => <Monitor auth={auth} sensorData={Preload.sensor_data} plants={Preload.growing_plants}
            chambers={Preload.chambers} {...props} />}
          />
          <Route
            path="/sensors/:id"
            render={(props) =>
              <Sensor auth={auth} sensorData={Preload.sensor_data} plants={Preload.growing_plants} {...props} />}
          />
          <Route
            path="/timeline"
            render={(props) =>
              <Progress auth={auth} currentGrows={Preload.growing_plants} chambers={Preload.plantTypes} {...props} />}
            />
          <Route path="/tutorials" render={Tutorials} />
          <Route render={FourOhFour} />
          <Route path="/callback" render={(props) => <Callback {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth.js';

import Preload from '../../data.json';
import Homepage from './Homepage.react';
import NewGrow from './new_grow.react';
import ExistingGrow from './existing_grow.react';
import Monitor from './monitor.react';
import Tutorials from './tutorials.react';
import Sensor from './sensor.react';
import Progress from './progress.react';
import ControlSettings from './control_settings.react';
import DirectionsContainer from './directions_container.react';

const FourOhFour = () => <h1>404</h1>;

const auth = new Auth();
// auth.login();

const App = () => (
  <BrowserRouter>
    <div className="appContainer">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route
          path="/newgrow"
          component={(props) => <NewGrow presets={Preload.plantTypes} chambers={Preload.chambers} climates={Preload.climates} {...props} />}
        />
        <Route
          path="/existinggrow"
          component={(props) => <ExistingGrow currentGrows={Preload.growing_plants} chambers={Preload.chambers} climates={Preload.climates} plantTypes={Preload.plantTypes} {...props} />}
        />
        <Route
          path="/controls"
          component={(props) => <ControlSettings currentGrows={Preload.growing_plants} chambers={Preload.chambers} climates={Preload.climates} plantTypes={Preload.plantTypes} {...props} />}
        />
        <Route
          path="/monitor"
          component={(props) => <Monitor sensorData={Preload.sensor_data} plants={Preload.growing_plants}
          chambers={Preload.chambers} {...props} />}
        />
        <Route
          path="/sensors/:id"
          component={(props) =>
            <Sensor sensorData={Preload.sensor_data} plants={Preload.growing_plants} {...props} />}
        />
        <Route
          path="/timeline"
          component={(props) =>
            <Progress currentGrows={Preload.growing_plants} chambers={Preload.plantTypes} {...props} />}
          />
        <Route path="/tutorials" component={Tutorials} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;

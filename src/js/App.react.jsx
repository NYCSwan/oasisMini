import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Preload from '../../data.json';
import Homepage from './Homepage.react';
import NewGrow from './new_grow.react';
import ExistingGrow from './existing_grow.react';
import Monitor from './monitor.react';
import Tutorials from './tutorials.react';
import Sensor from './sensor.react';

const FourOhFour = () => <h1>404</h1>;

const App = () => (
  <BrowserRouter>
    <div className="appContainer">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/newgrow" component={NewGrow} />
        <Route path="/existinggrow" component={ExistingGrow} />
        <Route
          path="/monitor"
          component={(props) => <Monitor sensor_data={Preload.sensor_data} plants={Preload.plants} {...props} />}
        />
        <Route
          path="/sensors/:id"
          component={(props) => {
            const selectedSensor = Preload.sensor_data;
            return <Sensor sensor={selectedSensor} plants={Preload.plants} {...props} />;
          }}
        />
        <Route path="/tutorials" component={Tutorials} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;

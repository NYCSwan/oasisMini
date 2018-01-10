import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Monitor from './monitor.react';
import Sensor from './sensor.react';

const MonitorSubLayout = (props) => (
  <div className="monitor-sub-layout">
      <Switch>
        <Route path='/monitor' exact component={Monitor} />
        <Route path={`${props.match.path}/:sensor_id`} component={Sensor} />
      </Switch>
  </div>
)

MonitorSubLayout.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string}).isRequired
}

export default MonitorSubLayout;

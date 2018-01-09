import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import NewGrow from './new_grow.react';
import ExistingGrow from './existing_grow.react';
import ControlSettings from './control_settings.react';

const ControlSubLayout = ({match}) => (
  <div className="monitor-sub-layout">
      <Switch>
        <Route path='/controls' exact component={ControlSettings} />
        <Route path={`${match.path}/newgrow`} component={NewGrow} />
        <Route path={`${match.path}/existinggrow`} component={ExistingGrow} />

      </Switch>
  </div>
)

ControlSubLayout.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ControlSubLayout;

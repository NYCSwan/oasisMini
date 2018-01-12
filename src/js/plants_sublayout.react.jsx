import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import PlantContainer from './plant_container.react';
import PlantList from './plant_list.react';

const PlantsSubLayout = (props) => (
  <div className="plant-sub-layout">
    <Switch>
      <Route path='/plants' exact component={PlantList} />
      <Route path={`${props.match.path}/:plant_id`} component={PlantContainer} />
    </Switch>
  </div>
)

PlantsSubLayout.propTypes = {
  match: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default PlantsSubLayout;

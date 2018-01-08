import React, { Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';

import { getPlantRecipeData } from '../utils/api_calls';
import SiteHeader from './Header.react';

class PlantContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object
    }).isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func,
      auth0: PropTypes.object
    }).isRequired,
  }

  state = {
    plant: []
  }

  componentDidMount() {
    console.log('componentDidMount plant container');
    this.getPlantRecipe();
  }

  shouldComponentUpdate(newState) {
    return this.state.plant !== newState.plant
  }

  getPlantRecipe = () => {
    console.log('get plant recipes, plant container');
    const plantId = this.props.match.params.id;

    getPlantRecipeData().then((plantRecipes) => {
      const tempPlant = []
      forEach(plantRecipes, (plant) => {
        // debugger;
        if (plant.r_id === plantId) {
          console.log(plant);
          tempPlant.push(plant);
          console.log(tempPlant);
          return tempPlant;
        }
        this.setState({ plant: tempPlant});
        return tempPlant;
      })
    })
  }

  render() {
    console.log('render plant container');
    const { plant } = this.state;
    const { auth, match } = this.props;

    return (
      <div>
        <SiteHeader title={plant.name} auth={auth} match={match} />

        <div className='plantType'>
          <img src={`${plant.sortname}.jpg`} alt={plant.ahortname} />
          <h2>{plant.name}</h2>
        </div>
      </div>
    )
  }
}

export default PlantContainer;

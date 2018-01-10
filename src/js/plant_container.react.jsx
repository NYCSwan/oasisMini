import React, { Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';

import { getPlantRecipeData } from '../utils/api_calls';

class PlantContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object
    }).isRequired
  }

  state = {
    plantTpes: []
  }

  componentDidMount() {
    console.log('componentDidMount plant container');
    this.getPlantRecipes();
  }

  shouldComponentUpdate(newState) {
    return this.state.plant !== newState.plant
  }

  getPlantRecipes = () => {
    console.log('get plant recipes, plant container');

    getPlantRecipeData().then((plantRecipes) => {
      this.setState({plantTpes: plantRecipes});
      return plantRecipes;
      })
    }

  setPlant = () => {
    const plantId = this.props.match.params.id;
    // const tempPlant = []
    debugger;
    forEach((this.state.plantRecipes), plant => {
          console.log(plant);
          return (plant.r_id === plantId)
        //   console.log(tempPlant);
          // return tempPlant;
    })
    // tempPlant.push(plant);
    // this.setState({ plant: tempPlant});
  }

  render() {
    console.log('render plant container');
    const { plant } = this.state;
debugger
    return (
      <div>
        <img src={`../public/img/${plant.shortname}.jpg`} alt={plant.shortname} />
        <div className='plantType'>
          <h2>{plant.name}</h2>
          <p>Yield: {plant.yield}</p>
          <p>Maturity: {plant.days_to_maturity}</p>
          <p>${plant.market_price}</p>
          <p>{plant.uses}</p>

        </div>
      </div>
    )
  }
}

export default PlantContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash/pickBy';

import { getPlantRecipeData } from '../utils/api_calls';

class PlantContainer extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object
    }).isRequired
  }

  state = {
    plantTypes: [],
    plant: ''
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
      this.setState({plantTypes: plantRecipes});
      // return plantRecipes;
      })
    }

  setPlant = () => {
    const plantId = this.props.match.params.id;
    // const tempPlant = []
    debugger
    this.setState({ plant: plantId });
  }

  render() {
    console.log('render plant container');
    const { plant, plantTypes } = this.state;

    const currentPlant = pickBy(plantTypes, (recipe) => {
      recipe.name === plant
    })

    return (
      <div>
        <img src={`../public/img/${currentPlant.shortname}.jpg`} alt={currentPlant.shortname} />
        <div className='plantType'>
          <h2>{currentPlant.name}</h2>
          <p>Yield: {currentPlant.yield}</p>
          <p>Maturity: {currentPlant.days_to_maturity}</p>
          <p>${currentPlant.market_price}</p>
          <p>{currentPlant.uses}</p>

        </div>
      </div>
    )
  }
}

export default PlantContainer;

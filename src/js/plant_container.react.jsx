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

    getPlantRecipeData().then((plantRecipes) => {
      this.setPlant(plantRecipes);
      return plantRecipes;
      })
    }

  setPlant = (plantRecipes) => {
    const plantId = this.props.match.params.id;
    // const tempPlant = []
    // debugger;
    forEach((plantRecipes), plant => {
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
          <p>{}</p>
          <p>{}</p>
          <p>{}</p>

        </div>
      </div>
    )
  }
}

export default PlantContainer;

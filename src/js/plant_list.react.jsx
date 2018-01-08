import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import { getPlantRecipeData } from '../utils/api_calls';
import SiteHeader from './Header.react';

class PlantList extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object
    }).isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func,
      auth0: PropTypes.object
    }).isRequired
  }

  state = {
    plantTypes: []
  }

  componentDidMount() {
    this.getPlantRecipes();
  }

  shouldComponentUpdate(newState, newProps) {
    return this.state.plantTypes !== newState.plantTypes || this.props.match !== newProps.match
  }

  getPlantRecipes = () => {
    console.log('get plant recipes, plant List');

    getPlantRecipeData().then((plantRecipes) => {
    console.log(plantRecipes);
    this.setState({ plantTypes: plantRecipes });
    });
  }

  render() {
    console.log('render plant list');
    const { plantTypes } = this.state;
    const { match, auth } = this.props;
    return (

      <div>
        <SiteHeader title='Plant List' auth={auth} match={match} {...this.props} />

        <div className='plantList'>
          <Grid>
            {plantTypes.map(plant => { // eslint-disable-line
               return (
                <Row key={plant.r_id}>
                  <Col>
                    <a href={`plant/${plant.r_id}`}>
                      {plant.name}
                    </a>
                  </Col>
                  <Col>{plant.days_to_maturity}</Col>
                  <Col>{plant.yield}</Col>
                </Row>
            )
            })}
          </Grid>
        </div>
      </div>
    )
  }

}

export default PlantList;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SiteHeader from './Header.react';

class DirectionsContainer extends Component {
  static propTypes = {
    sensorData: PropTypes.arrayOf(PropTypes.object).isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired,
    plants: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object
    }).isRequired
  }

  state = {
    // selectedPlant:

  }

  render() {
    return (
    <div className="directions container">
      <SiteHeader title="" match={this.props.match} />

        <Directions
          settings={this.state.settings}
          directions={this.state.directions}
          plant={this.state.selectedPlant}
          handleClick={this.updatePhBalance}
          isBalanced={this.state.isBalanced}
        />

      { (this.state.isBalanced === true)
        ?
        <Button
          onClick={this.showGrowDirections}>Next</Button>
        :
        null
      }
      { (this.state.showGrowDirections === true)
        ?
        <PlantingDirections
          directions={this.state.directions}
          isBalanced={this.state.isBalanced}
          handleClick={this.submitGrowChange}
          settings={this.state.settings}
        />
        :
        null
      }

    </div>
    )
  }
}

export default DirectionsContainer;

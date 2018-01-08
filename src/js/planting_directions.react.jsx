import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import SettingsList from './settings_list.react';

class PlantingDirections extends Component {
  static propTypes = {
    newGrowPlant: PropTypes.arrayOf(PropTypes.object).isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleClick: PropTypes.func.isRequired
  }
  // state = {
  //   displaySettings: []
  // }

  shouldComponentUpdate(newProps) {
     this.props.newGrowPlant !== newProps.newGrowPlant || this.props.climates !== newProps.climates
  }

  handleClickUpdate = (e) => {
    this.props.handleClick(e);
  }

  render() {
    console.log('render directions');
    const { newGrowPlant, climates } = this.props;
    const growingDirections = this.props.newGrowPlant
    ;
    // debugger
    return (
      <div className="directions container">
        <SettingsList
          climates={climates}
          newGrowPlant={newGrowPlant} />
        <div className="directions right" pullRight>
          <Grid>
              <Row key="growingDirections">
              <Col className="Futura-Lig" xs={5} md={6}> {growingDirections}</Col>
              </Row>
          </Grid>
          <a href="/" alt="Start Growing. Return to homepage">
            <Button
            className="balanced Futura-Lig">
              Start Growing!
            </Button>
          </a>
        </div>
      </div>
    )
  }
}

export default PlantingDirections;

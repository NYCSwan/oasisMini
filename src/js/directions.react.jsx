import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import findKey from 'lodash/findKey';

import SettingsList from './settings_list.react';

class Directions extends Component {
  static propTypes = {
    newGrowPlant: PropTypes.arrayOf(PropTypes.object).isRequired,
    climates: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleClick: PropTypes.func.isRequired,
    isBalanced: PropTypes.bool.isRequired,
    selectedChamber: PropTypes.string.isRequired
  }

  // state = {
  //   // balancing: false
  // }

  componentDidMount() {
    this.updateSettings();
  }

  shouldComponentUpdate(newProps, newState) {
    return this.props.newGrowPlant !== newProps.newGrowPlant || this.props.isBalanced !== newProps.isBalanced || this.state.displaySettings !== newState.displaySettings
  }

  handleClickUpdate = (e) => {
    this.props.handleClick(e);
  }

  render() {
    console.log('render directions');
    const { newGrowPlant, climates, selectedChamber } = this.props;

    const currKey = findKey(newGrowPlant);
    const directions = newGrowPlant[currKey].chamber_directions;
    // debugger;

    return (
      <div className="directions container">
        <SettingsList
          chamber={selectedChamber}
          climates={climates}
          newGrowPlant={newGrowPlant} />
        <div className="directions right" pullRight>
          <Grid>
              <Row key={1}>
                <Col className="Futura-Lig" xs={5} md={6}> {directions}</Col>
                <Col className="Futura-Lig" xs={5} md={6}>This may take about 5 minutes...</Col>
              </Row>
          </Grid>
          { (this.props.isBalanced === true)
            ?
            <img className="check_mark" alt="check mark pH is balanced!" src="../public/img/check_mark_icon.png" />
            :
            ''
          }
          <Button
            className="balanced Futura-Lig"
            onClick={this.handleClickUpdate}>
            { (this.props.isBalanced === true)
              ?
                "pH Balanced"
              :
                "pH Balance Water"
              }
          </Button>
        </div>
      </div>
    )
  }
}

export default Directions;

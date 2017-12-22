import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ListGroupContainer from './ListGroup.react';

class PlantingDirections extends Component {
  static propTypes = {
    settings: PropTypes.arrayOf(PropTypes.string).isRequired,
    directions: PropTypes.arrayOf(PropTypes.string).isRequired,
    // plant: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    isBalanced: PropTypes.bool.isRequired
  }
  // state = {
  //   displaySettings: []
  // }

  shouldComponentUpdate(newProps) {
    return this.props.isBalanced !== newProps.isBalanced
  }

  handleClickUpdate = (e) => {
    this.props.handleClick(e);
  }

  render() {
    console.log('render directions');
    const growingDirections = this.props.directions.slice(2);
    // debugger
    return (
      <div className="directions container">
        <div className="directions left">
          <ListGroupContainer
            items={this.props.settings} />
        </div>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ListGroupContainer from './ListGroup.react';

class Directions extends Component {
  static propTypes = {
    settings: PropTypes.arrayOf(PropTypes.string).isRequired,
    directions: PropTypes.arrayOf(PropTypes.string).isRequired,

    // plant: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  }
  state = {
    displaySettings: []
  }

  // shouldComponentUpdate(newProps) {
  //   return this.props.settings !== newProps.settings
  // }
  //
  // componentDidUpdate() {
  // }

  handleClickUpdate = (e) => {
    this.props.handleClick(e);
  }


  render() {
    console.log('render directions');
    const balanceMessage = "pH Balance Water";

    return (
      <div className="directions container">
        <ListGroupContainer
        items={this.props.settings} />
        <Grid>
        { this.props.directions.map(direction => {
          return (
            <Row key={direction}>
            <Col className="Fig-Ligura" xs={5} md={6}> {direction}</Col>
            </Row>
          )
        })}
        </Grid>
        <Button
          className="balanced"
          onClick={this.handleClickUpdate}>
          {balanceMessage}
        </Button>
      </div>
    )
  }
}

export default Directions;

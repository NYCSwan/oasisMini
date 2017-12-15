import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ListGroupContainer from './ListGroup.react';

class Directions extends Component {
  static propTypes = {
    settings: PropTypes.arrayOf(PropTypes.string).isRequired,
    plant: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  }
  handleClickUpdate = (e) => {
    this.props.handleClick(e);
  }
  render() {
    const balanceMessage = "pH Balance Water";

    return (
      <div className="directions container">
      <ListGroupContainer
      items={this.props.settings} />
      <Grid>
      { this.props.settings.map(setting => {
        debugger
        return (
          <Row>
          <Col xs={5} md={6}> {setting} </Col>
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

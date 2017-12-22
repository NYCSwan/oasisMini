import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import ListGroupContainer from './ListGroup.react';

class Directions extends Component {
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
    return this.props.settings !== newProps.settings || this.props.isBalanced !== newProps.isBalanced
  }
  //
  // componentDidUpdate() {
  // }

  handleClickUpdate = (e) => {
    this.props.handleClick(e);
  }

  render() {
    console.log('render directions');
    const phDirections = this.props.directions.slice(0,2);

    return (
      <div className="directions container">
        <div className="directions left">
          <ListGroupContainer
            items={this.props.settings} />
        </div>
        <div className="directions right" pullRight>
          <Grid>
          { phDirections.map(direction => { // eslint-disable-line
            return (
              <Row key={direction}>
              <Col className="Futura-Lig" xs={5} md={6}> {direction}</Col>
              </Row>
            )
          })}
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

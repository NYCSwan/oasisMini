import React, { Component } from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';
import { Row, Col } from 'react-bootstrap';

import Header from './Header.react';
import LineGraph from '../D3/lineGraph';
import FilterButtonGroup from './filter_button.react';


class Sensor extends Component {
    state = {
        chamberId: '2',
        graphWidth: 300,
        graphHeight: 200,
        optionsForFilter: [1,2,3]
    }

    handleChamberIdChange = (newChamber) => {
      console.log('handleChamberIdChange')
      let tempChamber = ''
      if (newChamber == null) {
        tempChamber = '1'
      } else {
        tempChamber = newChamber.toString();
      }

      this.setState({
        chamberId: tempChamber
       })
    }

      render() {
        const { sensorData, plants } = this.props;
        const plantName = upperFirst(plants[1].name);
        const today = new Date(2017,8,4);
        const yesterday = new Date(today - (1000*60*60*24*1));
        const oneWeekAgo = new Date(today - (1000*60*60*24*7));
        const full = new Date(today - (1000*60*60*24*8));
        const startedOnMonth = new Date(today - (1000*60*60*24*7)).toLocaleString("en-us", {month: "long"});
        const startedOnDay = new Date(today - (1000*60*60*24*7)).getDay();
        return (
          <div className="sensor container">
            <Header title={upperFirst(this.props.match.params.id)} />
            <div className="filter">
              <FilterButtonGroup
                onChange={this.handleChamberIdChange} chamberId={this.state.chamberId}
                options={this.state.optionsForFilter}/>
            </div>
            <div className="graph-detail container">
              <LineGraph
                chamberId={this.state.chamberId}
                sensorData={sensorData}
                sensor={this.props.match.params.id}
                graphHeight={this.state.graphHeight}
                graphWidth={this.state.graphWidth}
                endDate={today}
                startDate={yesterday}
                match={this.props.match}
              />
              <LineGraph
                chamberId={this.state.chamberId}
                sensorData={sensorData}
                sensor={this.props.match.params.id}
                graphHeight={this.state.graphHeight}
                graphWidth={this.state.graphWidth}
                endDate={today}
                startDate={oneWeekAgo}
                match={this.props.match}
              />
              <LineGraph
                chamberId={this.state.chamberId}
                sensorData={sensorData}
                sensor={this.props.match.params.id}
                graphHeight={this.state.graphHeight}
                graphWidth={this.state.graphWidth}
                endDate={today}
                startDate={full}
                match={this.props.match}
              />
            </div>
            <Row className="bottom container readings">
              <Col className="startedOn half-circle" xs={4} sm={4} md={4}>
                <h4> Started</h4>
                <h4>{startedOnMonth.toString()} {startedOnDay.toString()}</h4>
              </Col>
          </Row>
        </div>
      );
  }
};

Sensor.propTypes = {
  sensorData: PropTypes.arrayOf(PropTypes.object).isRequired,
  plants: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
}

export default Sensor;

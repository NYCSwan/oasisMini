import React, { Component } from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

import Header from './Header.react';

{/* import filter from 'lodash/filter'; */}


class Sensor extends Component {
    state = {
        chamberId: '2'
    };

    handleChamberChange = (event) => {
      this.setState({ chamberId: event.target.value });
    };

      render() {
        const { sensor, plants } = this.props;
        const { title } = this.props.match.params.id;
        const plantName = upperFirst(plants[1].name);

        return (
          <div className="sensor container">
            <Header title={title}/>
            <h1> {plantName} </h1>
            <div className="filter">
              <input
                value={this.state.chamberId}
                onChange={this.handleChamberChange}
                type="text"
                placeholder="chamber id"
              />
            </div>
            {/* this.props.data
              .filter(data => `${chamberId}`.indexOf(this.state.chamberId) >= 0)
              .map(data => <Graph key={data.id} id={data.id} sensor={data.humidity} />) */}
            <div className="graph-detail container">
              <h3 className={`${sensor} chamber${this.state.chamberId}`}>data:{sensor}</h3>
              <h4>{this.props.startDate}-{this.props.endDate}</h4>
            </div>
            {/*
            <Graph data={data} title={title} startDate={new Date()} endDate={new Date()}/>
            */}
          </div>
      );
  }
};

{/*  data: PropTypes.string.isRequired, */}
Sensor.propTypes = {
  id: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  plants: PropTypes.shape({
    chamberId: PropTypes.string.isRequired,
    plant: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.string.isRequired
  }).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired


}

export default Sensor;

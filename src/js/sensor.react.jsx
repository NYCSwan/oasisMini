import React, { Component } from 'react';
import PropTypes from 'prop-types';
import upperFirst from 'lodash/upperFirst';

import Header from './Header.react';
import Graph from './graph.react';

class Sensor extends Component {
    state = {
        chamber_id: '2'
    };

    handleChamberChange = (event) => {
    this.setState({ chamber_id: event.target.value });
  };

      render() {
        const { humidity, temperate, water, height } = props.sensor;
        const { chamber_id, name } = props.plants;
        const { title } = props.match.params.id;
        const plantByChamber = props.plants.filter(plant => (plant.chamber_id === this.state.chamber_id));

        return (
          <div className="sensor container">
            <Header />
            <h1>{ upperFirst(title) }</h1>
            <div className="filter">
              <input
                value={this.state.chamber_id}
                onChange={this.handleChamberChange}
                type="text"
                placeholder="chamber id"
              />
            </div>
            <h3>Humidity (%)</h3>
            {props.data
              .filter(data => `${data.chamber_id}`.indexOf(this.state.chamber_id) >= 0)
              .map(data => <Graph key={data.id} id={data.id} sensor={data.humidity} />)}
            <div className="graph-detail container">
              <h3 className={props.id}>data:{props.sensor}</h3>
              <h4>{props.startDate}-{props.endDate}</h4>
            </div>
            {/*
            <Graph data={data} title={title} startDate={new Date()} endDate={new Date()}/>
            */}
          </div>
      );
  }
};

Sensor.propTypes = {
  data: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired


}

export default Sensor;

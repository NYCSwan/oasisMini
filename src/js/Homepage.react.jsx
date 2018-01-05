import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import SiteHeader from './Header.react';

class Homepage extends Component {
  state = {
    users: []
  }

  handleOpen = () => {
   fetch('/api/v1/sensor_measurements', {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
    }
   }).then(res => res.json())
     .then(users => this.setState({ users }));
  }
  render() {
    return (

      <div>
      <SiteHeader title="Homepage" match={this.props.match} />

      <div>
      <p> Notifications would appear here. </p>
      <div
      className="monitorOrGrow container"
      >
      <Button
      bsStyle="primary"
      className="homepage link Futura-Lig"
      href="/monitor">
      Monitor Your Garden
      </Button>
      <Button
      bsStyle="primary"
      className="homepage link Futura-Lig" href="/monitor"
      >
      Grow Something
      </Button>
      </div>
      <Button
      onClick={this.handleOpen}>Test API</Button>
      { (this.state.users.length !== 0 )
        ?
        <p>api called! check response of call to users in Network Tab in F12</p>
        :
        <p>api not yet called</p>
      }
      </div>

      </div>
    )
  }
}

Homepage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
}

export default Homepage;

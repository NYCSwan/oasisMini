import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import SiteHeader from './Header.react';

class Homepage extends Component {
  static propTypes = {
    auth: PropTypes.objectOf(PropTypes.func).isRequired
  }

  // state = {
  //   users: []
  // }

  // get data from db with axios
  handleOpen = () => {
   fetch('/api/v1/sensor_measurements', {
    method: 'GET',
    headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json',
    }
  }).then(res => res.json())
  // .then(this.setState({ data: res }));
  }

  login = () => {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (

      <div>
        <SiteHeader title="Homepage" auth={this.props.auth} match={this.props.match} />

        {isAuthenticated() && (
          <div>
            <p> Notifications would appear here. </p>
            <div className="monitorOrGrow container">
              <Button
                bsStyle="primary"
                className="homepage link Futura-Lig"
                href="/monitor">
                Monitor Your Garden
              </Button>
              <Button
                bsStyle="primary"
                className="homepage link Futura-Lig" href="/monitor">
                Grow Something
              </Button>
            </div>
          </div>

        )}
        {!isAuthenticated() && (
          <h2>
            You are not logged in! Please
            <Button onClick={this.login}>
              Log In
            </Button>
                 to continue.
          </h2>
        )}
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

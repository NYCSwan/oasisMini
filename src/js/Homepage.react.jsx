import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import SiteHeader from './Header.react';
import GrowContainer from './grow_container.react';

class Homepage extends Component {
  state = {
    showGrowOptions: false,
    showMonitor: true
  }

  shouldComponentUpdate(newState) {
    return this.state.showGrowOptions !== newState.showGrowOptions || this.state.showMonitor !== newState.showMonitor
  }

  handleGrowClick = () => {
    console.log('handle click homepage');
    this.setState({
      showGrowOptions: true,
      showMonitor: false
    })
  }

  render() {
    return (

      <div>
        <SiteHeader title="Homepage"/>
        { (this.state.showMonitor === true)
          ?
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
              className="homepage link Futura-Lig" href="#"
              onClick={this.handleGrowClick}>
              Grow Something
              </Button>
            </div>
          </div>
          :
          null
        }
        { this.state.showGrowOptions === true
          ?
          <GrowContainer />
          :
          null
        }
      </div>
    )
  }
};

export default Homepage;

import React, { Component} from 'react';
import PropTypes from 'prop-types';

import SiteHeader from './Header.react';
import GrowContainer from './grow_container.react';

class ControlSettings extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      path: PropTypes.string
    }).isRequired
  }

  state = {
    showGrowOptions: true
  }

  shouldComponentUpdate(newState) {
    return this.state.showGrowOptions !== newState.showGrowOptions || this.state.showMonitor !== newState.showMonitor
  }

  // handleGrowClick = () => {
  //   console.log('handle click homepage');
  //   this.setState({
  //     showGrowOptions: true,
  //     showMonitor: false
  //   })
  // }
  render() {
    return (
      <div>
        <SiteHeader title="Controller Settings" match={this.props.match}/>
      { (this.state.showGrowOptions === true)
        ?
        <GrowContainer />
        :
        null
      }
      </div>
    )
  }
}

export default ControlSettings;

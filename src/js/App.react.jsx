import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SiteHeader from './Header.react';
// const FourOhFour = () => <h1>404</h1>;

// const auth = new Auth();
//
// const handleAuthentication = (nextState) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     auth.handleAuthentication();
//   }
// }

class App extends Component {
  static propTypes = {
    auth: PropTypes.objectOf(PropTypes.object).isRequired,
    history: PropTypes.objectOf(PropTypes.object).isRequired,
  }
  goTo = (route) => {
    this.props.history.replace(`/${route}`);
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
   // const { isAuthenticated } = this.props.auth;

    return (
      <div className="appContainer">
        <SiteHeader />
      </div>
    )
  }
}
export default App;

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
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func,
      auth0: PropTypes.object,
      login: PropTypes.func,
      logout: PropTypes.func
    }).isRequired,
    history: PropTypes.objectOf(PropTypes.object).isRequired,
    match: PropTypes.arrayOf(PropTypes.object).isRequired
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
        <SiteHeader title="" auth={this.props.auth} match={this.props.match}/>
      </div>
    )
  }
}
export default App;

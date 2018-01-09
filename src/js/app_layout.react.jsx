import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// import { Router, Route } from 'react-router-dom';
// import { withRouter } from 'react-router';
// import history from './history';
// import HomePage from './Homepage.react';
import SiteHeader from './Header.react';
import HomePage from './Homepage.react';

// import MonitorSubLayout from './monitor_sublayout.react';
// import ControlSubLayout from './control_sublayout.react';
// import PlantsSubLayout from './plants_sublayout.react';
// import Callback from '../Callback/Callback.react';
// import Auth from '../Auth/Auth';

// const auth = new Auth();

class AppLayout extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func,
      auth0: PropTypes.object,
      login: PropTypes.func,
      logout: PropTypes.func
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func,
      length: PropTypes.number,
      action: PropTypes.string}).isRequired,
    match: PropTypes.arrayOf(PropTypes.array).isRequired
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
   const {match, auth} = this.props;

      // const handleAuthentication = ({location}) => {
      //   if (/access_token|id_token|error/.test(location.hash)) {
      //     auth.handleAuthentication();
      //   }
      // }

    return (
        <div className="appContainer">
          <SiteHeader title="" auth={auth} match={match} {...this.props} />
          {
               !auth.isAuthenticated() && (
                 <div className="appLayout">
                   <Button
                     id="qsLoginBtn"
                     bsStyle="info"
                     className="btn-margin"
                     onClick={this.login}
                   >
                     Log In
                   </Button>
                   <HomePage {...this.props} />
                 </div>
                )
             }
             {
               auth.isAuthenticated() && (
                   <Button
                     id="qsLogoutBtn"
                     bsStyle="info"
                     className="btn-margin"
                     onClick={this.logout}
                   >
                     Log Out
                   </Button>
                 )
             }
        </div>
    )
  }
}
// const AppLayoutWithRouter = withRouter(AppLayout);

export default AppLayout;

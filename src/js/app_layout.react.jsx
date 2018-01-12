import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './Homepage.react';
import SiteHeader from './Header.react';
import MonitorSubLayout from './monitor_sublayout.react';
import ControlSubLayout from './control_sublayout.react';
import PlantsSubLayout from './plants_sublayout.react';
import Callback from '../Callback/Callback.react';

const FourOhFour = () => <h1>404</h1>;

class AppLayout extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.func,
      auth0: PropTypes.object,
      login: PropTypes.func,
      logout: PropTypes.func
    }).isRequired,
    history: PropTypes.shape({
      length: PropTypes.number,
      action: PropTypes.string}).isRequired,
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
   const { auth, match, history } = this.props;

   const handleAuthentication = ({location}) => {
     if (/access_token|id_token|error/.test(location.hash)) {
       auth.handleAuthentication();
     }
   }

    return (
      <div className="appContainer">
        <SiteHeader title="" auth={auth} match={match} history={history} />
        <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/monitor" component={MonitorSubLayout} />
          <Route path="/plants" component={PlantsSubLayout} />
          <Route path="/controls" component={ControlSubLayout} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
          <Redirect to="/" />
        </Switch>
        </main>
      </div>
    )
  }
}
export default AppLayout;

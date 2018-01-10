import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PagerBack from './pagerBack.react';

class App extends Component {
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
      action: PropTypes.string,
      isAuthenticated: PropTypes.func
    }).isRequired,
    match: PropTypes.shape({
      path: PropTypes.string}).isRequired
  }

    handleSelect = (eventKey) => {
      console.log(`selected ${eventKey}`);
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
    const { match } = this.props;
    const {isAuthenticated } = this.props.auth;

      return (
         <div>
         <Navbar inverse collapseOnSelect fluid className="container-fluid">
           <Navbar.Header>
                 <Navbar.Brand className={`brandLogo ${match.path}`} id="navbarbrand">
                   <Link to="/" href="/" className="logo img-responsive center-block" />
                    <div className='backImage'>
                      <PagerBack
                        className="header"/>
                    </div>
                 </Navbar.Brand>
             <Navbar.Toggle />
           </Navbar.Header>
           <Navbar.Collapse className="bs-navbar-collapse">
             <Nav bsStyle="pills" pullRight onSelect={this.handleSelect}>
               <NavItem className="navItem" eventKey={3} href="/monitor">Monitor</NavItem>
               <NavItem className="navItem" eventKey={4} href="/controls">Controls</NavItem>
               <NavItem className="navItem" eventKey={1} href="#">My Account</NavItem>
               <NavItem className="navItem" eventKey={2} href="#">Support</NavItem>
             </Nav>
           </Navbar.Collapse>
           <Nav>
             <h1 className="title Futura-Lig">title</h1>
             {
               !isAuthenticated() && (
                   <Button
                     id="qsLoginBtn"
                     bsStyle="primary"
                     className="btn-margin"
                     onClick={this.login}
                   >
                     Log In
                   </Button>
                 )
             }
             {
               isAuthenticated() && (
                   <Button
                     id="qsLogoutBtn"
                     bsStyle="primary"
                     className="btn-margin"
                     onClick={this.logout}
                   >
                     Log Out
                   </Button>
                 )
             }
           </Nav>
         </Navbar>
         </div>
       )
     }
}

export default App;

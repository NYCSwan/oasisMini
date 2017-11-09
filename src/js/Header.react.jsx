import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class SiteHeader extends Component {

  handleSelect = (selectedKey) => {
    console.log(`selected: ${selectedKey}`);
  }

  render() {
    return (
      <div>
        <Navbar inverse className="fixed-top">
          <Navbar.Header>
            <Navbar.Brand>
            <NavItem href="/">
              <img
                src='./public/img/logo.png'
                className="logo img-responsive center-block"
                alt="logo" />
            </NavItem>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Nav
          bsStyle="tabs"
          activeKey={1}
          className="header"
          onSelect={this.handleSelect} >
            <NavItem
              eventKey={1}
              width={64}
              height={64}
              href='#'>
              <img
                src='./public/img/Support_Button.png'
                responsive
                className="img-responsive"
                alt="support for your system"/>
            </NavItem>
            <NavItem
              eventKey={2}
              width={64}
              height={64}
              href="#">
              <img
                src='./public/img/My_Account_Button.png'
                responsive
                className="img-responsive"
                alt="my account information"/>
            </NavItem>
          </Nav>

        </div>
      );
    }
};

export default SiteHeader;

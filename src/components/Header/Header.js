/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';

import {
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import Navbar, { Brand } from 'react-bootstrap/lib/Navbar';
import $ from 'jquery';
import Sidebar from '../Sidebar';

const logo = require('./logo.png');

function toggleMenu() {
  if ($('.navbar-collapse').hasClass('collapse')) {
    $('.navbar-collapse').removeClass('collapse');
  } else {
    $('.navbar-collapse').addClass('collapse');
  }
}

class Header extends Component {
  render() {
    return (
      <div id="wrapper" className="content">
        <Navbar className="navbar-inverse" fluid style={{ margin: 0 }}>
          <Brand>
            <span>
              <img
                src={logo} alt="Tidal Wave Prediction Online Tool"
                title="Tidal Wave Prediction Online Tool"
              />
              <span>&nbsp;Tidal Wave Prediction Online Tool </span>
              <button
                type="button" className="navbar-toggle" onClick={() => { toggleMenu(); }}
                style={{ position: 'absolute', right: 0, top: 0 }}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </span>
          </Brand>
          <ul className="nav navbar-top-links navbar-right">

            <NavDropdown
              title={<span><i className="fa fa-tasks fa-fw" />
              </span>} id="navDropdown2222"
            >
              <MenuItem eventKey="1" style={{ width: 300 }}>
                <div>
                  <p><strong>Prediction Chart 1</strong></p>
                </div>
                <div>
                  <p><span className="text-muted">
                  Galway Bay, 09-11-16</span> </p>
                </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="2">
                <div>
                  <p><strong>Prediction Chart 3</strong></p>
                </div>
                <div>
                  <span className="text-muted">
                  Kinsale Harbour, 12-11-16</span>
                </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="3">
                <div>
                  <p><strong>Prediction Chart 3</strong></p>
                </div>
                <div>
                  <span className="text-muted">
                  Killybegs, 01-12-16</span>
                </div>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">
                <div>
                  <p><strong>Prediction Chart 4</strong></p>
                </div>
                <div>
                  <span className="text-muted">
                  Galway Bay, 22-01-17</span>
                </div>
              </MenuItem>
            </NavDropdown>
            <NavDropdown title={<i className="fa fa-user fa-fw" />} id="navDropdown4">
              <MenuItem eventKey="1">
                <span> <i className="fa fa-user fa-fw" /> User Profile </span>
              </MenuItem>
              <MenuItem eventKey="2">
                <span><i className="fa fa-gear fa-fw" /> Settings </span>
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4" >
                <button className="btn btn-danger" onClick={() => this.logOut()}>
                  <span><i className="fa fa-sign-out fa-fw" /> Logout </span>
                </button>
              </MenuItem>
            </NavDropdown>
          </ul>
          <Sidebar />
        </Navbar>
      </div>
    );
  }
}

export default Header;

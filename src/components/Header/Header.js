import React from 'react';
import Navbar, { Brand } from 'react-bootstrap/lib/Navbar';
import $ from 'jquery';
import history from '../../core/history';
import { login, logout, isLoggedIn } from '../../utils/AuthService';
import Sidebar from '../Sidebar';

const logo = require('./logo.png');

function toggleMenu() {
  if ($('.navbar-collapse').hasClass('collapse')) {
    $('.navbar-collapse').removeClass('collapse');
  } else {
    $('.navbar-collapse').addClass('collapse');
  }
}
const style = {
  verticleAlign: 'middle',
};

function Header() {
  // render() {
  return (
    <div id="wrapper" className="content">
      <Navbar className="navbar-inverse" fluid style={{ margin: 0 }}>
        <Brand>
          <span>
            <img
              src={logo} alt="Tidal Wave Prediction Online Tool"
              title="Tidal Wave Prediction Online Tool"
            />
            <a href="" onClick={(e) => { e.preventDefault(); history.push('/landing'); }}>
            &nbsp;Tidal Wave Prediction Online Tool </a>
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
        <ul className="nav  navbar-right">
          <li style={style} >
            {
              (isLoggedIn()) ? (<button
                className="btn btn-danger log"
                onClick={() => logout()}
              >Log out </button>) :
               (<button className="btn btn-info log" onClick={() => login()}>Log In</button>)
            }
          </li>
        </ul>
        <Sidebar />
      </Navbar>
    </div>
  );
  // }
}

export default Header;

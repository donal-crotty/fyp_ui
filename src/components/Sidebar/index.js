import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import history from '../../core/history';
import { isLoggedIn } from '../../utils/AuthService';

const isDisabled = {
  color: 'currentColor',
  cursor: 'not-allowed',
  opacity: 0.5,
  textDecoration: 'none',
};

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true,
    };
  }

  render() {
    return (
      <div className="navbar-default sidebar" style={{ marginLeft: '-20px' }} role="navigation">
        <div className="sidebar-nav navbar-collapse collapse">
          {
          (isLoggedIn()) ? (<ul className="nav in" id="side-menu">
            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/'); }} >
                <i className="fa fa-dashboard fa-fw" /> &nbsp;Dashboard
              </a>
            </li>
            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/upload'); }} >
                <i className="fa fa-upload fa-fw" /> &nbsp;Upload Data
              </a>
            </li>
            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/prediction'); }} >
                <i className="fa fa-bar-chart fa-fw" /> &nbsp;Prediction Charting
              </a>
            </li>
            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/about'); }} >
                <i className="fa fa-info fa-fw" /> &nbsp;About
              </a>
            </li>
          </ul>
        )
        : (<ul className="nav in" id="side-menu">
          <li>
            <a href="" onClick={(e) => { e.preventDefault(); history.push('/'); }} >
              <i className="fa fa-dashboard fa-fw" /> &nbsp;Dashboard
            </a>
          </li>
          <li style={isDisabled}>
            <a>
              <i className="fa fa-upload fa-fw" /> &nbsp;Upload Data
            </a>
          </li>
          <li style={isDisabled}>
            <a>
              <i className="fa fa-bar-chart fa-fw" /> &nbsp;Prediction Charting
            </a>
          </li>
          <li>
            <a href="" onClick={(e) => { e.preventDefault(); history.push('/about'); }} >
              <i className="fa fa-info fa-fw" /> &nbsp;About
            </a>
          </li>
          <li><Alert bsStyle="danger">
            Please Login to Access all Features
            </Alert>
          </li>
        </ul>
        )
      }
        </div>
      </div>
    );
  }
}


export default Sidebar;

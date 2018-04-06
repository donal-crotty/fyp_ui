import React, { Component } from 'react';
import history from '../../core/history';
import { isLoggedIn } from '../../utils/AuthService';

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
          <ul className="nav in" id="side-menu">
            <li className="sidebar-search">
              <div className="input-group custom-search-form">
                <input type="text" className="form-control" placeholder="Search..." />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <i className="fa fa-search" />
                  </button>
                </span>
              </div>
            </li>
            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/'); }} >
                <i className="fa fa-dashboard fa-fw" /> &nbsp;Dashboard
              </a>
            </li>
            {
              (isLoggedIn()) ? (<li>
                <a href="" onClick={(e) => { e.preventDefault(); history.push('/upload'); }} >
                  <i className="fa fa-upload fa-fw" /> &nbsp;Upload Data
                </a>
              </li>)
              : null
            }
            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/prediction'); }} >
                <i className="fa fa-bar-chart fa-fw" /> &nbsp;Prediction Charting
              </a>
            </li>
            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/contact'); }} >
                <i className="fa fa-address-card-o fa-fw" /> &nbsp;Contact
              </a>
            </li>
            <li>
              <a href="" onClick={(e) => { e.preventDefault(); history.push('/about'); }} >
                <i className="fa fa-info fa-fw" /> &nbsp;About
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


export default Sidebar;

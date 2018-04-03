import React, { Component } from 'react';
import {
    Panel,
  } from 'react-bootstrap';
// import ReactHighcharts from 'react-highcharts';
import ColumnView from './column';
import Dropdown from '../DropdownSelect';

class chartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Panel
          header={<span>
            <i className="fa fa-bar-chart-o fa-fw" /> Tidal Wave Predictions
          </span>}
        >
          <div>
            <ColumnView />
          </div>
        </Panel>
        <Dropdown />
      </div>
    );
  }
}


export default chartView;

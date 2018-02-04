import React, { Component } from 'react';
import {
    Panel,
  } from 'react-bootstrap';
// import ReactHighcharts from 'react-highcharts';
import ColumnView from './column';
import DatePicker from '../DatePicker';

class chartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Panel
        header={<span>
          <i className="fa fa-bar-chart-o fa-fw" /> Tidal Wave Predictions
                    <div className="pull-right">
                      <DatePicker />
                    </div>
        </span>}
      >
        <div>
          <ColumnView />
        </div>
      </Panel>
    );
  }
}


export default chartView;

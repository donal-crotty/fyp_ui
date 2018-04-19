import React, { Component } from 'react';

// import ReactHighcharts from 'react-highcharts';
import ChartView from './chart';

class chartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <ChartView />
      </div>
    );
  }
}


export default chartView;

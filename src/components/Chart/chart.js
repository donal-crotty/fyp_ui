import React, { Component } from 'react';
import { compose, prop, uniq, map, filter, equals } from 'ramda';
// import { connect } from 'react-redux';
import {
  Panel,
} from 'react-bootstrap';
import ReactHighcharts from 'react-highcharts';

class chartView extends Component {
  state = {
    dates: '',
    ballyGlass: '',
    ballyCotton: '',
    aranmore: '',
    arklow: '',
    achillIsland: '',
  }
  componentDidMount() {
    fetch('http://localhost:5000/api/tidalprediction/', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    }).then((response) => response.json()).then((result) => {
      const dates = compose(uniq, map(prop('date')))(result);
      this.setState({ dates });
      const ballyGlass = compose(map(prop('water_Level')), filter((x) =>
                            equals(x.stationLocation, 'Ballyglass')))(result);
      this.setState({ ballyGlass });
      const ballyCotton = compose(map(prop('water_Level')), filter((x) =>
                              equals(x.stationLocation, 'Ballycotton')))(result);
      this.setState({ ballyCotton });
      const aranmore = compose(map(prop('water_Level')), filter((x) =>
                              equals(x.stationLocation, 'Aranmore')))(result);
      this.setState({ aranmore });
      const arklow = compose(map(prop('water_Level')), filter((x) =>
                              equals(x.stationLocation, 'Arklow')))(result);
      this.setState({ arklow });
      const achillIsland = compose(map(prop('water_Level')), filter((x) =>
                                equals(x.stationLocation, 'Achill_Island')))(result);
      this.setState({ achillIsland });
    });
  }
  renderChart() {
    return {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Tidal Wave Predictions January 2018',
      },
      subtitle: {
        text: 'Column Chart',
      },
      xAxis: {
        categories: this.state.dates,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Tidal Wave Height (m)',
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (ReactHighcharts.theme && ReactHighcharts.theme.textColor) || 'gray',
          },
        },
      },
      series: [
        {
          name: 'Aranmore',
          data: this.state.aranmore,
        },
        {
          name: 'Achill Island',
          data: this.state.achillIsland,
        },
        {
          name: 'Arklow',
          data: this.state.arklow,
        },
        {
          name: 'Ballycotton',
          data: this.state.ballyCotton,
        },
        {
          name: 'Ballyglass',
          data: this.state.ballyGlass,
        },
      ],
    };
  }
  renderAreaChart() {
    return {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Tidal Wave Predictions January 2018',
      },
      subtitle: {
        text: 'Area Chart',
      },
      xAxis: {
        categories: this.state.dates,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Tidal Wave Height (m)',
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (ReactHighcharts.theme && ReactHighcharts.theme.textColor) || 'gray',
          },
        },
      },
      series: [
        {
          name: 'Aranmore',
          data: this.state.aranmore,
        },
        {
          name: 'Achill Island',
          data: this.state.achillIsland,
        },
        {
          name: 'Arklow',
          data: this.state.arklow,
        },
        {
          name: 'Ballycotton',
          data: this.state.ballyCotton,
        },
        {
          name: 'Ballyglass',
          data: this.state.ballyGlass,
        },
      ],
    };
  }
  renderSplineComparisonChart() {
    return {
      chart: {
        type: 'spline',
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1,
        },
      },
      title: {
        text: 'Tidal Wave Predictions January 2018',
      },
      subtitle: {
        text: 'Spline Chart',
      },
      xAxis: {
        categories: this.state.dates,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Tidal Wave Height (m)',
        },
        minorGridLineWidth: 0,
        gridLineWidth: 0,
        alternateGridColor: null,
        plotBands: [{ // Low Tidal Wave
          from: -0.5,
          to: 1.6,
          color: 'rgba(235, 244, 179, 0.1)',
          label: {
            text: 'Low Tide',
            style: {
              color: '#606060',
            },
          },
        }, { // Medium Tidal Wave
          from: 1.6,
          to: 3.25,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            text: 'Medium Tide',
            style: {
              color: '#606060',
            },
          },
        },
        { // High Tidal Wave
          from: 3.25,
          to: 10.0,
          color: 'rgba(49, 230, 58, 0.1)',
          label: {
            text: 'High Tide',
            style: {
              color: '#606060',
            },
          },
        },
        ],
      },
      plotOptions: {
        spline: {
          lineWidth: 4,
          states: {
            hover: {
              lineWidth: 5,
            },
          },
          marker: {
            enabled: false,
          },
        },
      },
      series: [
        {
          name: 'Aranmore',
          data: this.state.aranmore,
        },
        {
          name: 'Achill Island',
          data: this.state.achillIsland,
        },
        {
          name: 'Arklow',
          data: this.state.arklow,
        },
        {
          name: 'Ballycotton',
          data: this.state.ballyCotton,
        },
        {
          name: 'Ballyglass',
          data: this.state.ballyGlass,
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <Panel
              header={<span>
                <i className="fa fa-line-chart fa-fw" /> Tidal Wave Height Indicator
              </span>}
            >
              <div>
                <ReactHighcharts config={this.renderSplineComparisonChart()} />
              </div>
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Panel
              header={<span>
                <i className="fa fa-area-chart fa-fw" /> Tidal Wave Predictions Area Chart
            </span>}
            >
              <div>
                <ReactHighcharts config={this.renderAreaChart()} />
              </div>
            </Panel>
          </div>
          <div className="col-lg-6">
            <Panel
              header={<span>
                <i className="fa fa-bar-chart-o fa-fw" /> Tidal Wave Predictions Column Chart
            </span>}
            >
              <div>
                <ReactHighcharts config={this.renderChart()} />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

// function mapStateToProps({ ModalSettingsState }) {
//   return {
//     ModalSettingsState: ModalSettingsState,
//   };
// }
// export default connect(mapStateToProps, null)(columnView);
export default chartView;

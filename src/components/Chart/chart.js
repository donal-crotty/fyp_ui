import React, { Component } from 'react';
import { compose, prop, uniq, map, filter, equals } from 'ramda';
// import { connect } from 'react-redux';
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

  render() {
    return (
      <div>
        <ReactHighcharts config={this.renderChart()} />
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

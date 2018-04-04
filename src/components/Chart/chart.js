import React, { Component } from 'react';
import { compose, groupBy, prop, of, unnest, toPairs } from 'ramda';
// import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts';

let chartData = [];

class chartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData,
    };
  }

//   componentWillReceiveProps(nextProps) {
//     if (!isEmpty(nextProps.ModalSettingsState)) {
//         this.setState({ title: nextProps.ModalSettingsState.title }),
//         this.setState({ titleColor: nextProps.ModalSettingsState.colorSelectedTitle }),
//         this.setState({ titleStyle: nextProps.ModalSettingsState.selectedTitleStyle }),
//         this.setState({ titleSize: nextProps.ModalSettingsState.selectedTitleSize }),
//         this.setState({ subtitle: nextProps.ModalSettingsState.subtitle }),
//         this.setState({ subtitleColor: nextProps.ModalSettingsState.colorSelectedSubtitle }),
//         this.setState({ subtitleStyle: nextProps.ModalSettingsState.selectedSubtitleStyle }),
//         this.setState({ subtitleSize: nextProps.ModalSettingsState.selectedsubTitleSize }),
//         this.setState({ xAxis: nextProps.ModalSettingsState.xAxis }),
//         this.setState({ yAxis: nextProps.ModalSettingsState.yAxis }),
//         this.setState({ chartColor: nextProps.ModalSettingsState.colorSelectedChart }),
//         this.setState({ backgroundColor: nextProps.ModalSettingsState.colorSelectedBackground }),
//         this.setState({ chartType: nextProps.ModalSettingsState.selectedChartType })
//     }
//   }
  componentDidMount() {
    fetch('http://localhost:5000/api/tidalprediction/', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    }).then((response) => response.json()).then((result) => {
      debugger;
      const test = compose(of, groupBy(prop('stationLocation')))(result);
      console.log(JSON.stringify(result));
      chartData = result;
      // console.log('chartData:', chartData);

      // [{
      //   date: dd-mm-yyy,
      //   name: "Arklow",
      //   data: [1,2,23,3]
      // }]
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
        categories: ['Achill Island', 'Aranmore', 'Arklow', 'Ballycotton', 'Ballyglass'],
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
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (ReactHighcharts.theme && ReactHighcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false,
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: (ReactHighcharts.theme && ReactHighcharts.theme.dataLabelsColor) || 'white',
          },
        },
      },
      series: [
        {
          data: chartData,
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

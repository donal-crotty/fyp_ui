import React, { Component } from 'react';
// import { connect } from 'react-redux';
import ReactHighcharts from 'react-highcharts';

let chartInfo = [];

class columnView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartInfo: [],
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
  // componentDidMount() {
  //   fetch('http://localhost:5000/api/tidalprediction/')
  //   .then(results => results.json()).then(data => {
  //     const chartData = data.results.map((pred) => (
  //       <div key={pred.results}>
  //         <div>{ pred.StationLocation }</div>
  //       </div>
  //       ));
  //     this.setState({ chartInfo: chartData });
  //     console.log('state', this.state.chartData);
  //     console.log(this.state.chartInfo);
  //   });
  // }

  send() {
    fetch('http://localhost:5000/api/tidalprediction/', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    }).then((response) => response.json()).then((result) => {
      console.log(JSON.stringify(result));
      chartInfo = result;
      console.log('chartInfo:', chartInfo);
    });
  }

  renderChart() {
    return {
      title: {
        text: this.state.title,
        style: {
          color: this.state.titleColor,
          fontWeight: this.state.titleStyle,
          fontSize: this.state.titleSize,
        },
      },
      subtitle: {
        text: this.state.subtitle,
        style: {
          color: this.state.subtitleColor,
          fontWeight: this.state.subtitleStyle,
          fontSize: this.state.subtitleSize,
        },
      },
      chart: {
        type: this.state.chartType,
        backgroundColor: this.state.backgroundColor,
      },
      xAxis: {
        categories: ['1', '2', '3', '4', '5'],
        title: {
          text: this.state.xAxis,
          style: {
            color: this.state.titleColor,
          },
        },
      },
      yAxis: {
        title: {
          text: this.state.yAxis,
          style: {
            color: this.state.subtitleColor,
          },
        },
      },
      // series: [{
      //   name: 'Achill_Island',
      //   data: [1.34, 1.56, 1.76,
      //     1.245, 0.89, 2.13, 0.945],
      //   color: this.state.chartColor,
      // }, {
      //   name: 'Aranmore',
      //   data: [1.12, 2.56, 1.496,
      //     1.316, 1.89, 2.09, 0.78],
      //   color: this.state.chartColor,
      // },
      // {
      //   name: 'Arklow',
      //   data: [1.56, 2.01, 1.13,
      //     1.456, 1.74, 2.5, 0.45],
      //   color: this.state.chartColor,
      // },
      // {
      //   name: 'Ballycotton',
      //   data: [1.145, 2.78, 1.156,
      //     1.47, 1.785, 2.45, 0.71],
      //   color: this.state.chartColor,
      // },
      // {
      //   name: 'Ballyglass',
      //   data: [2.12, 4.56, 2.496,
      //     1.316, 2.89, 3.09, 1.78],
      //   color: this.state.chartColor,
      // }],
      series: [
        {
          name: 'Tide1',
          data: chartInfo[0],
        },
        {
          name: 'Tide2',
          data: chartInfo[1],
        },
        {
          name: 'Tide3',
          data: chartInfo[2],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <ReactHighcharts config={this.renderChart()} />
        <div config={this.send()} />
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
export default columnView;

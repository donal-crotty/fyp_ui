
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Panel, PageHeader, ListGroup, ListGroupItem,
} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { userActions } from '../../actions/user.actions';
import GeoLocation from '../../components/GeoLocation';
import s from './Dashboard.css';
import history from '../../core/history';
import StationsMap from '../../components/StationsMap';


const title = 'Dashboard';

class Dashboard extends Component {
  constructor(props, context) {
    super();
    context.setTitle(title);
  }
  // componentDidMount() {
  //   this.props.dispatch(userActions.getAll());
  // }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <PageHeader>Dashboard</PageHeader>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-4">
            <Panel
              header={<span>
                <i className="fa fa-location-arrow fa-fw" /> Your nearest Stations are:
                </span>}
            >
              <StationsMap />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </Panel>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-2">
            <Panel
              header={<span>
                <i className="fa fa-location-arrow fa-fw" /> Your Current Location is:
                  </span>}
            >
              <div>
                <GeoLocation />
              </div>
            </Panel>
          </div>
          <div className="col-lg-4">
            <Panel
              header={<span>
                <i className="fa fa-bar-chart fa-fw" /> Chart Demos
                </span>}
            >
              <p><span className="text-muted">
                    Supplied by <a href="https://www.highcharts.com/demo/" target="_blank" rel="noopener noreferrer">Highcharts.com</a></span></p>
              <ListGroup>
                <ListGroupItem href="https://www.highcharts.com/demo/bar-basic" target="_blank" rel="noopener noreferrer">
                  <div>
                    <p><strong>Bar Chart</strong></p>
                  </div>
                </ListGroupItem>
                <ListGroupItem href="https://www.highcharts.com/demo/pie-basic" target="_blank" rel="noopener noreferrer">
                  <div>
                    <p><strong>Pie Chart</strong></p>
                  </div>
                </ListGroupItem>
                <ListGroupItem href="https://www.highcharts.com/demo/scatter" target="_blank" rel="noopener noreferrer">
                  <div>
                    <p><strong>Scatter and Bubble Charts</strong></p>
                  </div>
                </ListGroupItem>
                <ListGroupItem href="https://www.highcharts.com/demo/3d-column-interactive" target="_blank" rel="noopener noreferrer">
                  <div>
                    <p><strong>3D Chart</strong></p>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}


Dashboard.propTypes = {
  // news: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   link: PropTypes.string.isRequired,
  //   contentSnippet: PropTypes.string,0
  // })).isRequired,
};
Dashboard.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Dashboard);

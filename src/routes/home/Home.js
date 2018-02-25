
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
import s from './Home.css';
import history from '../../core/history';
import StationsMap from '../../components/StationsMap';


const title = 'Tidal Prediction App';

class Home extends Component {
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
          <div className="col-lg-8 col-md-6">
            <Panel
              header={<span>
                <i className="fa fa-location-arrow fa-fw" /> Your Current Location is:
                  </span>}
            >
              <div>
                <GeoLocation />
              </div>
            </Panel>
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
          <div className="col-lg-4">
            <Panel
              header={<span>
                <i className="fa fa-bar-chart fa-fw" /> Prediction Chart History
                </span>}
            >
              <ListGroup>
                <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                  <div>
                    <p><strong>Prediction Chart 1</strong></p>
                  </div>
                  <div>
                    <p><span className="text-muted">
                    Galway Bay, 09-11-16</span> </p>
                  </div>
                  <span className="pull-right text-muted small"><em>43 minutes ago</em></span>
                </ListGroupItem>
                <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                  <div>
                    <p><strong>Prediction Chart 2</strong></p>
                  </div>
                  <div>
                    <p><span className="text-muted">
                    Kinsale Harbour, 12-11-16</span></p>
                  </div>
                  <span className="pull-right text-muted small"><em>11:32 AM</em></span>
                </ListGroupItem>
                <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                  <div>
                    <p><strong>Prediction Chart 3</strong></p>
                  </div>
                  <div>
                    <p><span className="text-muted">
                    Kinsale Harbour, 12-11-16</span></p>
                  </div>
                  <span className="pull-right text-muted small"><em>11:13 AM</em></span>
                </ListGroupItem>
                <ListGroupItem href="" onClick={(e) => { e.preventDefault(); }}>
                  <div>
                    <p><strong>Prediction Chart 4</strong></p>
                  </div>
                  <div>
                    <p><span className="text-muted">
                    Killybegs, 01-12-16</span></p>
                  </div>
                  <span className="pull-right text-muted small"><em>10:57 AM</em></span>
                </ListGroupItem>
                <ListGroupItem>
                  <a
                    href=""
                    onClick={(e) => { e.preventDefault(); history.push('/chartHistory'); }}
                  >
                      &nbsp;View All Charts
                    </a>
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}


Home.propTypes = {
  // news: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   link: PropTypes.string.isRequired,
  //   contentSnippet: PropTypes.string,
  // })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);

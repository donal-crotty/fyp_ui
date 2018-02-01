

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Panel, PageHeader, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import GeoLocation from '../../components/GeoLocation';

import s from './Home.css';
import history from '../../core/history';

const title = 'Tidal Prediction App';

function Home(props, context) {
  context.setTitle(title);
  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <PageHeader>Dashboard</PageHeader>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <Panel
            header={<span>
              <i className="fa fa-location-arrow fa-fw" /> Current Location
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
                  <p><strong>Prediction Chart 3</strong></p>
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
                  <p><strong>Prediction Chart 3</strong></p>
                </div>
                <div>
                  <p><span className="text-muted">
                  Killybegs, 01-12-16</span></p>
                </div>
                <span className="pull-right text-muted small"><em>10:57 AM</em></span>
              </ListGroupItem>
              <ListGroupItem>
                <a href="" onClick={(e) => { e.preventDefault(); history.push('/chartHistory'); }} >
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

Home.propTypes = {
  // news: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   link: PropTypes.string.isRequired,
  //   contentSnippet: PropTypes.string,
  // })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);

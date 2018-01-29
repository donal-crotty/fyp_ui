

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  MenuItem,
  DropdownButton,
  Panel, PageHeader, ListGroup, ListGroupItem,
} from 'react-bootstrap';


import s from './Home.css';
import history from '../../core/history';

import {
  Tooltip,
  XAxis, YAxis,
  CartesianGrid, Bar, BarChart,
  ResponsiveContainer } from '../../vendor/recharts';

const title = 'Tidal Prediction App';


const data = [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, value: 600 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, value: 300 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, value: 500 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, value: 400 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, value: 200 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, value: 700 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, value: 100 },
];

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
              <i className="fa fa-bar-chart-o fa-fw" /> Bar Chart Example
              <div className="pull-right">
                <DropdownButton title="Dropdown" bsSize="xs" pullRight id="dropdownButton2">
                  <MenuItem eventKey="1">Action</MenuItem>
                  <MenuItem eventKey="2">Another action</MenuItem>
                  <MenuItem eventKey="3">Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="4">Separated link</MenuItem>
                </DropdownButton>
              </div>
            </span>}
          >
            <div>
              <ResponsiveContainer width="100%" aspect={2}>
                <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pv" stackId="1" fill="#8884d8" />
                  <Bar dataKey="uv" stackId="1" fill="#82ca9d" />
                  <Bar type="monotone" dataKey="amt" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
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

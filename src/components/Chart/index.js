import React from 'react';
import {
    MenuItem,
    DropdownButton,
    Panel,
  } from 'react-bootstrap';
import {
    Tooltip,
    XAxis, YAxis, Area,
    CartesianGrid, AreaChart,
    ResponsiveContainer } from '../../vendor/recharts';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, value: 600 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, value: 300 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, value: 500 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, value: 400 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, value: 200 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, value: 700 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, value: 100 },
];
function Chart() {
  return (
    <Panel
      header={<span>
        <i className="fa fa-bar-chart-o fa-fw" /> Area Chart Example
                  <div className="pull-right">
                    <DropdownButton title="Dropdown" bsSize="xs" pullRight id="dropdownButton1" >
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
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

export default Chart;

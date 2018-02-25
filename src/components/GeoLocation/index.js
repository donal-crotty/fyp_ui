import React, { Component } from 'react';
import Geolocation from 'react-geolocation';
import { Breadcrumb } from 'react-bootstrap';

class geoLocation extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <Geolocation
        onSuccess={console.log}
        render={({
          // fetchingPosition,
          position: { coords: { latitude, longitude } = {} } = {},
          error,
          getCurrentPosition,
        }) =>
          <div onLoad={getCurrentPosition}>
            {error &&
              <div>
                {error.message}
              </div>}
            <Breadcrumb>
              <b>latitude:</b> {latitude}
            </Breadcrumb>
            <hr />
            <Breadcrumb>
              <b>longitude:</b> {longitude}
            </Breadcrumb>
          </div>}
      />
    );
  }
}
export default geoLocation;


// AIzaSyBxTFxWYofVC1OjCwxDlTUjTtdYh-EGzd0

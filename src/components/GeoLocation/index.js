import React from 'react';
import Geolocation from 'react-geolocation';
import { Breadcrumb } from 'react-bootstrap';

function geoLocation() {
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

export default geoLocation;


// AIzaSyBxTFxWYofVC1OjCwxDlTUjTtdYh-EGzd0

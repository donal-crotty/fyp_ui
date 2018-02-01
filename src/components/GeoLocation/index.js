import React from 'react';
import Geolocation from 'react-geolocation';

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
        <div>
          <button className="btn btn-primary" onClick={getCurrentPosition}>Get Position</button>
          {error &&
            <div>
              {error.message}
            </div>}
          <p>
            <b>latitude:</b> {latitude}
          </p>
          <hr />
          <p>
            <b>longitude:</b> {longitude}
          </p>
        </div>}
    />
  );
}

export default geoLocation;

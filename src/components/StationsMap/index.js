import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        className={'map'}
        initialCenter={{
          lat: 53.989718599999996,
          lng: -7.3633319,
        }}
        zoom={6}
      >
        <Marker
          title={'Achill_Island'}
          name={'Achill_Island'}
          position={{ lng: -10.101596, lat: 53.95219 }}
        />
        <Marker
          title={'Aranmore'}
          name={'Aranmore'}
          position={{ lng: -8.49562, lat: 54.9896 }}
        />
        <Marker
          title={'Arklow'}
          name={'Arklow'}
          position={{ lng: -6.1166053, lat: 52.779964 }}
        />
        <Marker
          title={'Ballycotton'}
          name={'Ballycotton'}
          position={{ lng: -8.0007, lat: 51.82776 }}
        />
        <Marker
          title={'Ballyglass'}
          name={'Ballyglass'}
          position={{ lng: -9.89, lat: 54.253 }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBxTFxWYofVC1OjCwxDlTUjTtdYh-EGzd0',
})(MapContainer);

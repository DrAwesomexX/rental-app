import React from 'react';
import MapGeocode from '../../map/GoogleMaps';
const config = require('./../../../configF/dev.js');

class RentalMap extends React.Component {
  render() {
    const location = this.props.location;
    return (
      <MapGeocode
        isMarkerShown
        googleMapURL={config.g_api}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}
export default RentalMap;

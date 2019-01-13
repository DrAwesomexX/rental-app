import React from 'react';
import { Cacher } from './../../services/cacher.js';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow
} from 'react-google-maps';

const MapComponent = props => {
  const { coordinates, isError, isLocationLoaded } = props;
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={coordinates}
      center={coordinates}
      options={{ disableDefaultUI: isError ? true : false }}
    >
      {isLocationLoaded && !isError && (
        <Circle center={coordinates} radius={500} />
      )}
      {isLocationLoaded && isError && (
        <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
          <div>
            Oooppss, there is problem to find the location on the map, we are
            trying to rsolve the issue
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
function withGeocode(WrappedComponent) {
  return class extends React.Component {
    constructor() {
      super();

      this.Cacher = new Cacher();

      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: true
      };
    }
    componentWillMount() {
      this.geoCodeLocation();
    }

    updateState(coordinates) {
      this.setState({
        coordinates,
        isLocationLoaded: true
      });
    }

    geoLocation(location) {
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === 'OK') {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
            debugger;
            this.Cacher.cacheValue(location, coordinates);

            resolve(coordinates);
          } else {
            reject('Error');
          }
        });
      });
    }
    geoCodeLocation() {
      // const location = 'fkfdgfklfdgdfkg';
      const location = this.props.location;

      if (this.Cacher.isValueCached(location)) {
        this.updateState(this.Cacher.getCachedValue(location));
      } else {
        this.geoLocation(location).then(
          coordinates => {
            this.updateState(coordinates);
          },
          error => {
            this.setState({
              isLocationLoaded: true,
              isError: true
            });
          }
        );
      }
    }
    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}

const MapGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));
export default MapGeocode;

//////////////////////////for future reference////////

// import React from 'react';
// import { Cacher } from './../../services/cacher.js';

// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker,
//   Circle
// } from 'react-google-maps';

// const MapComponent = props => {
//   const { coordinates } = props;
//   return (
//     <GoogleMap
//       defaultZoom={13}
//       defaultCenter={coordinates}
//       center={coordinates}
//     >
//       {<Circle center={coordinates} radius={500} />}
//     </GoogleMap>
//   );
// };
// function withGeocode(WrappedComponent) {
//   return class extends React.Component {
//     constructor() {
//       super();
//       debugger;
//       this.Cacher = new Cacher();

//       this.state = {
//         coordinates: {
//           lat: 0,
//           lng: 0
//         }
//       };
//     }
//     componentWillMount() {
//       this.geoCodeLocation();
//     }

//     geoLocation(location){
//       const geocoder = new window.google.maps.Geocoder();
//     }
//     geoCodeLocation() {
//       const location = this.props.location;

//       if (this.Cacher.isValueCached(location)) {
//         this.setState({ coordinates: this.Cacher.getCachedValue(location) });
//       } else {
//         geocoder.geocode({ address: location }, (result, status) => {
//           if (status === 'OK') {
//             const geometry = result[0].geometry.location;
//             const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
//             debugger;
//             this.Cacher.cacheValue(location, coordinates);

//             this.setState({
//               coordinates
//             });
//           }
//         });
//       }
//     }
//     render() {
//       return <WrappedComponent {...this.state} />;
//     }
//   };
// }

// const MapGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));
// export default MapGeocode;

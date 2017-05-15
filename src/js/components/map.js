'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import {fitBounds} from 'google-map-react/utils';

// assets
import '../../scss/map.scss';


const Marker = ({text}) => {
  return <div>{text}</div>;
};

const config = {
  GOOGLE_MAP: GOOGLE.MAP,
  ZOOM: parseInt(GOOGLE.ZOOM)
};

const getCorners = (locations) => {
  let minLat = null;
  let minLng = null;
  let maxLat = null;
  let maxLng = null;

  locations.forEach((location) => {
    let geo = location.object.geolocation;

    if (minLat === null || geo.latitude < minLat) { minLat = geo.latitude; }
    if (maxLat === null || geo.latitude > maxLat) { maxLat = geo.latitude; }
    if (minLng === null || geo.longitude < minLng) { minLng = geo.longitude; }
    if (maxLng === null || geo.longitude > maxLng) { maxLng = geo.longitude; }
  });

  return {ne: {lat: maxLat, lng: maxLng}, sw: {lat: minLat, lng: minLng}};
};

export default class Map extends React.Component {
  static get propTypes() {
    return {
      locations: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.object.isRequired,
        now: PropTypes.object.isRequired,
        object: PropTypes.object.isRequired
      }))
    };
  }

  render() {
    let center = {lat: 0, lng: 0};
    let zoom = config.ZOOM;
    let locations = this.props.locations;
    let markers = locations.map((location) => {
      let obj = location.object;

      return (
        <Marker
          lat={obj.geolocation.latitude}
          lng={obj.geolocation.longitude}
          text={obj.name}
          key={obj.objectId}
        />
      );
    });

    if (locations.length > 1) {
      let fb = fitBounds(getCorners(locations), {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight});
      center = fb.center;
      zoom = fb.zoom;
    } else if (locations.length === 1) {
      center = {lat: locations[0].object.geolocation.latitude, lng: locations[0].object.geolocation.longitude};
    }

    return (
      <section className="map">
        <GoogleMap
          bootstrapURLKeys={{
            key: config.GOOGLE_MAP
          }}
          center={center}
          zoom={zoom}
        >
          {markers}
        </GoogleMap>
      </section>
    );
  }
};

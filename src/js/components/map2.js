'use strict';

// libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import MarkerClusterer from 'gmaps-marker-clusterer';

// assets
import '../../scss/map.scss'

const Marker = ({text}) => {
  return <div>{text}</div>;
};

const getCornersCenter = (locations) => {
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

  console.log(maxLat, minLat, locations.length);

  return {
    ne: {lat: maxLat, lng: maxLng},
    sw: {lat: minLat, lng: minLng},
    center: {
      lat: (maxLat + minLat) / 2,
      lng: (maxLng + minLng) / 2
    }};
};

export default class Map extends Component {
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
    let locations = this.props.locations;
    let center = getCornersCenter(locations).center;
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

    console.log(center);

    GoogleMapsLoader.KEY = GOOGLE.MAP;
    GoogleMapsLoader.load(function(google) {
      new google.maps.Map(document.getElementById('map-container'),
        {
          center: center,
          zoom: 11
        });
    });

    return (
      <div id="map-container" className="map">
      </div>
    );
  }
}

'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapsLoader from 'google-maps';
import MarkerClusterer from 'marker-clusterer-plus-es2015';
import {fitBounds} from 'google-map-react/utils';

// assets
import '../../scss/map.scss';
import '../../img/cluster.svg';
import '../../img/pin-on.svg';
import '../../img/pin-off.svg';

// components
import InfoPanel from './infopanel';

const config = {
  GOOGLE_MAP: GOOGLE.MAP,
  ZOOM: parseInt(GOOGLE.ZOOM)
};

const clusterSytles = [
  {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: 'img/cluster.svg'
  }, {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: 'img/cluster.svg'
  }, {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: 'img/cluster.svg'
  }, {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: 'img/cluster.svg'
  }, {
    anchorText: [-3, 0],
    height: 60,
    width: 46,
    url: 'img/cluster.svg'
  }
];

const getCorners = (locations) => {
  let minLat = null;
  let minLng = null;
  let maxLat = null;
  let maxLng = null;

  locations.forEach((location) => {
    let geo = location.object.geolocation;

    try {
      if (minLat === null || geo.latitude < minLat) { minLat = geo.latitude; }
      if (maxLat === null || geo.latitude > maxLat) { maxLat = geo.latitude; }
      if (minLng === null || geo.longitude < minLng) { minLng = geo.longitude; }
      if (maxLng === null || geo.longitude > maxLng) { maxLng = geo.longitude; }
    } catch(e) {
      if (process.env !== 'production') { console.log('Location missing geolocation: ', location); }
    }
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

  mapLoader(id, locations) {
    let center = {lat: 0, lng: 0};
    let zoom = config.ZOOM;

    function onMarkerClick(e) {
      console.log(this.mapLoader);
    }

    if (locations.length > 0) {
      let fb = fitBounds(getCorners(locations), {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight});
      center = fb.center;
      zoom = fb.zoom;
    }

    return (google) => {
      let markers = [];
      let markerCluster;
      const mapOptions = {
        center: center,
        zoom: zoom,
        minZoom: 10
      };
      const clusterOptions = {
        styles: clusterSytles
      };
      const markerStyle = {
        url: 'img/pin-off.svg',
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 40)
      };

      const map = new google.maps.Map(document.getElementById(id), mapOptions);

      locations.forEach((location) => {
        let obj = location.object;

        try {
          let marker = new google.maps.Marker({
            position: {lat: obj.geolocation.latitude, lng: obj.geolocation.longitude},
            icon: markerStyle
          });

          marker.addListener('click', onMarkerClick);
          markers.push(marker);
        } catch (e) {
          if (process.env !== 'production') { console.log('Location missing geolocation: ', location); }
        }
      });

      markerCluster = new MarkerClusterer(map, markers, clusterOptions);
    };
  };

  render() {
    let locations = this.props.locations;
    let infoPanels = locations.map(location => {
      return (
        <InfoPanel location={location} key={location.object.objectId} />
      );
    });

    GoogleMapsLoader.KEY = config.GOOGLE_MAP;
    GoogleMapsLoader.load(this.mapLoader('map-view', locations));

    return (
      <section className="map-container">
        <div id="map-view" className="map"></div>
        {infoPanels}
      </section>
    );
  }
};

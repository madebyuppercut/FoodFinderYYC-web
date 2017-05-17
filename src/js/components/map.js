'use strict';

// libs
import React from 'react';
import PropTypes from 'prop-types';
import {fitBounds} from 'google-map-react/utils';
import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';

// assets
import '../../scss/map.scss';
import '../../img/cluster.svg';
import '../../img/pin-on.svg';
import '../../img/pin-off.svg';

// components
import InfoPanel from './infopanel';

const config = {
  GOOGLE_MAP: GOOGLE.MAP,
  ZOOM: parseInt(GOOGLE.ZOOM),
  CENTER: {lat: 51.0132493, lng: -114.2142373}
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

const noop = () => {};
const markerStyle = {
  url: 'img/pin-off.svg',
  origin: {x: 0, y: 0},
  anchor: {x: 15, y: 40}
};
const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false
}

const AsyncGoogleMap = withScriptjs(
  withGoogleMap(
    props => {
      const mapOptions = {

      }
      return (
        <GoogleMap
          ref={props.onMapLoad}
          defaultZoom={props.defaultZoom}
          defaultCenter={props.defaultCenter}
          center={props.center}
          zoom={props.zoom}
          onClick={props.onMapClick}
          onCenterChanged={props.onCenterChanged}
          options={props.mapOptions}
        >
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
            styles={clusterSytles}
          >
            {props.markers.map(marker => {
              const onClick = () => props.onMarkerClick(marker);
              return (
                <Marker
                  {...marker}
                  key={marker.id}
                  onClick={onClick}
                />
              )
            })}
          </MarkerClusterer>

        </GoogleMap>
      );
    }
  )
);

AsyncGoogleMap.defaultProps = {
  center: config.CENTER,
  defaultCenter: config.CENTER,
  defaultZoom: config.ZOOM,
  mapOptions: mapOptions,
  markers: [],
  zoom: config.ZOOM,
  onCenterChanged: noop,
  onClick: noop,
  onMapLoad: noop,
  onMapClick: noop,
  onMarkerClick: noop
};

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
  constructor() {
    super();
    this.state = {
      selectedLocation: null,
      center: null
    };
  }

  static get propTypes() {
    return {
      locations: PropTypes.arrayOf(PropTypes.shape({
        day: PropTypes.object.isRequired,
        now: PropTypes.object.isRequired,
        object: PropTypes.object.isRequired
      }))
    };
  }

  /**
   * A callback to dynamically calculate the container height to fill the screen
   * @param map
   */
  onMapLoad(map) {
    const mapDOM = map.getDiv();
    mapDOM.style.height = (document.documentElement.clientHeight - mapDOM.getBoundingClientRect().top) + 'px';

    window._ffyycMap = map;
  }

  onMarkerClick(marker) {
    let selectedLocation = this.props.locations.filter(location => {
      return location.object.objectId === marker.id;
    });

    if (selectedLocation.length > 0) {
      selectedLocation = selectedLocation[0];
      this.setState({
        selectedLocation: selectedLocation,
        center: {lat: selectedLocation.object.geolocation.latitude, lng: selectedLocation.object.geolocation.longitude}
      });
    }
  }

  onCloseInfo(e) {
    this.setState({selectedLocation: null});
  }

  render() {
    let locations = this.props.locations;
    let selectedLocation = this.state.selectedLocation;
    let markers = [];
    let center = this.state.center;
    let zoom = config.ZOOM;
    let infoWindow = null;

    locations.forEach((location) => {
      let obj = location.object;

      try {
        let marker = {
          position: {lat: obj.geolocation.latitude, lng: obj.geolocation.longitude},
          icon: markerStyle,
          id: obj.objectId
        };

        markers.push(marker);
      } catch (e) {
        if (process.env !== 'production') { console.log('Location missing geolocation: ', location); }
      }
    });

    if (locations.length > 0) {
      let fb = fitBounds(getCorners(locations), {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight});
      center = this.state.center ? this.state.center : fb.center;
      zoom = fb.zoom;
    } else {
      center = config.CENTER;
    }

    if (selectedLocation) {
      infoWindow = <InfoPanel location={selectedLocation} onDismiss={this.onCloseInfo.bind(this)} />;
      center = this.state.center;
    }

    return (
      <section className="map-container">
        <AsyncGoogleMap
          googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&key=" + config.GOOGLE_MAP}
          loadingElement={<div/>}
          containerElement={<div/>}
          mapElement={<div className="map" />}
          center={center}
          zoom={zoom}
          markers={markers}
          onClick={this.onClick}
          onMapLoad={this.onMapLoad}
          onMapClick={noop}
          onMarkerClick={this.onMarkerClick.bind(this)}
        />
        {infoWindow}
      </section>
    );
  }
};
